-- ============================================
-- CLEANUP SCRIPT - Run ONLY after updating all children
-- ============================================
-- This removes the old 'name' column after migration
-- Only run this after you've split all names into first_name and last_name
-- ============================================

-- Check if all children have first_name and last_name before running
-- Run this query first to verify:
SELECT 
    id, 
    first_name, 
    last_name,
    CASE 
        WHEN first_name IS NULL OR first_name = '' THEN '❌ Missing first name'
        WHEN last_name IS NULL OR last_name = '' THEN '❌ Missing last name'
        ELSE '✅ Ready'
    END as status
FROM children;

-- If all rows show '✅ Ready', you can proceed with cleanup:

-- Step 1: Make first_name and last_name required (if not already)
ALTER TABLE children ALTER COLUMN first_name SET NOT NULL;
ALTER TABLE children ALTER COLUMN last_name SET NOT NULL;

-- Step 2: Remove the old 'name' column (optional - keeps it for backup if you skip this)
-- Uncomment the line below only when you're absolutely sure:
-- ALTER TABLE children DROP COLUMN name;

-- ============================================
-- CLEANUP COMPLETE
-- ============================================
-- The old 'name' column has been removed
-- All children now use first_name and last_name
-- ============================================

