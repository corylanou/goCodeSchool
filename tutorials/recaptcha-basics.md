# reCAPTCHA Fundamentals: Keep Forms Human-Friendly

Google's reCAPTCHA helps you distinguish real people from bots so your forms stay usable without being drowned by spam. This tutorial covers the differences between v2 and v3, when to use each, and how to instrument them without wrecking the user experience.

## Why reCAPTCHA on every form?

- **Spam protection.** Automated sign-ups, comments, and contact requests cost time and deliverability.
- **Resource shielding.** Bots can abuse free-tier APIs, fill your CRM with junk, or trigger rate limits.
- **Reputation + deliverability.** Email providers flag domains that send responses to bot-submitted forms.
- **User trust.** Transparent anti-abuse tooling reassures real users their messages will be reviewed.

## reCAPTCHA versions at a glance

| Version | Interaction style | Score/Outcome | Use cases |
| ------- | ----------------- | ------------- | --------- |
| **v2 Checkbox** | User clicks "I’m not a robot"; may get image puzzle | Pass/Fail token | Public forms where a quick visible check is OK |
| **v2 Invisible** | Script runs on submit; puzzle only if suspicious | Pass/Fail token | Forms where you want fallback puzzle but no checkbox |
| **v3 (Enterprise)** | No challenge; returns score 0.0–1.0 | You decide thresholds | Background risk scoring; login, checkout, support forms |

> v3 is more flexible (scores, adaptive friction). v2 is simpler to set up and explain to stakeholders.

## Implementing reCAPTCHA v2 Checkbox

1. **Create keys** in [Google reCAPTCHA admin](https://www.google.com/recaptcha/admin/create). Pick v2 → "I’m not a robot".
2. **Include script** on your form page:
   ```html
   <script src="https://www.google.com/recaptcha/api.js" async defer></script>
   ```
3. **Add widget** where the checkbox should render:
   ```html
   <form action="/submit" method="post">
     <!-- form fields -->
     <div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
     <button type="submit">Send</button>
   </form>
   ```
4. **Validate server-side** using the secret key:
   ```js
   import fetch from 'node-fetch';

   async function verifyRecaptcha(token, remoteIp) {
     const params = new URLSearchParams({
       secret: process.env.RECAPTCHA_SECRET,
       response: token,
       remoteip: remoteIp,
     });
     const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
       method: 'POST', body: params,
     });
     const data = await res.json();
     return data.success === true;
   }
   ```
5. **Handle failures gracefully.** Show a human-friendly error, log the attempt, and allow retry.

### Accessibility and UX tips

- Provide a descriptive label (e.g., via `aria-describedby`).
- Ensure keyboard focus works: reCAPTCHA injects an iframe; test with tabbing.
- If you host forms inside modals, load reCAPTCHA after modal opens to avoid layout shifts.

## Implementing reCAPTCHA v3

1. **Create v3 keys** in the admin console; define "actions" (e.g., `contact_form`, `signup`).
2. **Load script** with explicit render key:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
   ```
3. **Request token when needed:**
   ```js
   grecaptcha.ready(() => {
     grecaptcha.execute('YOUR_SITE_KEY', { action: 'contact_form' })
       .then(token => {
         document.querySelector('#recaptcha-token').value = token;
       });
   });
   ```
4. **Send token to backend** in a hidden field or header and **score it**:
   ```js
   async function scoreToken(token) {
     const params = new URLSearchParams({
       secret: process.env.RECAPTCHA_SECRET,
       response: token,
     });
     const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
       method: 'POST', body: params,
     });
     const data = await res.json();
     return data.score; // 0.0 (bot) → 1.0 (likely human)
   }

   const score = await scoreToken(token);
   if (score < 0.5) {
     // Flag for review, add secondary challenge, or silently drop
   }
   ```
5. **Log action + score** for auditing. Consider sending suspicious attempts to moderation queue.

### Choosing thresholds & fallbacks

- Start with `0.5` as a baseline; adjust per form after observing traffic.
- For high-risk flows (signup, password reset), combine v3 scoring with secondary checks (email verification, rate limiting).
- If you receive false positives, add allowlist for trusted IPs or signed-in users.

## Form-hardening checklist (pair with reCAPTCHA)

- ✅ Server-side validation: never trust client tokens alone.
- ✅ Rate limiting / IP throttling to stop brute force attacks.
- ✅ Honeypot fields hidden from humans but easy to detect when bots fill them.
- ✅ Web application firewall (Cloudflare, AWS WAF) for extra filtering.
- ✅ Monitoring: log reCAPTCHA failures and review weekly.

## Testing your setup

- Use Chrome DevTools → Network → `siteverify` requests to inspect payloads.
- Simulate failures by sending invalid token to ensure the UI handles errors.
- For v3, review the admin console analytics to see score distribution.

## Common pitfalls

- **Client-only validation.** Tokens can be forged; always verify server-side.
- **Using the wrong keys in production.** Sandbox keys are domain-bound; double-check environment variables.
- **Ignoring regional policies.** Some jurisdictions require consent before executing Google scripts.
- **Breaking CSP.** Update `script-src` directives to allow `https://www.google.com` and `https://www.gstatic.com`.

## Resources

- reCAPTCHA Admin Console: https://www.google.com/recaptcha/admin/create
- reCAPTCHA v3 Guide: https://developers.google.com/recaptcha/docs/v3
- reCAPTCHA v2 Guide: https://developers.google.com/recaptcha/docs/display
- Google Security Blog on reCAPTCHA: https://security.googleblog.com/search/label/reCAPTCHA
- OWASP Automated Threats to Web Applications: https://owasp.org/www-project-automated-threats-to-web-applications/

## Homework / Lab idea

1. Add reCAPTCHA v2 to a contact form; verify tokens in your backend.
2. Swap to v3, log scores for a week, and compare false positive rates.
3. Present findings: Did spam drop? How did legitimate users react?

Keeping reCAPTCHA active across login, signup, and contact flows is an easy win to protect your team’s time and data quality.
