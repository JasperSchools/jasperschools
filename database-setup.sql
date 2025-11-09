-- ============================================
-- SPONSOR A CHILD - DATABASE SETUP
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- to create all necessary tables and policies
-- ============================================

-- Create enum types
CREATE TYPE child_status AS ENUM ('available', 'partially_sponsored', 'fully_sponsored');
CREATE TYPE sponsorship_frequency AS ENUM ('one_time', 'monthly', 'yearly');
CREATE TYPE sponsorship_status AS ENUM ('pending', 'completed', 'cancelled');

-- ============================================
-- Create children table
-- ============================================
CREATE TABLE children (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    bio TEXT NOT NULL,
    class_year TEXT NOT NULL,
    age INTEGER,
    location TEXT,
    interests TEXT,
    amount_needed NUMERIC(10, 2) NOT NULL,
    amount_raised NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    photo_url TEXT,
    photo_path TEXT,
    archived BOOLEAN DEFAULT FALSE NOT NULL,
    status child_status DEFAULT 'available' NOT NULL
);

-- ============================================
-- Create sponsorships table
-- ============================================
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

-- ============================================
-- Create indexes for better performance
-- ============================================
CREATE INDEX idx_children_status ON children(status);
CREATE INDEX idx_children_archived ON children(archived);
CREATE INDEX idx_children_created_at ON children(created_at DESC);
CREATE INDEX idx_sponsorships_child_id ON sponsorships(child_id);
CREATE INDEX idx_sponsorships_created_at ON sponsorships(created_at DESC);

-- ============================================
-- Create function to auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- Create trigger to auto-update updated_at
-- ============================================
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Create RLS Policies
-- ============================================

-- Public read access for children (exclude archived)
CREATE POLICY "Children are viewable by everyone" 
    ON children FOR SELECT 
    USING (archived = FALSE);

-- Public read access for sponsorships
CREATE POLICY "Sponsorships are viewable by everyone" 
    ON sponsorships FOR SELECT 
    USING (true);

-- Allow service role to insert/update/delete children
CREATE POLICY "Enable insert for service role only" 
    ON children FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Enable update for service role only" 
    ON children FOR UPDATE 
    USING (true);

CREATE POLICY "Enable delete for service role only" 
    ON children FOR DELETE 
    USING (true);

-- Allow service role to insert sponsorships
CREATE POLICY "Enable insert for service role only (sponsorships)" 
    ON sponsorships FOR INSERT 
    WITH CHECK (true);

-- ============================================
-- OPTIONAL: Create storage bucket for photos
-- ============================================
-- Uncomment the following if you want to store images in Supabase Storage

INSERT INTO storage.buckets (id, name, public)
VALUES ('children-photos', 'children-photos', true);

CREATE POLICY "Public Access to children photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'children-photos');

CREATE POLICY "Authenticated users can upload children photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'children-photos');

-- ============================================
-- OPTIONAL: Insert sample data for testing
-- ============================================
-- Uncomment to add sample children for testing

INSERT INTO children (first_name, last_name, bio, class_year, age, location, interests, amount_needed, amount_raised, status)
VALUES 
(
    'Sarah',
    'Nakato',
    'Sarah is a bright and enthusiastic student who dreams of becoming a doctor. She loves science and helps younger students with their homework. Despite facing challenges, she maintains top grades in her class.',
    'P5',
    11,
    'Nyairongo, Uganda',
    'Science, Reading, Helping Others',
    500.00,
    0.00,
    'available'
),
(
    'James',
    'Okello',
    'James is passionate about mathematics and sports. He is the captain of the school football team and hopes to become an engineer one day. He comes from a family of farmers and is the first in his family to attend school.',
    'P6',
    12,
    'Nyairongo, Uganda',
    'Math, Football, Engineering',
    600.00,
    0.00,
    'available'
);

-- ============================================
-- Setup Complete!
-- ============================================
-- Next steps:
-- 1. Copy your Supabase project URL and keys
-- 2. Add them to your .env.local file
-- 3. Start your Next.js application
-- 4. Access the admin panel at /admin
-- ============================================

