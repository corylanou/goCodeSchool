# Domain Registration Guide

Step-by-step guide to registering a domain name for your website.

---

## What You'll Need

- Email address
- Payment method (credit card, PayPal, etc.)
- Budget: $10-15 for first year
- 15-20 minutes

---

## Choosing Your Domain Name

### Best Practices

✅ **Good Domain Names:**

- Short and memorable
- Easy to spell
- Describes your business
- Uses `.com` (most recognizable)
- No hyphens or numbers

❌ **Avoid:**

- Long, complicated names
- Hyphens (hard to communicate verbally)
- Numbers (confusing: "4" or "four"?)
- Misspellings on purpose
- Trademarked names

### Examples

#### Good:

- `bluemountainbakery.com`
- `smithplumbing.com`
- `madisonpetcare.com`

#### Not Ideal:

- `blue-mountain-bakery-llc.com` (too long, has hyphens)
- `smth-plmbng.com` (hard to spell)
- `bakery4u.com` (number is ambiguous)

### Checking Availability

Before purchasing, check if your desired domain is available:

1. Visit registrar website (Namecheap, Porkbun, etc.)
2. Enter desired domain in search box
3. If taken, try variations:
   - Add city name: `smithplumbingmadison.com`
   - Different TLD: `.net`, `.co`, `.io`
   - Slight variation: `smithplumbingco.com`

---

## Recommended Registrars

### Option 1: Namecheap (Recommended for Students)

#### Pros:

- ✅ Student-friendly interface
- ✅ Good customer support
- ✅ Free WHOIS privacy (hides your personal info)
- ✅ Reliable
- ✅ No aggressive upselling

#### Pricing:

- `.com`: ~$13/year
- `.net`: ~$14/year
- Renewal: Same price

**Website:** [namecheap.com](https://www.namecheap.com)

---

### Option 2: Porkbun (Best Budget Option)

#### Pros:

- ✅ Cheapest option ($9-10/year)
- ✅ Free WHOIS privacy
- ✅ Simple interface
- ✅ No hidden fees

#### Cons:

- ❌ Fewer features than Namecheap
- ❌ Less name recognition

#### Pricing:

- `.com`: ~$10/year
- `.net`: ~$11/year
- Renewal: Same price

**Website:** [porkbun.com](https://porkbun.com)

---

### Option 3: Google Domains → Squarespace Domains

**Note:** Google Domains was sold to Squarespace in 2023.

#### Pros:

- ✅ Clean, simple interface
- ✅ Google integration
- ✅ Free privacy protection

#### Cons:

- ❌ Being migrated to Squarespace
- ❌ Uncertainty about future

#### Pricing:

- `.com`: ~$12/year

**Website:** [domains.squarespace.com](https://domains.squarespace.com)

---

### Avoid: GoDaddy

#### Why we don't recommend:

- ❌ Aggressive upselling
- ❌ Confusing checkout process
- ❌ Privacy protection costs extra
- ❌ Higher renewal prices
- ❌ Poor customer service reputation

---

## Step-by-Step: Registering with Namecheap

### Step 1: Search for Domain

1. Go to [namecheap.com](https://www.namecheap.com)
2. Enter your desired domain in the search box
   - Example: `mybusiness`
3. Click "Search"

### Step 2: Select Domain

1. Review search results
2. If `.com` is available and affordable, choose it
3. Click "Add to Cart" next to your choice
4. Avoid add-ons (you don't need them yet):
   - ❌ Web hosting (you'll use Fly.io/Railway)
   - ❌ Email hosting (can add later if needed)
   - ❌ Website builder (you're building custom!)
   - ✅ **WhoisGuard** (privacy protection) - usually FREE, keep it!

### Step 3: Review Cart

Check your cart:

- Domain name correct?
- Price is ~$10-15?
- WhoisGuard enabled (free)?
- Auto-renewal (you can disable later if wanted)

Click "Confirm Order"

### Step 4: Create Account

If you don't have a Namecheap account:

1. Click "Create Account"
2. Enter:
   - Email address (use one you check regularly!)
   - Password (strong password)
   - Name
3. Agree to terms
4. Click "Create Account and Continue"

If you have an account:

1. Click "Sign In"
2. Enter credentials

### Step 5: Enter Payment Info

1. Choose payment method:
   - Credit/debit card
   - PayPal
2. Enter billing information:
   - Name
   - Address
   - Phone
3. Review total price
4. Click "Continue"

### Step 6: Complete Purchase

1. Review order one final time
2. Click "Pay Now" or "Complete Order"
3. Wait for confirmation (usually instant)

### Step 7: Confirmation

You should receive:

- Confirmation page
- Email to your registered email address
- Welcome email from Namecheap

**Save these emails!** They contain important information.

---

## After Registration

### Verify Email (Important!)

1. Check your email inbox
2. Look for email from Namecheap (might be in spam)
3. Click verification link
4. **Important:** ICANN requires email verification within 15 days or domain will be suspended!

### Access Your Domain Dashboard

1. Log in to Namecheap
2. Click "Domain List" in sidebar
3. Click "Manage" next to your domain

You'll see:

- Domain expiration date
- Auto-renewal status
- DNS settings
- WhoisGuard status

---

## Understanding Domain Costs

### First Year vs Renewal

#### First Year:

- Often discounted ($8-10)
- Promotional pricing

#### Renewal (Year 2+):

- Regular price ($10-15)
- Set calendar reminder to check prices before renewal!

### Example Cost Over 3 Years

#### Namecheap .com:

- Year 1: $13
- Year 2: $13
- Year 3: $13
- **Total:** $39 / 3 years = **$13/year average**

#### Porkbun .com:

- Year 1: $10
- Year 2: $10
- Year 3: $10
- **Total:** $30 / 3 years = **$10/year average**

### What's Included

Your domain registration includes:

- ✅ The domain name itself
- ✅ DNS management
- ✅ Email forwarding (basic)
- ✅ WhoisGuard privacy (Namecheap/Porkbun)
- ✅ Domain parking page (until you connect your site)

### What Costs Extra (Optional)

- Email hosting: $1-5/month (Gmail is free alternative)
- Premium DNS: $1-2/month (not needed for most)
- SSL certificate: FREE from your hosting platform (Fly.io/Railway)
- Web hosting: Included in your Fly.io/Railway costs

---

## DNS Configuration Basics

**DNS (Domain Name System)** points your domain to your website.

### Initial Setup (After Purchase)

When you first register, Namecheap automatically configures:

- Nameservers: `dns1.registrar-servers.com`, `dns2.registrar-servers.com`
- Parking page: Shows "Coming Soon" page

**You'll configure DNS in Phase 11 (Deployment)** when your site is ready.

### DNS Record Types (You'll Use These Later)

| Record Type | Purpose | Example |
|-------------|---------|---------|
| **A** | Points domain to IP address | `example.com` → `172.67.180.123` |
| **CNAME** | Points domain to another domain | `www` → `example.com` |
| **MX** | Email routing | Where to send emails |
| **TXT** | Verification & configuration | Prove domain ownership |

**Don't worry about these now!** You'll configure them when deploying.

---

## Domain Management

### Accessing DNS Settings

#### In Namecheap:

1. Domain List → Manage
2. Click "Advanced DNS" tab
3. You'll see your DNS records here

**Don't change anything yet!** You'll configure this during deployment.

### Auto-Renewal

**Recommended:** Keep auto-renewal ON

- Prevents accidental domain loss
- Domain registry charges $100+ to recover expired domain!

#### To manage:

1. Domain List → Manage
2. Look for "Auto-Renew" toggle
3. Enable/disable as desired

### Privacy Protection (WhoisGuard)

#### What it does:

- Hides your personal information from WHOIS lookup
- Protects against spam and identity theft

#### To verify it's enabled:

1. Domain List → Manage
2. Look for "WhoisGuard" section
3. Should say "Enabled" or "Active"

#### Test it:

1. Visit [whois.namecheap.com](https://www.namecheap.com/domains/whois/)
2. Enter your domain
3. Should show Namecheap's info, not yours

---

## Transferring a Domain (If You Already Have One)

If you registered elsewhere and want to transfer to Namecheap:

### Requirements

- Domain at least 60 days old
- Unlocked at current registrar
- Authorization code (EPP code) from current registrar
- Email access to confirm transfer

### Steps

1. Get auth code from current registrar
2. Unlock domain at current registrar
3. Initiate transfer at Namecheap
4. Enter auth code
5. Confirm via email
6. Wait 5-7 days for completion

**Note:** Transfer typically adds 1 year to registration (so you pay for year + transfer).

---

## Common Issues & Solutions

### Issue: Domain Already Taken

#### Solutions:

1. Try different TLD (`.net`, `.co`, `.io`)
2. Add location: `smithplumbingmadison.com`
3. Add descriptor: `smithplumbingco.com`
4. Slight variation: `smithandsonplumbing.com`

### Issue: Can't Verify Email

#### Solutions:

1. Check spam folder
2. Request new verification email (in domain dashboard)
3. Update email address if typo
4. Contact support if persistent

### Issue: Payment Declined

#### Solutions:

1. Verify billing address matches card
2. Try different payment method
3. Contact your bank (might be fraud protection)
4. Try PayPal instead of card

### Issue: Domain Won't Let Me Buy It

Some domains are **premium** or **reserved**:

- Cost $100s or $1000s
- Not available for regular registration
- Try different variation

---

## Domain Name Tips for Client Projects

### For Clients

#### Discuss with client:

1. Do they already own a domain?
2. Do they have a preferred name?
3. Should it match business name exactly?
4. Who will own the domain? (them or your club?)

### Best Practice: Client Owns Domain

#### Recommended approach:

1. Client purchases domain in their name
2. Client adds you as administrator
3. You configure DNS
4. Client retains full ownership

#### Why this matters:

- Legal clarity
- Client independence
- Easier handoff
- Professional boundary

### If Club Purchases for Client

#### Only do this if:

- Client reimburses immediately
- Clear written agreement
- Plan to transfer ownership
- Emergency situation

#### Document everything:

- Purchase receipt
- Transfer agreement
- Renewal responsibility

---

## Domain Checklist

Use this checklist when registering a domain:

### Before Purchase

- [ ] Checked domain availability
- [ ] Verified spelling (no typos!)
- [ ] Confirmed `.com` available (or chosen alternative)
- [ ] Compared prices at 2-3 registrars
- [ ] Checked renewal price (not just first year)
- [ ] Budget approved

### During Purchase

- [ ] Correct domain name in cart
- [ ] WhoisGuard/privacy protection enabled
- [ ] Declined unnecessary add-ons
- [ ] Verified billing information
- [ ] Saved confirmation email

### After Purchase

- [ ] Email verified (within 15 days!)
- [ ] Can access domain dashboard
- [ ] WhoisGuard confirmed active
- [ ] Auto-renewal preference set
- [ ] Domain expiration date noted in calendar
- [ ] Access credentials saved securely (password manager)

---

## Resources

### Domain Tools

- [Namecheap](https://www.namecheap.com/) - Recommended registrar
- [Porkbun](https://porkbun.com/) - Budget option
- [Domain Name Generator](https://www.namemesh.com/) - Ideas for names
- [Instant Domain Search](https://instantdomainsearch.com/) - Fast availability check

### WHOIS Lookup

- [ICANN WHOIS](https://lookup.icann.org/) - Official lookup
- [Namecheap WHOIS](https://www.namecheap.com/domains/whois/) - Check privacy

### Learning Resources

- [How DNS Works - Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [Domain Name Basics - Namecheap](https://www.namecheap.com/blog/beginners-guide-to-domain-names/)

---

## Next Steps

1. ✅ Register your domain
2. ✅ Verify email
3. ⏭️ Continue with [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
4. ⏭️ Build your website
5. ⏭️ Configure DNS during deployment (Phase 11)

---

## Questions?

Common questions answered:

**Q: Do I need a domain to start learning?**
A: No! You can build everything locally and deploy to free subdomain (e.g., `mysite.fly.dev`). Buy domain when ready for production.

**Q: Can I change my domain later?**
A: Yes, but you lose SEO value and have to tell everyone new address. Choose carefully!

**Q: What if my domain expires?**
A: You have ~30 day grace period to renew. After that, domain goes to auction and you might lose it or pay $100+ to recover.

**Q: Should I buy multiple domains?**
A: For learning, one is enough. For clients, consider buying common misspellings and redirecting them.

**Q: .com vs .net vs .io vs .co?**
A: `.com` is most recognizable. `.net` is alternative. `.io` is trendy for tech. `.co` is shorter. For small business, stick with `.com` if possible.

**Q: Can I get a free domain?**
A: Yes, but with caveats:

- Freenom (`.tk`, `.ml`) - not professional
- Some hosting includes free domain - but you're locked in
- For learning: free subdomain from Fly.io/Railway is fine
- For clients: always use proper domain

---

## Summary

### For Students

- Budget $10-15/year
- Use Namecheap or Porkbun
- Enable privacy protection
- Verify email within 15 days
- Save credentials securely

### For Client Projects

- Client should own domain
- You configure as administrator
- Clear written agreements
- Professional boundaries

**Remember:** Domain registration is just the first step. You'll configure DNS in Phase 11 after your site is built and deployed!
