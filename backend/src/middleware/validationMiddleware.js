export function validateGiveawayId(req, res, next) {
  if (!req.params.id || !/^[A-Za-z0-9_-]{3,80}$/.test(req.params.id)) {
    return res.status(400).json({ code: "INVALID_GIVEAWAY_ID", message: "Invalid giveaway identifier." });
  }
  next();
}
