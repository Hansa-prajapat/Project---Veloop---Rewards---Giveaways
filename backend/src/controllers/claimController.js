import GiveawayWinner from "../models/GiveawayWinner.js";
import PrizeClaim from "../models/PrizeClaim.js";

export async function myClaim(req,res,next){
  try {
    const winner = await GiveawayWinner.findOne({userId:req.user.id,giveawayId:req.params.id,status:"WINNER"});
    if(!winner) return res.status(403).json({code:"CLAIM_NOT_ALLOWED",message:"Claim is not available."});
    const claim = await PrizeClaim.findOne({userId:req.user.id,giveawayId:req.params.id,prizeId:winner.prizeId});
    res.json({winner,claim});
  } catch(e){next(e);}
}

export async function submitClaim(req,res,next){
  try {
    const winner = await GiveawayWinner.findOne({userId:req.user.id,giveawayId:req.params.id,status:"WINNER"});
    if(!winner) return res.status(403).json({code:"CLAIM_NOT_ALLOWED",message:"Claim is not available."});
    // Production validation must be based on the trusted prize's claimType.
    const claim = await PrizeClaim.findOneAndUpdate(
      {userId:req.user.id,giveawayId:req.params.id,prizeId:winner.prizeId},
      {status:"SUBMITTED",details:req.body,submittedAt:new Date()},
      {upsert:true,new:true,setDefaultsOnInsert:true}
    );
    res.status(201).json({success:true,claim});
  } catch(e){next(e);}
}
