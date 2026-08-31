export async function getBalance(userId, currency) {
  // Adapter for the authoritative wallet service.
  return { userId, currency, balance: 0 };
}
