export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    code: err.code || "INTERNAL_ERROR",
    message: err.publicMessage || "We couldn't complete that request."
  });
}
