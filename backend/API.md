# VELOOP Rewards API

All `/api` routes are versioned under the current service namespace.

## Public

### GET /api/health
Returns API health.

### GET /api/giveaways/current
Returns the current giveaway.

### GET /api/giveaways/:id
Returns one giveaway.

### GET /api/giveaways/previous
Returns previous giveaways.

### GET /api/giveaways/:id/winners
Returns winners only when the event lifecycle permits winner display.

### GET /api/giveaways/previous/winners
Returns historical winners.

## Authenticated

### GET /api/giveaways/:id/my-status
Returns the authenticated user's participation status.

### POST /api/giveaways/:id/join
Request body:
```json
{ "giveawayId": "GW-2026-08" }
```

Do not trust amount, currency, prize ID, balance or user ID from the browser. The backend resolves them from authenticated identity and database configuration.

### POST /api/giveaways/:id/claim
Submits the authenticated winner's claim details. The service should derive the winning prize and claim type from trusted winner records.

### GET /api/giveaways/:id/my-claim
Returns the authenticated user's claim status.

## Error codes

GIVEAWAY_NOT_FOUND, GIVEAWAY_NOT_ACTIVE, GIVEAWAY_ENDED, ALREADY_PARTICIPATING, INSUFFICIENT_VE_BALANCE, INSUFFICIENT_SVE_BALANCE, INSUFFICIENT_TOKEN_BALANCE, LOGIN_REQUIRED, PARTICIPATION_BLOCKED, SUSPICIOUS_ACTIVITY, RATE_LIMITED, CLAIM_NOT_ALLOWED.

## Security

- JWT-ready authentication middleware
- Helmet security headers
- CORS allow-list
- JSON payload limit
- Rate limiting
- Server-side validation
- User identity from authentication context
- Unique `(userId, giveawayId)` participation index
- Service layer boundary for atomic balance + participation + transaction work
