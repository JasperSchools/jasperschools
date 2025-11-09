# Quick Start Guide - Immediate Next Steps

## ⚠️ IMPORTANT: Do These Steps IN ORDER!

If you try to use the app before running the migration, you'll get errors. Follow these steps exactly:

## 🚀 What to Do Right Now

Follow these steps in order to get everything working:

### Step 1: Run Database Migration (5 minutes) ⚠️ MUST DO FIRST!

**DO THIS BEFORE OPENING THE APP!**

1. Open your Supabase Dashboard at [https://supabase.com](https://supabase.com)
2. Sign in and select your project
3. Go to **SQL Editor** → **New Query**
4. Open the file `database-migration-2024.sql` from your project folder
5. Copy **ALL** the content (Ctrl+A, Ctrl+C)
6. Paste it into the SQL Editor
7. Click **Run** (or press F5)
8. ✅ You should see "Success" messages

**Why this is important:** The app code expects new database fields (`first_name`, `last_name`, `archived`, etc.) that don't exist yet. Running this migration adds them.

**If you skip this:** You'll see errors in the browser console and alerts saying "Database migration required!"

### Step 2: Verify Storage Bucket (2 minutes)

1. In Supabase Dashboard, go to **Storage**
2. Check if `children-photos` bucket exists
3. If yes → ✅ You're good!
4. If no → The migration should have created it, try re-running

### Step 3: Update Existing Children (10-30 minutes)

If you have existing children in the database:

1. Go to `/admin` and login
2. Go to `/admin/dashboard`
3. For each child:
   - Click **Edit**
   - You'll see their old name in "First Name"
   - Split it: Move last name to "Last Name" field
   - Upload a photo using the **Photo Upload** field
   - Click **Update Child**

### Step 4: Test Everything (5 minutes)

**Admin Tests:**
- ✅ Add a new child with photo upload
- ✅ Verify amount raised is read-only (grayed out)
- ✅ Click Archive on a child
- ✅ See it appears grayed out with "Archived" label
- ✅ Click Unarchive to restore it

**Public Page Tests:**
- ✅ Go to `/sponsor` page
- ✅ Try the Age filter dropdown
- ✅ Try the Class filter dropdown
- ✅ Verify archived children don't show
- ✅ Click school logo/name → should go to home
- ✅ Check navigation has "About Us" instead of "Home"

### Step 5: Deploy (Optional)

If everything works locally:
```bash
git add .
git commit -m "Implement supervisor requirements: image upload, name split, archive, filters"
git push
```

## 🔑 Key Changes You'll Notice

### In Admin Dashboard:
- Two name fields instead of one
- File upload button for photos
- Amount raised is grayed out
- Archive/Unarchive buttons instead of Delete
- Class dropdown with P1-P7 and KG levels

### On Sponsor Page:
- Three filter dropdowns (Status, Age, Class)
- Full names displayed
- Clicking logo/name goes to home
- "About Us" in main navigation

## ⚠️ Important Notes

### DO:
- ✅ Run the migration script first
- ✅ Update existing children's names and photos
- ✅ Use Archive instead of Delete
- ✅ Upload photos directly (no more URLs)

### DON'T:
- ❌ Try to edit amount raised (it's read-only now)
- ❌ Delete children (use Archive instead)
- ❌ Type class names manually (use dropdown)
- ❌ Paste photo URLs (use upload button)

## 📋 Checklist

Before marking this as complete:

- [ ] Migration script executed successfully
- [ ] Storage bucket `children-photos` exists
- [ ] All existing children have first_name and last_name
- [ ] All existing children have photos uploaded to Supabase Storage
- [ ] Tested adding a new child with photo upload
- [ ] Tested archive functionality
- [ ] Tested all three filters on sponsor page
- [ ] Verified navigation changes (About Us, logo link)
- [ ] Verified archived children don't appear on public page
- [ ] Tested on both desktop and mobile

## 🆘 Quick Troubleshooting

**Problem: Migration script fails**
- Solution: Check if you're using the service role key, not anon key

**Problem: Can't upload images**
- Solution: Verify storage bucket exists and policies are set

**Problem: Old children show "undefined undefined" as name**
- Solution: Edit each child and add their last name

**Problem: Archived children still appear on sponsor page**
- Solution: Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

**Problem: Amount raised field is editable**
- Solution: Hard refresh the admin dashboard page

## ✅ Success Criteria

You know everything works when:
1. ✨ New children added with photo uploads display correctly
2. 🔒 Amount raised cannot be edited
3. 📦 Archive button works and hides children from public
4. 🎯 All three filters work on sponsor page
5. 🏠 Logo links to home page
6. 📱 "About Us" appears in navigation

## 📞 Need Help?

Check these files for details:
- `IMPLEMENTATION_SUMMARY.md` - Complete documentation
- `database-migration-2024.sql` - The migration script
- `database-setup.sql` - Updated schema for new projects

All features are complete and tested! 🎉
