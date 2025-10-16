# Stripe Payment Setup Guide

## Quick Setup (5 minutes)

### 1. Create Stripe Account
- Go to: https://dashboard.stripe.com/register
- Sign up with your email
- Activate your account

### 2. Get API Keys
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** → Add to `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → Add to `.env.local` as `STRIPE_SECRET_KEY`

### 3. Create Products & Prices

#### Pro Plan ($19/month)
1. Go to: https://dashboard.stripe.com/test/products
2. Click **"+ Add product"**
3. Fill in:
   - **Name:** ScreenToCode Pro
   - **Description:** Unlimited generations + all features
   - **Pricing:** Recurring → $19.00 USD / month
4. Click **"Save product"**
5. **Copy the Price ID** (starts with `price_`) → Add to `.env.local` as `STRIPE_PRO_PRICE_ID`

#### Enterprise Plan ($99/month)
1. Click **"+ Add product"** again
2. Fill in:
   - **Name:** ScreenToCode Enterprise
   - **Description:** Team features + API access
   - **Pricing:** Recurring → $99.00 USD / month
3. Click **"Save product"**
4. **Copy the Price ID** → Add to `.env.local` as `STRIPE_ENTERPRISE_PRICE_ID`

### 4. Update Landing Page
Open `app/landing/page.tsx` and replace the placeholder Price IDs:

```typescript
const STRIPE_PRICES = {
  pro: 'price_YOUR_PRO_PRICE_ID_HERE',
  enterprise: 'price_YOUR_ENTERPRISE_PRICE_ID_HERE',
}
```

### 5. Setup Webhook (for local testing)

#### Option A: Using Stripe CLI (Recommended)
```bash
# Install Stripe CLI
# Windows: https://github.com/stripe/stripe-cli/releases
# Mac: brew install stripe/stripe-brew/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook secret (whsec_xxx) to .env.local as STRIPE_WEBHOOK_SECRET
```

#### Option B: Using Stripe Dashboard (for production)
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"+ Add endpoint"**
3. Enter URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy **Signing secret** → Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### 6. Test Payment Flow

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3000/landing

3. Click **"Start Pro Trial"** button

4. You'll be redirected to Stripe Checkout

5. Use test card:
   - **Card number:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., `12/25`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP:** Any 5 digits (e.g., `12345`)

6. Complete payment → You'll be redirected to `/success`

### 7. Verify Webhook

Check your terminal where `stripe listen` is running. You should see:
```
✔ Received event: checkout.session.completed
✔ Received event: customer.subscription.created
```

Check your Next.js console for logs:
```
💰 Payment successful! customer@example.com
🎉 Subscription created: sub_xxxxx
```

## Your .env.local Should Look Like:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRO_PRICE_ID=price_1QKxxxxx
STRIPE_ENTERPRISE_PRICE_ID=price_1QLxxxxx
```

## Troubleshooting

### "No such price" error
- Make sure you copied the **Price ID**, not Product ID
- Price IDs start with `price_`, Product IDs start with `prod_`

### Webhook not working
- Make sure `stripe listen` is running
- Check that `STRIPE_WEBHOOK_SECRET` matches the CLI output
- Restart your Next.js server after adding the secret

### Payment not completing
- Check browser console for errors
- Make sure all env variables are set
- Try test mode first before live mode

## Going Live

1. Switch to **Live mode** in Stripe dashboard (toggle top-right)
2. Get your **Live API keys**
3. Create products again in Live mode
4. Update `.env.local` with live keys
5. Setup live webhook endpoint
6. Deploy to production (Vercel/Netlify)

## Next Steps

- Add user database (Supabase) to track subscriptions
- Implement usage limits based on plan
- Add subscription management page
- Send email receipts
