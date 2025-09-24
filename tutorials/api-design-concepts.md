# API Design Concepts: Beginner-Friendly Guide

This tutorial is based on (and cites) Vaibhav Chichmalkar’s great overview: [Vaibhav Chichmalkar, "10 API Concepts Every Backend Developer Should Know: The Go Way" (2025)](https://medium.com/@vaibhav.chichmalkar/10-api-concepts-every-backend-developer-should-know-the-go-way-a873fe064908).

You don’t need any API background. We’ll explain each idea in plain words, why it matters, a simple “where you’ll see it” example, a beginner‑friendly practice tip (Go optional), and links to learn more.

## Tiny glossary (30‑second warm‑up)

- API: A way for apps to talk to each other over the internet.
- Endpoint: A specific URL in an API, like `/users` or `/orders`.
- Request/Response: You send a request; the API sends back a response.
- HTTP: The set of rules (verbs like GET/POST, codes like 200/404) used by APIs.
- JSON: A simple text format for sending data (looks like `{ "name": "Ava" }`).

---

## 1) Idempotency — Safe to retry

What it is: Doing the same request twice gives the same result (no duplicates).

Why it matters: If a payment screen freezes and you click “Pay” again, you shouldn’t be charged twice.

Where you’ll see it: Payment APIs, signup flows, inventory updates.

Practice: Add an `Idempotency-Key` header to a POST route; if you’ve seen that key, return the earlier result instead of doing the action again.

Learn more:

- MDN: Idempotent HTTP methods — <https://developer.mozilla.org/en-US/docs/Glossary/Idempotent>
- Stripe: Idempotency keys — <https://stripe.com/docs/idempotency>
- AWS Builders’ Library: Making retries safe — <https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/>

## 2) Pagination — Big lists, small chunks

What it is: Breaking a long list into pages (or “load more”).

Why it matters: Your app stays fast and responsive as data grows.

Where you’ll see it: Feeds, search results, admin tables.

Practice: Try two styles — offset (`?page=2&limit=20`) and cursor (`?after=post_100`). Return a `next_cursor` so the client knows how to keep going.

Learn more:

- Offset vs. Cursor — <https://medium.com/@oshiryaeva/offset-vs-cursor-based-pagination-which-is-the-right-choice-for-your-project-e46f65db062f>
- Keyset pagination (no OFFSET) — <https://use-the-index-luke.com/no-offset>

## 3) Versioning — Don’t break old apps

What it is: Keep old and new API shapes side‑by‑side (e.g., `/v1` and `/v2`).

Why it matters: People using the old version can keep working while you improve the new one.

Where you’ll see it: Any public API; mobile apps that update slowly.

Practice: Create `/v1/profile` and `/v2/profile` routes; keep responses stable for v1 while you add fields to v2.

Learn more:

- Google API Design: Versioning — <https://cloud.google.com/apis/design/versioning>
- Microsoft REST Guidelines — <https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#12-versioning>
- Stripe: Versioning in practice — <https://stripe.com/docs/api/versioning>

## 4) Rate limiting — A fair speed limit

What it is: A cap on how many requests a user/app can make in a time window.

Why it matters: Prevents overload and keeps things fair during traffic spikes.

Where you’ll see it: Login attempts, search endpoints, public APIs.

Practice: Add a simple limiter (e.g., token bucket) that allows X requests per second and returns a friendly error when the limit is hit.

Learn more:

- Cloudflare: What is rate limiting? — <https://www.cloudflare.com/learning/bots/what-is-rate-limiting/>
- OWASP: Rate limiting — <https://cheatsheetseries.owasp.org/cheatsheets/Rate_Limiting_Cheat_Sheet.html>
- Go limiter (`x/time/rate`) — <https://pkg.go.dev/golang.org/x/time/rate>

## 5) Error contracts — Helpful, not cryptic

What it is: Consistent error codes and messages that explain what went wrong.

Why it matters: Developers (and you!) can fix issues quickly.

Where you’ll see it: Form validation, conflicts (like duplicate usernames), missing fields.

Practice: Return `400` for bad input, `422` for validation errors, `409` for conflicts—plus a small JSON body (`code`, `message`).

Learn more:

- MDN: HTTP response status codes — <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status>
- Problem Details (standard JSON error shape) — <https://www.rfc-editor.org/rfc/rfc7807>

## 6) Caching — Reuse good answers

What it is: Save a response so you don’t recompute it every time.

Why it matters: Faster apps, fewer database hits, happier users.

Where you’ll see it: Popular list pages, profile pictures, static content.

Practice: Add an `ETag` header (a fingerprint of the response). If the client sends `If-None-Match` with the same value, reply `304 Not Modified`.

Learn more:

- MDN: HTTP caching — <https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching>
- MDN: ETag — <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag>
- MDN: Cache-Control — <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control>

## 7) Security — Short‑lived tokens

What it is: Tokens (like JWTs) prove who you are for a short time.

Why it matters: Limits damage if a token leaks; keeps access scoped.

Where you’ll see it: Logins, API keys, “remember me” sessions.

Practice: Issue a token that expires quickly; refresh it securely; never put secrets (like passwords) inside tokens.

Learn more:

- JWT: Introduction — <https://jwt.io/introduction>
- Auth0: JWT best practices — <https://auth0.com/learn/json-web-tokens/>
- OWASP API Security Top 10 — <https://owasp.org/API-Security/>

## 8) N+1 queries — Fetch in batches

What it is: The slow pattern of loading related data one item at a time (1 query for users, then 1 query per user for orders).

Why it matters: It crushes performance. Fetch once, not a hundred times.

Where you’ll see it: Lists with related details (users + orders, posts + comments).

Practice: Use a single join or a preload/batch query, then group results in code.

Learn more:

- Use the Index, Luke: N+1 and batching — <https://use-the-index-luke.com/sql/partial-results/fetch-more>
- Rails Guides (eager loading concept) — <https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations>

## 9) Documentation — A shared map

What it is: A readable contract describing your API (often OpenAPI/Swagger).

Why it matters: Faster onboarding, easier testing, fewer surprises.

Where you’ll see it: Public APIs, team handoffs, QA automation.

Practice: Describe one endpoint in OpenAPI. Generate docs or mock servers from it.

Learn more:

- OpenAPI Specification — <https://spec.openapis.org/oas/latest.html>
- Swagger tools overview — <https://swagger.io/tools/>
- swaggo/swag (Go annotations) — <https://github.com/swaggo/swag>

## 10) Consistency — Sometimes “eventually” is okay

What it is: In distributed systems, data may take a moment to sync everywhere.

Why it matters: You can keep apps fast and available if you set expectations.

Where you’ll see it: Feeds, counters, notifications, search indexes.

Practice: For long jobs, return `202 Accepted` and finish the work in the background; let the client poll a status endpoint.

Learn more:

- AWS: Eventually consistent reads — <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html>
- CAP theorem (overview) — <https://en.wikipedia.org/wiki/CAP_theorem>

---

## Quick practice plan

1) Make one POST route idempotent with a simple key store.
2) Add cursor pagination to a list endpoint and return `next_cursor`.
3) Standardize error responses with codes and a small JSON body.
4) Write a tiny OpenAPI file for one endpoint and share it with a friend.

## Full credit

Chichmalkar, V. (2025). ["10 API Concepts Every Backend Developer Should Know: The Go Way"](https://medium.com/@vaibhav.chichmalkar/10-api-concepts-every-backend-developer-should-know-the-go-way-a873fe064908). Medium.
