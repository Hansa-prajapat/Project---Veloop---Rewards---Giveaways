import Giveaway from "../models/Giveaway.js";

export async function current(req, res, next) {
  try {
    const giveaway = await Giveaway.findOne({ status: { $in: ["ACTIVE","UPCOMING"] } }).sort({ startAt: 1 });
    if (!giveaway) return res.status(404).json({ code: "NO_CURRENT_GIVEAWAY", message: "No current giveaway is available." });
    res.json(giveaway);
  } catch (e) { next(e); }
}

export async function byId(req, res, next) {
  try {
    const giveaway = await Giveaway.findOne({ id: req.params.id });
    if (!giveaway) return res.status(404).json({ code: "GIVEAWAY_NOT_FOUND", message: "Giveaway not found." });
    res.json(giveaway);
  } catch (e) { next(e); }
}

export async function previous(req, res, next) {
  try { res.json(await Giveaway.find({ status: { $in: ["ENDED","ARCHIVED"] } }).sort({ endAt: -1 })); }
  catch (e) { next(e); }
}
