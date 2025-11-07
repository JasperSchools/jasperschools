# Setup Checklist - Sponsor a Child

Use this checklist to track your progress setting up the system.

## Phase 1: Database Setup ☑️

- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new Supabase project
- [ ] Wait for project to be ready (~2 minutes)
- [ ] Copy `database-setup.sql` content
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Paste and run the SQL script
- [ ] Verify tables created: `children` and `sponsorships`
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy anon public key
- [ ] Copy service_role secret key (keep secret!)

## Phase 2: Environment Configuration ☑️

- [ ] Create `.env.local` file in project root
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Choose a strong admin password
- [ ] Add `ADMIN_PASSWORD`
- [ ] Save `.env.local`
- [ ] Verify `.env.local` is in `.gitignore`

## Phase 3: DonorBox Setup ☑️

- [ ] Create DonorBox account at [donorbox.org](https://donorbox.org)
- [ ] Create a new campaign
- [ ] Copy campaign ID from URL
- [ ] Add `NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID` to `.env.local`
- [ ] Create webhook secret (any random string)
- [ ] Add `DONORBOX_WEBHOOK_SECRET` to `.env.local`

## Phase 4: Run Application ☑️

- [ ] Run `npm install` (if not done already)
- [ ] Run `npm run dev`
- [ ] Application starts without errors
- [ ] Open `http://localhost:3000`
- [ ] Homepage loads correctly
- [ ] Header shows "Sponsor" button

## Phase 5: Test Admin Panel ☑️

- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Login page displays
- [ ] Enter admin password
- [ ] Successfully logs in
- [ ] Redirected to dashboard
- [ ] Click "+ Add New Child"
- [ ] Form displays correctly
- [ ] Fill out test child:
  - Name: Test Child
  - Age: 10
  - Class: Primary 4
  - Amount Needed: 100
  - Bio: This is a test child
- [ ] Click "Add Child"
- [ ] Child appears in table
- [ ] Click "Edit" on test child
- [ ] Form pre-fills with data
- [ ] Make a change and save
- [ ] Changes appear in table
- [ ] Test delete functionality
- [ ] Test child is removed

## Phase 6: Test Public Sponsor Page ☑️

- [ ] Add at least one real child via admin
- [ ] Navigate to `http://localhost:3000/sponsor`
- [ ] Sponsor page loads
- [ ] Child card displays correctly
- [ ] Photo shows (if URL provided)
- [ ] Name, age, class display
- [ ] Bio displays
- [ ] Progress bar shows
- [ ] Amount raised / goal shows
- [ ] "Sponsor" button displays
- [ ] Test filter buttons work
- [ ] Click "Sponsor" button
- [ ] DonorBox popup/redirect opens
- [ ] Child name appears in DonorBox form

## Phase 7: Configure DonorBox Webhook (Optional) ☑️

Skip this if you want to manually update amounts. Otherwise:

- [ ] Install ngrok: [ngrok.com](https://ngrok.com)
- [ ] Run `ngrok http 3000`
- [ ] Copy ngrok URL (e.g., `https://abc123.ngrok.io`)
- [ ] Go to DonorBox → Settings → Webhooks
- [ ] Add new webhook
- [ ] Webhook URL: `https://abc123.ngrok.io/api/donorbox-webhook`
- [ ] Select event: "Donation Created"
- [ ] Paste webhook secret from `.env.local`
- [ ] Save webhook
- [ ] Make a test donation on DonorBox
- [ ] Check terminal logs for webhook received
- [ ] Verify amount_raised updated in Supabase
- [ ] Verify changes appear on sponsor page

## Phase 8: Add Real Children ☑️

- [ ] Gather child information:
  - Photos (direct URLs)
  - Names
  - Ages
  - Class years
  - Bios (compelling stories)
  - Interests
  - Funding goals
- [ ] Add first child via admin
- [ ] Add second child via admin
- [ ] Add third child via admin
- [ ] Continue until all children added
- [ ] Verify all display correctly on sponsor page
- [ ] Test on mobile device
- [ ] Test on tablet device
- [ ] Test on desktop

## Phase 9: Production Deployment ☑️

- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Connect GitHub repository
- [ ] Add environment variables in hosting dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_PASSWORD`
  - `NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID`
  - `DONORBOX_WEBHOOK_SECRET`
- [ ] Deploy application
- [ ] Test deployed admin panel
- [ ] Test deployed sponsor page
- [ ] Update DonorBox webhook URL to production:
  - `https://your-domain.com/api/donorbox-webhook`
- [ ] Make test donation on production
- [ ] Verify webhook works in production

## Phase 10: Final Checks ☑️

- [ ] All children display correctly
- [ ] All images load
- [ ] Progress bars accurate
- [ ] Sponsor buttons work
- [ ] Admin panel secured
- [ ] Mobile layout perfect
- [ ] Tablet layout perfect
- [ ] Desktop layout perfect
- [ ] Load time acceptable
- [ ] No console errors
- [ ] DonorBox integration working
- [ ] Webhook updating database
- [ ] Admin can edit children
- [ ] Admin can delete children

## Phase 11: Launch! 🚀

- [ ] Announce to stakeholders
- [ ] Share sponsor page link
- [ ] Add link to main website
- [ ] Share on social media
- [ ] Email supporters
- [ ] Monitor first donations
- [ ] Celebrate success! 🎉

## Ongoing Maintenance ☑️

- [ ] Check admin panel weekly
- [ ] Update child information as needed
- [ ] Monitor DonorBox for donations
- [ ] Verify webhook still working
- [ ] Update child status when fully sponsored
- [ ] Add new children as needed
- [ ] Respond to technical issues
- [ ] Backup Supabase data monthly
- [ ] Review security settings quarterly

---

## Quick Reference

**Admin URL**: `/admin`  
**Public URL**: `/sponsor`  
**Webhook URL**: `/api/donorbox-webhook`

**Support Docs**:
- `QUICK_START.md` - Fast setup
- `SPONSOR_A_CHILD_SETUP.md` - Detailed guide
- `PROJECT_SUMMARY.md` - Overview

---

## Notes Section

Use this space for your own notes:

```
Supabase Project Name: _______________________
Admin Password: _____________________________ (store securely!)
DonorBox Campaign: ___________________________
Deployed URL: _________________________________
First Launch Date: ____________________________

Issues encountered:
- 
- 
- 

Solutions found:
- 
- 
- 
```

---

**Progress**: Mark items as you complete them. You're doing great! 💪

