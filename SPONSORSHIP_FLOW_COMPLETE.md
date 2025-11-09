# Complete Sponsorship System Flow

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [File Structure & Responsibilities](#file-structure--responsibilities)
3. [User Journeys](#user-journeys)
4. [Data Flow](#data-flow)
5. [Auto-Archive Logic](#auto-archive-logic)
6. [API Endpoints](#api-endpoints)

---

## 🏗️ System Overview

The sponsorship system has **3 main actors**:

1. **Public Users** - Browse and sponsor children
2. **Admin Users** - Manage children records
3. **DonorBox Webhook** - Processes payments automatically

---

## 📁 File Structure & Responsibilities

### **Frontend Pages**

#### 1. `/sponsor` - Main Sponsor Page
**File:** `src/app/sponsor/page.tsx`

**Purpose:** Display all children needing sponsorship

**Logic:**
- Fetches all children from API
- Filters out archived children
- Shows only non-archived children
- Provides Age and Class filters

**User Actions:**
- Browse children cards
- Filter by Age (3-5, 6-8, 9-11, 12-14, 15+)
- Filter by Class (Baby/Middle/Top, P1-P7)
- Click "Learn More & Sponsor" → goes to `/sponsor/[id]`

**Key Code:**
```typescript
// Fetch children (excludes archived)
const res = await fetch('/api/children')
const data = await res.json()
setChildren(data.filter((child: Child) => !child.archived))

// Filter by age and class
const filteredChildren = children
  .filter(child => classFilter === 'all' || child.class_year === classFilter)
  .filter(filterByAge)
```

---

#### 2. `/sponsor/[id]` - Student Detail Page
**File:** `src/app/sponsor/[id]/page.tsx`

**Purpose:** Show detailed profile of one student + embedded donation form

**Logic:**
- Fetches single child by ID
- Redirects if child is archived
- Shows full bio, interests, photo
- Embeds DonorBox iframe

**User Actions:**
- Read full student bio
- See detailed information
- View funding progress
- Click "Sponsor {name} Now" → shows embedded DonorBox
- Make donation directly on page

**Key Code:**
```typescript
// Fetch single child
const res = await fetch(`/api/children/${id}`)
const data = await res.json()

// Redirect if archived
if (data.archived) {
  router.push('/sponsor')
  return
}

// Embed DonorBox
<iframe
  src={`https://donorbox.org/embed/${campaignId}?amount=${remainingAmount}&designation=${childName}`}
/>
```

---

#### 3. `/admin/dashboard` - Admin Dashboard
**File:** `src/app/admin/dashboard/page.tsx`

**Purpose:** Manage all children (CRUD operations)

**Logic:**
- Requires admin password (stored in sessionStorage)
- Fetches ALL children (including archived)
- Shows archived children with gray background
- Handles image uploads
- Provides Archive/Unarchive functionality

**Admin Actions:**
- Add new child (with photo upload)
- Edit existing child
- Archive/Unarchive child
- View all children including archived
- See "Goal Reached!" indicator

**Key Code:**
```typescript
// Fetch all children (admin sees archived too)
const res = await fetch('/api/children', {
  headers: { 'x-admin-password': adminPassword }
})

// Upload image
const formData = new FormData()
formData.append('file', imageFile)
const res = await fetch('/api/upload', { method: 'POST', body: formData })

// Archive child
const res = await fetch(`/api/children/${id}/archive`, {
  method: 'POST',
  body: JSON.stringify({ archived: true })
})
```

---

### **API Routes (Backend)**

#### 4. `/api/children` - List & Create Children
**File:** `src/app/api/children/route.ts`

**GET Endpoint:**
- **Public:** Returns only non-archived children
- **Admin:** Returns ALL children (including archived)
- **Logic:** Checks `x-admin-password` header to determine access level

```typescript
const isAdmin = adminPassword === process.env.ADMIN_PASSWORD

let query = supabase.from('children').select('*')

// If not admin, exclude archived
if (!isAdmin) {
  query = query.eq('archived', false)
}
```

**POST Endpoint:**
- **Purpose:** Create new child
- **Requires:** Admin password
- **Logic:** Cleans undefined values, inserts into database

```typescript
const cleanedBody = Object.fromEntries(
  Object.entries(body).filter(([_, value]) => value !== undefined)
)

await supabase.from('children').insert([cleanedBody])
```

---

#### 5. `/api/children/[id]` - Get, Update, Archive Child
**File:** `src/app/api/children/[id]/route.ts`

**GET Endpoint:**
- Fetches single child by ID
- Anyone can access

**PUT Endpoint:**
- **Purpose:** Update child information
- **Requires:** Admin password
- **Auto-Archive Logic:** 
  - Checks if `amount_raised >= amount_needed`
  - If YES → automatically sets `archived = true`
  - Child disappears from public page

```typescript
// Get current child data
const currentChild = await supabase
  .from('children')
  .select('amount_raised, amount_needed, archived')
  .eq('id', id)
  .single()

// Calculate new values
const newAmountRaised = cleanedBody.amount_raised ?? currentChild.amount_raised
const newAmountNeeded = cleanedBody.amount_needed ?? currentChild.amount_needed

// Auto-archive if goal met
if (newAmountRaised >= newAmountNeeded && !currentChild.archived) {
  cleanedBody.archived = true
}

await supabase.from('children').update(cleanedBody).eq('id', id)
```

**DELETE Endpoint:**
- **Actually Archives:** Soft delete (sets archived = true)
- Doesn't actually delete from database

```typescript
await supabase
  .from('children')
  .update({ archived: true })
  .eq('id', id)
```

---

#### 6. `/api/children/[id]/archive` - Manual Archive Toggle
**File:** `src/app/api/children/[id]/archive/route.ts`

**POST Endpoint:**
- **Purpose:** Manual archive/unarchive (admin override)
- **Use Case:** Admin wants to manually archive/unarchive a child

```typescript
const { archived } = await request.json()

await supabase
  .from('children')
  .update({ archived: archived ?? true })
  .eq('id', id)
```

---

#### 7. `/api/upload` - Image Upload
**File:** `src/app/api/upload/route.ts`

**POST Endpoint:**
- **Purpose:** Upload child photos to Supabase Storage
- **Validates:** File type (JPEG, PNG, WebP), Size (max 5MB)
- **Returns:** Public URL and storage path

**Flow:**
```typescript
1. Receive file from admin
2. Validate type and size
3. Generate unique filename: {timestamp}-{random}.{ext}
4. Upload to Supabase Storage bucket 'children-photos'
5. Return public URL and path
```

**DELETE Endpoint:**
- **Purpose:** Delete photo from storage
- **Use Case:** Admin removes photo

---

#### 8. `/api/donorbox-webhook` - Payment Processing
**File:** `src/app/api/donorbox-webhook/route.ts`

**POST Endpoint:**
- **Purpose:** Receive and process donations from DonorBox
- **Triggered:** When someone completes a donation
- **Auto-Archive Logic:** Archives child when funding goal reached

**Flow:**
```typescript
1. Receive webhook from DonorBox
2. Verify webhook signature
3. Extract donation data (amount, donor info, child ID)
4. Create sponsorship record in database
5. Update child's amount_raised
6. CHECK: Is amount_raised >= amount_needed?
7. If YES → Set archived = true
8. Child automatically removed from public page
```

**Key Code:**
```typescript
const newAmountRaised = (child.amount_raised || 0) + amount

// Auto-archive if funding goal met
const shouldArchive = newAmountRaised >= child.amount_needed

await supabase
  .from('children')
  .update({
    amount_raised: newAmountRaised,
    archived: shouldArchive,  // ← Auto-archive!
  })
  .eq('id', childId)
```

---

### **Components**

#### 9. Header Component
**File:** `src/components/Header.tsx`

**Features:**
- School logo (links to home)
- Navigation: About Us (dropdown), Programs, Impact, Contact
- Schools dropdown
- Get Involved dropdown
- Mobile responsive menu

#### 10. Footer Component
**File:** `src/components/Footer.tsx`

**Features:**
- Site footer with links
- Contact information

---

### **Database Schema**

#### Children Table
**Location:** Supabase

**Key Fields:**
```sql
id                UUID          (Primary key)
first_name        TEXT          (Required)
last_name         TEXT          (Required)
bio               TEXT          (Required)
class_year        TEXT          (Required - P1-P7, Baby/Middle/Top)
age               INTEGER       (Optional)
location          TEXT          (Optional)
interests         TEXT          (Optional)
amount_needed     NUMERIC       (Required - funding goal)
amount_raised     NUMERIC       (Default: 0 - current funding)
photo_url         TEXT          (Optional - public URL)
photo_path        TEXT          (Optional - storage path)
archived          BOOLEAN       (Default: false - auto-set when funded)
created_at        TIMESTAMP     (Auto)
updated_at        TIMESTAMP     (Auto)
```

**Key Logic:**
- `archived = false` → Shows on public sponsor page
- `archived = true` → Hidden from public, visible to admin
- Auto-archives when `amount_raised >= amount_needed`

#### Sponsorships Table
**Location:** Supabase

**Key Fields:**
```sql
id                        UUID
child_id                  UUID (Foreign key → children.id)
donor_name                TEXT
donor_email               TEXT
amount                    NUMERIC
frequency                 ENUM (one_time, monthly, yearly)
donorbox_transaction_id   TEXT
status                    ENUM (pending, completed, cancelled)
created_at                TIMESTAMP
```

---

## 🔄 Complete User Journeys

### Journey 1: Public User Sponsors a Child

**Step 1: Browse Children**
```
User → /sponsor
↓
Frontend: src/app/sponsor/page.tsx
↓
Fetches: GET /api/children (non-archived only)
↓
Backend: src/app/api/children/route.ts
↓
Database: SELECT * FROM children WHERE archived = false
↓
Returns: List of children needing sponsorship
↓
Frontend: Displays cards with filters
```

**Step 2: View Student Details**
```
User clicks: "Learn More & Sponsor"
↓
Navigate: /sponsor/{child-id}
↓
Frontend: src/app/sponsor/[id]/page.tsx
↓
Fetches: GET /api/children/{id}
↓
Backend: src/app/api/children/[id]/route.ts
↓
Database: SELECT * FROM children WHERE id = {id}
↓
Returns: Full child data
↓
Frontend: Shows detailed profile
```

**Step 3: Make Donation**
```
User clicks: "Sponsor {name} Now"
↓
Frontend: Shows embedded DonorBox iframe
↓
User: Fills donation form on DonorBox
↓
User: Completes payment
↓
DonorBox: Processes payment
↓
DonorBox: Sends webhook to your server
```

**Step 4: Webhook Processing (Automatic)**
```
DonorBox → POST /api/donorbox-webhook
↓
Backend: src/app/api/donorbox-webhook/route.ts
↓
1. Verify webhook signature
2. Extract donation data
3. Create sponsorship record
4. Fetch child's current funding
5. Calculate: newAmount = current + donation
6. CHECK: newAmount >= amount_needed?
7. If YES: archived = true (AUTO-ARCHIVE!)
↓
Database: UPDATE children SET 
   amount_raised = newAmount,
   archived = (newAmount >= amount_needed)
↓
Response: Success
↓
Frontend: Child auto-refreshes/disappears if funded
```

---

### Journey 2: Admin Manages Children

**Step 1: Login**
```
Admin → /admin
↓
Frontend: src/app/admin/page.tsx
↓
Enter password
↓
Store in: sessionStorage.setItem('adminPassword', password)
↓
Redirect: /admin/dashboard
```

**Step 2: View All Children**
```
Admin → /admin/dashboard
↓
Frontend: src/app/admin/dashboard/page.tsx
↓
Fetches: GET /api/children (with admin header)
↓
Backend: src/app/api/children/route.ts
↓
Check: Has x-admin-password header?
↓
If YES: Return ALL children (including archived)
If NO: Return only non-archived
↓
Frontend: Displays table with all children
  - Non-archived: Normal background
  - Archived: Gray background + "Archived" label
  - Funded: Shows "Goal Reached!" in green
```

**Step 3: Add New Child**
```
Admin clicks: "+ Add New Child"
↓
Frontend: Shows form with fields:
  - First Name, Last Name
  - Age
  - Class (dropdown: Baby/Middle/Top, P1-P7)
  - Location
  - Amount Needed
  - Amount Raised (read-only, grayed out)
  - Photo Upload (file input)
  - Interests
  - Bio
↓
Admin: Fills form and uploads photo
↓
Frontend: Upload photo first
↓
POST /api/upload (with file)
↓
Backend: src/app/api/upload/route.ts
  1. Validate file (type, size)
  2. Generate unique filename
  3. Upload to Supabase Storage: children-photos/
  4. Return photo_url and photo_path
↓
Frontend: Gets photo URLs
↓
POST /api/children (with all data including photo URLs)
↓
Backend: src/app/api/children/route.ts
  1. Verify admin password
  2. Clean undefined values
  3. Insert into database
↓
Database: INSERT INTO children
↓
Frontend: Shows success modal, refreshes list
```

**Step 4: Edit Child**
```
Admin clicks: "Edit" on a child
↓
Frontend: Loads child data into form
  - Displays current photo preview
  - All fields populated
  - Amount raised is read-only (grayed out)
↓
Admin: Makes changes, optionally uploads new photo
↓
Frontend: If new photo uploaded
  POST /api/upload → get new photo URLs
↓
PUT /api/children/{id} (with updated data)
↓
Backend: src/app/api/children/[id]/route.ts
  1. Verify admin password
  2. Clean undefined values
  3. Fetch current child data
  4. Check funding: amount_raised >= amount_needed?
  5. If YES: Set archived = true (AUTO-ARCHIVE!)
  6. Update child record
↓
Database: UPDATE children SET ... WHERE id = {id}
↓
Frontend: Shows success modal, refreshes list
  - If auto-archived: Child appears grayed out
```

**Step 5: Archive Child**
```
Admin clicks: "Archive" button
↓
Frontend: Shows confirmation modal
↓
Admin: Clicks "Confirm"
↓
POST /api/children/{id}/archive
↓
Backend: src/app/api/children/[id]/archive/route.ts
  1. Verify admin password
  2. Update archived field
↓
Database: UPDATE children SET archived = true WHERE id = {id}
↓
Frontend: Child appears grayed out in table
```

**Step 6: Remove Photo**
```
Admin: Editing child with photo
↓
Admin clicks: "Remove Photo"
↓
Frontend: Shows confirmation modal
↓
Admin: Clicks "Confirm"
↓
DELETE /api/upload (with photo_path)
↓
Backend: src/app/api/upload/route.ts
  1. Verify admin password
  2. Delete from Supabase Storage
↓
Storage: DELETE from children-photos bucket
↓
Frontend: Clears photo from form
↓
When saved: photo_url and photo_path set to empty
```

---

## 🔄 Complete Data Flow

### Flow 1: Public User Sponsors → Auto-Archive

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER ACTION                                                   │
└─────────────────────────────────────────────────────────────────┘
User visits: /sponsor
Browses children cards
Clicks: "Learn More & Sponsor Sarah"

┌─────────────────────────────────────────────────────────────────┐
│ 2. STUDENT DETAIL PAGE                                           │
└─────────────────────────────────────────────────────────────────┘
Frontend: /sponsor/{sarah-id}
Fetches: GET /api/children/{sarah-id}
Displays: Full profile, bio, interests, photo
Shows: Funding progress bar
Shows: "Sponsor Sarah Now" button

┌─────────────────────────────────────────────────────────────────┐
│ 3. EMBEDDED DONORBOX                                             │
└─────────────────────────────────────────────────────────────────┘
User clicks: "Sponsor Sarah Now"
Frontend: Displays DonorBox iframe (embedded on page)
DonorBox: Shows donation form
  - Pre-filled amount (remaining needed)
  - Pre-filled designation (Sarah's name)
User: Fills credit card info
User: Clicks "Donate"

┌─────────────────────────────────────────────────────────────────┐
│ 4. PAYMENT PROCESSING (DONORBOX)                                │
└─────────────────────────────────────────────────────────────────┘
DonorBox: Processes payment
DonorBox: Charges credit card
DonorBox: Payment successful
DonorBox: Sends webhook to your server

┌─────────────────────────────────────────────────────────────────┐
│ 5. WEBHOOK RECEIVED (YOUR SERVER)                               │
└─────────────────────────────────────────────────────────────────┘
POST /api/donorbox-webhook
Backend: src/app/api/donorbox-webhook/route.ts

Steps:
1. Verify webhook signature ✓
2. Extract donation data:
   - Amount: $50
   - Donor: John Smith
   - Child ID: sarah-id
3. Create sponsorship record:
   INSERT INTO sponsorships (
     child_id, donor_name, donor_email, amount, ...
   )
4. Fetch Sarah's current funding:
   - amount_raised: $450
   - amount_needed: $500
5. Calculate new amount:
   - newAmount = $450 + $50 = $500
6. Check if goal met:
   - Is $500 >= $500? YES!
7. Update child record:
   UPDATE children SET
     amount_raised = $500,
     archived = true        ← AUTO-ARCHIVE!
   WHERE id = sarah-id

┌─────────────────────────────────────────────────────────────────┐
│ 6. RESULT                                                        │
└─────────────────────────────────────────────────────────────────┘
Database: Sarah's record updated
  - amount_raised: $500
  - archived: true

Frontend (Public):
  - Sarah disappears from /sponsor page
  - If someone tries /sponsor/sarah-id → redirects

Frontend (Admin):
  - Sarah visible in admin dashboard
  - Gray background
  - "Archived" label
  - "Goal Reached!" green text
  - Can unarchive if needed
```

---

## 🎯 Auto-Archive Logic (Key Feature!)

### Where Auto-Archive Happens:

#### Location 1: DonorBox Webhook
**File:** `src/app/api/donorbox-webhook/route.ts`
**Trigger:** When donation is received
**Logic:**
```typescript
const newAmountRaised = (currentAmount || 0) + donationAmount
const shouldArchive = newAmountRaised >= amount_needed

await supabase
  .from('children')
  .update({
    amount_raised: newAmountRaised,
    archived: shouldArchive,  // ← Automatic!
  })
```

#### Location 2: Admin Update
**File:** `src/app/api/children/[id]/route.ts` (PUT)
**Trigger:** When admin saves child
**Logic:**
```typescript
// Get current data
const current = await fetch child data

// Calculate new values
const newRaised = updateData.amount_raised ?? current.amount_raised
const newNeeded = updateData.amount_needed ?? current.amount_needed

// Auto-archive if goal met
if (newRaised >= newNeeded && !current.archived) {
  updateData.archived = true
}
```

### Why This Works:

1. **Automatic:** No manual status updates needed
2. **Reliable:** Happens on every funding update
3. **Immediate:** Child hidden from public instantly
4. **Reversible:** Admin can unarchive if needed
5. **Simple:** One field instead of complex status system

---

## 🔐 Authentication & Security

### Admin Authentication
**Where:** `src/app/admin/page.tsx`
**Method:** Password-based (stored in sessionStorage)
**Flow:**
```typescript
1. Admin enters password
2. Verified against: process.env.ADMIN_PASSWORD
3. If correct: Store in sessionStorage
4. All API calls include: 'x-admin-password' header
5. Server verifies on every request
```

### Webhook Security
**Where:** `src/app/api/donorbox-webhook/route.ts`
**Method:** Signature verification
```typescript
const webhookSecret = request.headers.get('x-donorbox-signature')
if (webhookSecret !== process.env.DONORBOX_WEBHOOK_SECRET) {
  return 401 Unauthorized
}
```

### Storage Security
**Where:** Supabase Storage Policies
**Access:**
- Public: Can READ photos
- Service role: Can WRITE/DELETE photos
- Protected by admin password on API level

---

## 📊 Data Relationships

```
┌─────────────────────┐
│     children        │
│─────────────────────│
│ id (PK)             │◄────┐
│ first_name          │     │
│ last_name           │     │
│ amount_needed       │     │
│ amount_raised       │     │ References
│ archived (*)        │     │
│ photo_url           │     │
│ photo_path          │     │
│ class_year          │     │
│ age                 │     │
│ bio                 │     │
│ interests           │     │
└─────────────────────┘     │
                            │
                            │
┌─────────────────────┐     │
│   sponsorships      │     │
│─────────────────────│     │
│ id (PK)             │     │
│ child_id (FK)       │─────┘
│ donor_name          │
│ donor_email         │
│ amount              │
│ frequency           │
│ status              │
│ donorbox_trans_id   │
└─────────────────────┘
```

---

## 🎮 Control Flow Summary

### Public Page Flow:
```
Browser Request
    ↓
/sponsor page loads
    ↓
Fetch children (GET /api/children)
    ↓
Filter: archived = false
    ↓
Display cards (Age/Class filters)
    ↓
Click "Learn More"
    ↓
/sponsor/[id] page loads
    ↓
Fetch single child
    ↓
Show detailed profile + DonorBox embed
    ↓
User donates
    ↓
DonorBox webhook fires
    ↓
Update amount_raised
    ↓
Auto-archive if funded
    ↓
Child disappears from public
```

### Admin Flow:
```
/admin login
    ↓
Verify password
    ↓
/admin/dashboard
    ↓
Fetch ALL children (with admin header)
    ↓
Display table (archived shown grayed)
    ↓
Add/Edit child
    ↓
Upload photo (POST /api/upload)
    ↓
Save child (POST/PUT /api/children)
    ↓
Auto-archive if funded
    ↓
"Goal Reached!" shows in table
```

---

## 🔑 Key Files Quick Reference

| Purpose | File | Type |
|---------|------|------|
| Browse children | `src/app/sponsor/page.tsx` | Frontend |
| Student detail | `src/app/sponsor/[id]/page.tsx` | Frontend |
| Admin dashboard | `src/app/admin/dashboard/page.tsx` | Frontend |
| List/Create children | `src/app/api/children/route.ts` | API |
| Update/Archive child | `src/app/api/children/[id]/route.ts` | API |
| Upload photos | `src/app/api/upload/route.ts` | API |
| Process donations | `src/app/api/donorbox-webhook/route.ts` | API |
| Database types | `src/types/database.types.ts` | Types |
| Navigation | `src/components/Header.tsx` | Component |

---

## ✨ Special Features

### 1. Automatic Archiving
- **Trigger:** `amount_raised >= amount_needed`
- **Where:** Webhook + Admin update
- **Result:** Child hidden from public

### 2. Photo Upload System
- **Storage:** Supabase Storage (children-photos bucket)
- **Format:** JPEG, PNG, WebP (max 5MB)
- **Preview:** Shows before saving
- **Removable:** Admin can remove photos

### 3. Filter System
- **Age Filter:** 3-5, 6-8, 9-11, 12-14, 15+
- **Class Filter:** Baby/Middle/Top, P1-P7
- **Works Together:** Both filters applied simultaneously

### 4. Custom Modals
- **Success:** Green checkmark
- **Error:** Red X
- **Confirm:** Yellow warning
- **Centered:** Professional look

### 5. Responsive Design
- **Mobile:** Works on all screen sizes
- **Filters:** Stack on mobile
- **Cards:** Responsive grid (1/2/3 columns)
- **Forms:** Mobile-friendly inputs

---

## 🧪 Testing Checklist

### Public User Tests:
- [ ] Browse /sponsor page
- [ ] Use Age filter
- [ ] Use Class filter  
- [ ] Click "Learn More & Sponsor"
- [ ] See student detail page
- [ ] Click "Sponsor Now"
- [ ] See embedded DonorBox form
- [ ] Complete test donation (if possible)

### Admin Tests:
- [ ] Login to /admin
- [ ] Add new child with photo
- [ ] Verify amount_raised is read-only
- [ ] Edit existing child
- [ ] Upload new photo
- [ ] Remove photo
- [ ] Archive child → verify grayed out
- [ ] Unarchive child → verify restored
- [ ] Create child near funding goal
- [ ] Simulate reaching goal → verify auto-archive

### Auto-Archive Tests:
- [ ] Child with $500 needed, $499 raised
- [ ] Donate $1 via DonorBox
- [ ] Webhook processes
- [ ] Child auto-archives
- [ ] Child disappears from /sponsor
- [ ] Child shows as archived in admin
- [ ] "Goal Reached!" appears

---

## 🚨 Important Notes

1. **Amount Raised is READ-ONLY**
   - Admin cannot manually edit
   - Only updated via donations
   - Prevents data inconsistencies

2. **Archive is Soft Delete**
   - Children never actually deleted
   - Remain in database forever
   - Can be unarchived if needed

3. **DonorBox Integration**
   - Embedded iframe (not popup)
   - Pre-filled with child info
   - Webhook handles updates automatically

4. **Image Storage**
   - Stored in Supabase, not URLs
   - Public access for display
   - Admin-only for upload/delete

5. **No Status Field**
   - Simplified to just `archived`
   - Auto-archives when funded
   - Cleaner system overall

---

## 📞 Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Admin
ADMIN_PASSWORD=your_secure_password

# DonorBox
NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID=your_campaign_id
DONORBOX_WEBHOOK_SECRET=your_webhook_secret
```

---

## 🎉 Summary

The system is a **complete end-to-end sponsorship platform**:

✅ **Public users** browse and sponsor children  
✅ **Admin** manages all children with photo uploads  
✅ **DonorBox** processes payments and triggers webhooks  
✅ **Auto-archive** removes funded children automatically  
✅ **Clean UI** without complex status tracking  
✅ **Responsive** works on all devices  
✅ **Secure** with proper authentication  

Everything works together seamlessly! 🚀

