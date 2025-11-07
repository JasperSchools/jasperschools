# Quick Start Guide - Sponsor a Child

Get up and running in 10 minutes! ⚡

## 🚀 Step 1: Database Setup (5 minutes)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for it to be ready (~2 minutes)

2. **Run Database Script**
   - In Supabase Dashboard → SQL Editor
   - Copy all content from `database-setup.sql`
   - Paste and click **Run**

3. **Get Your Keys**
   - Go to Settings → API
   - Copy:
     - Project URL
     - `anon` `public` key
     - `service_role` key

## 🔧 Step 2: Configure Environment (2 minutes)

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
ADMIN_PASSWORD=ChooseAStrongPassword123!
NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID=your-campaign-id
DONORBOX_WEBHOOK_SECRET=any-random-string
```

**Replace the values** with your actual Supabase credentials.

## 💳 Step 3: DonorBox Setup (3 minutes)

1. **Create Account**
   - Go to [donorbox.org](https://donorbox.org)
   - Create a campaign

2. **Get Campaign ID**
   - Look at your campaign URL: `donorbox.org/YOUR_CAMPAIGN_ID`
   - Copy `YOUR_CAMPAIGN_ID` to `.env.local`

3. **Set Webhook** (can do later)
   - Settings → Webhooks → Add Webhook
   - URL: `https://your-domain.com/api/donorbox-webhook`
   - For local testing: Use [ngrok](https://ngrok.com)

## ▶️ Step 4: Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Step 5: Add Your First Child

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter your `ADMIN_PASSWORD`
3. Click **+ Add New Child**
4. Fill out the form:
   - Name: "Sarah Nakato"
   - Age: 11
   - Class: "Primary 5"
   - Bio: "Sarah is a bright student..."
   - Amount Needed: 500
   - Location: "Nyairongo, Uganda"
5. Click **Add Child**

## ✨ Step 6: View Public Page

1. Go to [http://localhost:3000/sponsor](http://localhost:3000/sponsor)
2. See your child card!
3. Click **Sponsor** button to test DonorBox integration

---

## 📍 Important URLs

- **Public Sponsor Page**: `/sponsor`
- **Admin Login**: `/admin`
- **Admin Dashboard**: `/admin/dashboard`

---

## 🔥 Quick Tips

1. **Test Without DonorBox**: You can test the admin panel and public display without setting up DonorBox first. The sponsor button will open a DonorBox popup but won't update the database until webhook is configured.

2. **Photo URLs**: Use direct image links (ending in `.jpg`, `.png`). Good sources:
   - Unsplash: `https://images.unsplash.com/...`
   - Your own hosting
   - Supabase Storage (see full docs)

3. **Admin Password**: Store this securely! Anyone with this password can add/edit/delete children.

4. **Local Testing with Webhook**: Use [ngrok](https://ngrok.com) to expose localhost:
   ```bash
   ngrok http 3000
   ```
   Then use the ngrok URL in DonorBox webhook settings.

---

## 🐛 Troubleshooting

**Can't login to admin?**
- Check your `.env.local` has `ADMIN_PASSWORD`
- Restart dev server after changing `.env.local`

**Children not showing?**
- Open browser console (F12) to check for errors
- Verify Supabase credentials in `.env.local`
- Check Supabase dashboard to confirm tables exist

**Sponsor button not working?**
- Verify `NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID` is set
- Check DonorBox campaign is active

---

## 📚 Next Steps

Read the full documentation: `SPONSOR_A_CHILD_SETUP.md`

Topics covered:
- Complete architecture explanation
- DonorBox webhook integration
- Security best practices
- Image upload to Supabase Storage
- Production deployment
- Advanced features

---

## ✅ Success!

You now have a working Sponsor a Child system! 🎉

**What you can do:**
- ✅ Add/edit/delete children via admin panel
- ✅ Display children on public sponsor page
- ✅ Accept sponsorships through DonorBox
- ✅ Track progress with progress bars
- ✅ Filter by availability status

**Need Help?**

Check `SPONSOR_A_CHILD_SETUP.md` for detailed troubleshooting and advanced setup.

