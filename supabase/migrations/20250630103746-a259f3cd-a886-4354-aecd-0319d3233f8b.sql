
-- Add brand_name column to hero_content table
ALTER TABLE public.hero_content 
ADD COLUMN brand_name TEXT NOT NULL DEFAULT 'EdCluster';
