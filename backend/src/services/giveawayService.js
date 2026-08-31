// Domain service boundary for backend-authoritative giveaway operations.
// Keep status, prize configuration and lifecycle logic here rather than in React.
export function isActive(giveaway, now = new Date()) {
  return giveaway.status === "ACTIVE" && giveaway.startAt <= now && now <= giveaway.endAt;
}
