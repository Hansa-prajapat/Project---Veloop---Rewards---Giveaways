
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || "Request failed");
    error.code = body.code;
    throw error;
  }
  return body;
}

// Keep all server calls behind this adapter so React components can later
// switch from demo data to the real backend without architectural rewrites.
export const giveawayApi = {
  current: () => apiRequest("/api/giveaways/current"),
  byId: (id) => apiRequest(`/api/giveaways/${id}`),
  previous: () => apiRequest("/api/giveaways/previous"),
  myStatus: (id, token) => apiRequest(`/api/giveaways/${id}/my-status`, {headers:{Authorization:`Bearer ${token}`}}),
  join: (id, token) => apiRequest(`/api/giveaways/${id}/join`, {method:"POST",body:JSON.stringify({giveawayId:id}),headers:{Authorization:`Bearer ${token}`}}),
  winners: (id) => apiRequest(`/api/giveaways/${id}/winners`),
  previousWinners: () => apiRequest("/api/giveaways/previous/winners"),
  claim: (id, token, details) => apiRequest(`/api/giveaways/${id}/claim`, {method:"POST",body:JSON.stringify(details),headers:{Authorization:`Bearer ${token}`}})
};
