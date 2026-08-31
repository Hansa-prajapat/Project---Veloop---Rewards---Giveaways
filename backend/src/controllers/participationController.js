import Giveaway from "../models/Giveaway.js";
import GiveawayParticipation from "../models/GiveawayParticipation.js";
import GiveawayEntryTransaction from "../models/GiveawayEntryTransaction.js";
import { randomUUID } from "crypto";

export async function myStatus(req,res,next){
  try {
    const row = await GiveawayParticipation.findOne({ userId:req.user.id, giveawayId:req.params.id });
    res.json({ participating: Boolean(row), participation: row });
  } catch(e){next(e);}
}

export async function join(req,res,next){
  // Important: client body is intentionally ignored for amount/currency/user identity.
  const session = await GiveawayParticipation.startSession();
  session.startTransaction();
  try {
    const giveaway = await Giveaway.findOne({ id:req.params.id }).session(session);
    if(!giveaway) throw Object.assign(new Error(),{status:404,code:"GIVEAWAY_NOT_FOUND",publicMessage:"Giveaway not found."});
    const now = new Date();
    if(giveaway.status !== "ACTIVE" || now < giveaway.startAt) throw Object.assign(new Error(),{status:409,code:"GIVEAWAY_NOT_ACTIVE",publicMessage:"This giveaway is not active."});
    if(now > giveaway.endAt) throw Object.assign(new Error(),{status:409,code:"GIVEAWAY_ENDED",publicMessage:"This giveaway has ended."});

    const existing = await GiveawayParticipation.findOne({userId:req.user.id,giveawayId:giveaway.id}).session(session);
    if(existing) throw Object.assign(new Error(),{status:409,code:"ALREADY_PARTICIPATING",publicMessage:"You're already participating."});

    const prize = giveaway.prizes[0];
    // Integrate the authoritative wallet service here. Never accept balance from client.
    const balance = await getAuthoritativeBalance(req.user.id, prize.entryCurrency, session);
    if(balance < prize.entryFee) throw Object.assign(new Error(),{status:409,code:`INSUFFICIENT_${prize.entryCurrency.toUpperCase()}_BALANCE`,publicMessage:`Not enough ${prize.entryCurrency}.`});

    const txId = randomUUID();
    const participation = await GiveawayParticipation.create([{
      userId:req.user.id,giveawayId:giveaway.id,prizeId:prize.id,
      entryCurrency:prize.entryCurrency,entryAmount:prize.entryFee,transactionId:txId
    }],{session});
    await deductAuthoritativeBalance(req.user.id, prize.entryCurrency, prize.entryFee, session);
    await GiveawayEntryTransaction.create([{
      userId:req.user.id,giveawayId:giveaway.id,prizeId:prize.id,currency:prize.entryCurrency,
      amount:prize.entryFee,type:"ENTRY",status:"SUCCESS",balanceBefore:balance,
      balanceAfter:balance-prize.entryFee,transactionId:txId
    }],{session});
    await session.commitTransaction();
    res.status(201).json({success:true, participation:participation[0]});
  } catch(e) {
    await session.abortTransaction();
    if(e.code === 11000) return res.status(409).json({code:"ALREADY_PARTICIPATING",message:"You're already participating."});
    next(e);
  } finally { session.endSession(); }
}

// Replace these adapters with the platform's real wallet service.
async function getAuthoritativeBalance(userId,currency,session){ return 100000; }
async function deductAuthoritativeBalance(userId,currency,amount,session){ return true; }
