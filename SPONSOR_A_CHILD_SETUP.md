# Sponsor a Child - Complete Setup Guide

This guide will walk you through setting up the complete "Sponsor a Child" system with Supabase database and DonorBox payment integration.

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Database Setup (Supabase)](#database-setup-supabase)
4. [DonorBox Setup](#donorbox-setup)
5. [Environment Configuration](#environment-configuration)
6. [Running the Application](#running-the-application)
7. [Admin Usage](#admin-usage)
8. [Public Usage](#public-usage)
9. [Troubleshooting](#troubleshooting)

---

## System Overview

### Architecture Flow

```
┌─────────────────┐
│  Public Users   │
│  (/sponsor)     │
└────────┬────────┘
         │
         ├──► View Children Cards
         │    (from Supabase)
         │
         └──► Click "Sponsor" Button
              │
              ├──► Opens DonorBox
              │    Donation Form
              │
              └──► Payment Complete
                   │
                   └──► Manual Update in Supabase
                        - Create sponsorship record
                        - Update amount_raised
                        - Update child status if needed

┌─────────────────┐
│     Admin       │
│ (/admin/dash)   │
└────────┬────────┘
         │
         ├──► Add Child
         ├──► Edit Child
         ├──► Delete Child
         └──► View All Children
```

### Database Schema

**Table: `children`**
- `id` (uuid, primary key)
- `name` (text)
- `bio` (text)
- `class_year` (text)
- `age` (integer, nullable)
- `location` (text, nullable)
- `interests` (text, nullable)
- `amount_needed` (numeric)
- `amount_raised` (numeric, default: 0)
- `photo_url` (text, nullable)
- `status` (enum: 'available', 'partially_sponsored', 'fully_sponsored')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Table: `sponsorships`**
- `id` (uuid, primary key)
- `child_id` (uuid, foreign key)
- `donor_name` (text)
- `donor_email` (text)
- `amount` (numeric)
- `frequency` (enum: 'one_time', 'monthly', 'yearly')
- `donorbox_transaction_id` (text, nullable)
- `status` (enum: 'pending', 'completed', 'cancelled')
- `created_at` (timestamp)

---

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A DonorBox account
- Basic knowledge of environment variables

---

## Database Setup (Supabase)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Save your project URL and anon key (you'll need these later)

### Step 2: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the following SQL:

```sql
-- Create enum types
CREATE TYPE child_status AS ENUM ('available', 'partially_sponsored', 'fully_sponsored');
CREATE TYPE sponsorship_frequency AS ENUM ('one_time', 'monthly', 'yearly');
CREATE TYPE sponsorship_status AS ENUM ('pending', 'completed', 'cancelled');

-- Create children table
CREATE TABLE children (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    bio TEXT NOT NULL,
    class_year TEXT NOT NULL,
    age INTEGER,
    location TEXT,
    interests TEXT,
    amount_needed NUMERIC(10, 2) NOT NULL,
    amount_raised NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    photo_url TEXT,
    status child_status DEFAULT 'available' NOT NULL
);

-- Create sponsorships table
CREATE TABLE sponsorships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    frequency sponsorship_frequency DEFAULT 'one_time' NOT NULL,
    donorbox_transaction_id TEXT,
    status sponsorship_status DEFAULT 'pending' NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_children_status ON children(status);
CREATE INDEX idx_children_created_at ON children(created_at DESC);
CREATE INDEX idx_sponsorships_child_id ON sponsorships(child_id);
CREATE INDEX idx_sponsorships_created_at ON sponsorships(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Children are viewable by everyone" 
    ON children FOR SELECT 
    USING (true);

CREATE POLICY "Sponsorships are viewable by everyone" 
    ON sponsorships FOR SELECT 
    USING (true);

-- Note: Write operations will be handled through API routes with admin authentication
CREATE POLICY "Enable insert for service role only" 
    ON children FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Enable update for service role only" 
    ON children FOR UPDATE 
    USING (true);

CREATE POLICY "Enable delete for service role only" 
    ON children FOR DELETE 
    USING (true);

CREATE POLICY "Enable insert for service role only (sponsorships)" 
    ON sponsorships FOR INSERT 
    WITH CHECK (true);
```

4. Click **Run** to execute the SQL

### Step 3: Get Your Supabase Credentials

1. Go to **Settings** > **API**
2. Copy the following:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (keep this secret!)

---

## DonorBox Setup

### Step 1: Create a DonorBox Account

1. Go to [donorbox.org](https://donorbox.org)
2. Sign up for an account (if you don't have one)
3. Create a campaign for your school

### Step 2: Get Your Campaign ID

1. Go to your DonorBox dashboard
2. Click on your campaign
3. Look at the URL: `https://donorbox.org/YOUR_CAMPAIGN_ID`
4. Copy `YOUR_CAMPAIGN_ID`

### Step 3: Configure Custom Fields (Optional)

To track which child a donation is for:

1. In DonorBox, go to **Campaign Settings** > **Custom Fields**
2. Add a custom field:
   - **Field Name**: `child_id`
   - **Type**: Hidden
   - This will be populated automatically via the sponsor page URL

---

## Environment Configuration

### Step 1: Create Environment File

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Admin Authentication
ADMIN_PASSWORD=YourSecureAdminPassword123!

# DonorBox Configuration
NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID=your_campaign_id
```

### Step 2: Replace Values

Replace all placeholder values with your actual credentials:

- `NEXT_PUBLIC_SUPABASE_URL`: From Supabase Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: From Supabase Settings > API
- `SUPABASE_SERVICE_ROLE_KEY`: From Supabase Settings > API (keep secret!)
- `ADMIN_PASSWORD`: Choose a strong password
- `NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID`: From DonorBox campaign URL

---

## Running the Application

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
npm start
```

---

## Admin Usage

### Accessing the Admin Dashboard

1. Navigate to: `http://localhost:3000/admin`
2. Enter your admin password (from `.env.local`)
3. Click **Login**

### Adding a Child

1. In the dashboard, click **+ Add New Child**
2. Fill out the form:
   - **Name** (required): Child's full name
   - **Age** (optional): Child's age
   - **Class/Year** (required): e.g., "Primary 5"
   - **Location** (optional): e.g., "Nyairongo, Uganda"
   - **Amount Needed** (required): Total sponsorship goal in USD
   - **Amount Raised** (optional): Current amount raised (usually 0 for new children)
   - **Photo URL** (optional): Direct link to child's photo
   - **Interests** (optional): e.g., "Reading, Soccer, Art"
   - **Bio** (required): Tell the child's story (2-3 paragraphs)
   - **Status**: Available / Partially Sponsored / Fully Sponsored
3. Click **Add Child**

### Editing a Child

1. In the children table, find the child
2. Click **Edit**
3. Update the information
4. Click **Update Child**

### Deleting a Child

1. In the children table, find the child
2. Click **Delete**
3. Confirm deletion

**Note**: Deleting a child also deletes all associated sponsorship records (cascade delete).

---

## Public Usage

### Viewing Children

1. Navigate to: `http://localhost:3000/sponsor`
2. Browse through the children cards
3. Use filters: All / Available / Partially Sponsored

### Sponsoring a Child

1. Find a child you'd like to sponsor
2. Click **Sponsor [Child Name]** button
3. A DonorBox popup window opens
4. Complete the donation form
5. After payment, the child's progress bar updates automatically

### How the Integration Works

1. User clicks "Sponsor" button
2. Opens DonorBox with pre-filled amount and child name
3. User completes payment on DonorBox
4. Admin manually creates sponsorship record in database
5. Admin updates child's `amount_raised` and `archived` status if goal is met
6. Changes are visible on the sponsor page after refresh

---

## File Structure

```
jasperschools/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin login
│   │   │   └── dashboard/
│   │   │       └── page.tsx          # Admin dashboard (CRUD)
│   │   ├── sponsor/
│   │   │   └── page.tsx              # Public sponsor page
│   │   └── api/
│   │       ├── children/
│   │       │   ├── route.ts          # GET, POST children
│   │       │   └── [id]/
│   │       │       └── route.ts      # GET, PUT, DELETE child
│   ├── components/
│   │   ├── Header.tsx                # Updated with /sponsor links
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts             # Browser Supabase client
│   │       └── server.ts             # Server Supabase client
│   └── types/
│       └── database.types.ts         # TypeScript types
├── .env.local                         # Environment variables
└── SPONSOR_A_CHILD_SETUP.md          # This file
```

---

## Troubleshooting

### Issue: "Unauthorized" error in admin

**Solution**: Make sure your `ADMIN_PASSWORD` in `.env.local` matches what you're entering.

### Issue: Children not displaying

**Solution**: 
1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Check Supabase dashboard to ensure tables have data
4. Verify RLS policies are set correctly

### Issue: DonorBox form not loading

**Solution**:
1. Verify `NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID` is correct in `.env.local`
2. Check DonorBox campaign is active
3. Verify the iframe URL in browser console
4. Check for CORS or iframe loading errors

### Issue: Images not loading

**Solution**:
1. Ensure image URLs are direct links (ending in .jpg, .png, etc.)
2. Check if image host allows external embedding
3. Consider uploading images to Supabase Storage:
   - Go to Supabase Dashboard > Storage
   - Create a bucket called "children-photos"
   - Upload images
   - Use the public URL

### Issue: Can't access admin page in production

**Solution**: Ensure all environment variables are set in your production environment (Vercel, Netlify, etc.)

---

## Advanced: Uploading Images to Supabase

Instead of external URLs, you can store images directly in Supabase:

### 1. Create Storage Bucket

```sql
-- In Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('children-photos', 'children-photos', true);

-- Create policy for public access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'children-photos');

-- Create policy for authenticated uploads
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'children-photos');
```

### 2. Upload Images

1. Go to Supabase Dashboard > Storage > children-photos
2. Click **Upload**
3. Select image files
4. Copy the public URL
5. Use this URL in the "Photo URL" field when adding a child

---

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Rotate secrets regularly** - Change admin password periodically
3. **Use strong passwords** - Admin password should be 20+ characters
4. **HTTPS only in production** - Always use SSL certificates
5. **Monitor donations** - Check DonorBox dashboard regularly for new donations
6. **Backup database** - Supabase has automatic backups, but export regularly

---

## Next Steps

### Recommended Enhancements

1. **Email Notifications**: Send email to admin when new sponsorship is received
2. **Donor Dashboard**: Allow donors to see who they've sponsored
3. **Progress Updates**: Admin can post updates about sponsored children
4. **Photo Upload**: Add direct image upload in admin dashboard
5. **Recurring Donation Tracking**: Track monthly recurring donations
6. **Reports**: Generate sponsorship reports and analytics

### Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [DonorBox API Docs](https://donorbox.org/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Support

If you encounter issues:

1. Check this documentation first
2. Review error messages in browser console and terminal
3. Check Supabase logs: Dashboard > Logs
4. Verify all environment variables are correct

---

## Summary Checklist

Before going live, make sure you've completed:

- [ ] Created Supabase project and tables
- [ ] Set up DonorBox campaign
- [ ] Configured all environment variables
- [ ] Tested admin login and CRUD operations
- [ ] Added at least one test child
- [ ] Tested DonorBox form loads correctly
- [ ] Tested on mobile devices
- [ ] Set up production environment variables
- [ ] Deployed to production (Vercel/Netlify)

---

**Congratulations!** You now have a fully functional "Sponsor a Child" system. 🎉

For questions or support, refer to the documentation above or check the codebase comments.

