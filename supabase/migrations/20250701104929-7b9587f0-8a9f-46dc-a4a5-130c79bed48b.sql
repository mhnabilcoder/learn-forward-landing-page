
-- Add URL fields to hero_content table
ALTER TABLE public.hero_content 
ADD COLUMN primary_button_url TEXT DEFAULT 'https://platform.edcluster.com',
ADD COLUMN secondary_button_url TEXT DEFAULT '#';

-- Create general_settings table for meta descriptions, mottos, tags, etc.
CREATE TABLE public.general_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT NOT NULL DEFAULT 'EdCluster',
  meta_description TEXT NOT NULL DEFAULT 'Transform your learning journey with EdCluster',
  motto TEXT NOT NULL DEFAULT 'Empowering Bangladesh''s Future',
  tagline TEXT NOT NULL DEFAULT 'Gen Z Deserves Better',
  scroll_text TEXT NOT NULL DEFAULT 'Scroll down to explore',
  access_platform_url TEXT NOT NULL DEFAULT 'https://platform.edcluster.com',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vision_mission table
CREATE TABLE public.vision_mission (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vision_title TEXT NOT NULL DEFAULT 'Our Vision',
  vision_content TEXT NOT NULL DEFAULT 'To revolutionize education in Bangladesh',
  mission_title TEXT NOT NULL DEFAULT 'Our Mission', 
  mission_content TEXT NOT NULL DEFAULT 'Empowering students with cutting-edge learning tools',
  what_sets_us_apart_title TEXT NOT NULL DEFAULT 'What Sets Us Apart',
  what_sets_us_apart_content TEXT NOT NULL DEFAULT 'Innovation, Quality, and Student-Centric Approach',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create footer_settings table
CREATE TABLE public.footer_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'EdCluster',
  company_description TEXT NOT NULL DEFAULT 'Transforming education through innovative technology',
  email TEXT NOT NULL DEFAULT 'info@edcluster.com',
  facebook_url TEXT DEFAULT 'https://facebook.com/edcluster',
  instagram_url TEXT DEFAULT 'https://instagram.com/edcluster',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/company/edcluster',
  youtube_url TEXT DEFAULT 'https://youtube.com/@edcluster',
  platform_links JSONB DEFAULT '[]'::jsonb,
  access_platform_url TEXT NOT NULL DEFAULT 'https://platform.edcluster.com',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add section titles and taglines to existing tables
ALTER TABLE public.about_tiles 
ADD COLUMN section_title TEXT DEFAULT 'About EdCluster',
ADD COLUMN section_tagline TEXT DEFAULT 'Why Choose Us';

ALTER TABLE public.features 
ADD COLUMN section_title TEXT DEFAULT 'Our Features',
ADD COLUMN section_tagline TEXT DEFAULT 'What We Offer';

ALTER TABLE public.supporting_organizations 
ADD COLUMN section_title TEXT DEFAULT 'Supporting Organizations',
ADD COLUMN section_tagline TEXT DEFAULT 'Our Partners';

ALTER TABLE public.client_organizations 
ADD COLUMN section_title TEXT DEFAULT 'Our Clients',
ADD COLUMN section_tagline TEXT DEFAULT 'Trusted By';

ALTER TABLE public.testimonials 
ADD COLUMN section_title TEXT DEFAULT 'What People Say',
ADD COLUMN section_tagline TEXT DEFAULT 'Student Testimonials';

ALTER TABLE public.founders 
ADD COLUMN section_title TEXT DEFAULT 'Meet Our Founders',
ADD COLUMN section_tagline TEXT DEFAULT 'Leadership Team';

ALTER TABLE public.advisors 
ADD COLUMN section_title TEXT DEFAULT 'Advisory Board',
ADD COLUMN section_tagline TEXT DEFAULT 'Expert Guidance';

-- Enable RLS for new tables
ALTER TABLE public.general_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vision_mission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables
CREATE POLICY "Public read access" ON public.general_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON public.general_settings FOR ALL USING (true);

CREATE POLICY "Public read access" ON public.vision_mission FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON public.vision_mission FOR ALL USING (true);

CREATE POLICY "Public read access" ON public.footer_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON public.footer_settings FOR ALL USING (true);

-- Insert default data
INSERT INTO public.general_settings (site_title, meta_description, motto, tagline, scroll_text, access_platform_url) 
VALUES ('EdCluster', 'Transform your learning journey with EdCluster', 'Empowering Bangladesh''s Future', 'Gen Z Deserves Better', 'Scroll down to explore', 'https://platform.edcluster.com');

INSERT INTO public.vision_mission (vision_title, vision_content, mission_title, mission_content, what_sets_us_apart_title, what_sets_us_apart_content)
VALUES ('Our Vision', 'To revolutionize education in Bangladesh', 'Our Mission', 'Empowering students with cutting-edge learning tools', 'What Sets Us Apart', 'Innovation, Quality, and Student-Centric Approach');

INSERT INTO public.footer_settings (company_name, company_description, email, platform_links)
VALUES ('EdCluster', 'Transforming education through innovative technology', 'info@edcluster.com', '[{"name": "Learning Dashboard", "url": "/dashboard"}, {"name": "Course Catalog", "url": "/courses"}, {"name": "Student Portal", "url": "/student"}]'::jsonb);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create storage policies for images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
