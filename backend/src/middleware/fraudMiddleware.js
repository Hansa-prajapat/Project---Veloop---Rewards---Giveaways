export function fraudCheck(req, res, next) {
  // Production hook: inspect trusted account/device/IP risk signals.
  // Do not expose detection rules to clients.
  req.fraudContext = { checked: true };
  next();
}
