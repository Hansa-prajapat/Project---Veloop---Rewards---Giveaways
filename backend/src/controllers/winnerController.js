import GiveawayWinner from "../models/GiveawayWinner.js";

export async function winners(req,res,next){
  try {
    const rows = await GiveawayWinner.find({ giveawayId:req.params.id, status:"WINNER" });
    res.json(rows);
  } catch(e){next(e);}
}
export async function previousWinners(req,res,next){
  try {
    const rows = await GiveawayWinner.find({status:"WINNER"}).sort({createdAt:-1}).limit(100);
    res.json(rows);
  } catch(e){next(e);}
}
