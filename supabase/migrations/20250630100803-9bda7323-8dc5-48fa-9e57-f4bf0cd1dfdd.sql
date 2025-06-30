
-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for hero section content
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_button_text TEXT NOT NULL,
  secondary_button_text TEXT NOT NULL,
  stat1_number TEXT NOT NULL,
  stat1_label TEXT NOT NULL,
  stat2_number TEXT NOT NULL,
  stat2_label TEXT NOT NULL,
  stat3_number TEXT NOT NULL,
  stat3_label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for about section tiles
CREATE TABLE public.about_tiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color_scheme TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for features
CREATE TABLE public.features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color_scheme TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for supporting organizations
CREATE TABLE public.supporting_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_text TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for client organizations
CREATE TABLE public.client_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_text TEXT NOT NULL,
  website TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for founders
CREATE TABLE public.founders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  avatar_text TEXT NOT NULL,
  portfolio_url TEXT,
  has_image BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for advisors
CREATE TABLE public.advisors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  credentials TEXT NOT NULL,
  expertise TEXT NOT NULL,
  description TEXT NOT NULL,
  color_scheme TEXT NOT NULL,
  has_image BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default data for hero section
INSERT INTO public.hero_content (title, subtitle, description, primary_button_text, secondary_button_text, stat1_number, stat1_label, stat2_number, stat2_label, stat3_number, stat3_label) 
VALUES (
  'Transform Your',
  'Learning Journey',
  'Bangladesh''s Gen Z Deserves Better — An Upcoming EdTech Revolution',
  'Visit The Platform',
  'Watch Intro',
  '50K+',
  'Active Learners',
  '1000+',
  'Expert Courses',
  '95%',
  'Success Rate'
);

-- Insert default about tiles
INSERT INTO public.about_tiles (title, description, icon_name, color_scheme, order_index) VALUES
('Community Driven', 'Connect with learners and industry professionals', 'Users', 'blue', 1),
('Goal Oriented', 'Clear learning objectives with practical outcomes', 'Target', 'purple', 2),
('Excellence First', 'Highest standards in content quality and expertise', 'Award', 'green', 3),
('Student Focused', 'Putting student success at the center of everything we do', 'Heart', 'red', 4),
('Innovation Driven', 'Constantly evolving with the latest educational technologies', 'BookOpen', 'indigo', 5);

-- Insert default features
INSERT INTO public.features (title, description, icon_name, color_scheme, order_index) VALUES
('Feature 1', 'Advanced learning management system with personalized dashboards and progress tracking for optimal learning outcomes.', 'Users', 'blue', 1),
('Feature 2', 'Interactive learning modules with real-time feedback and adaptive content delivery for enhanced engagement.', 'Target', 'purple', 2),
('Feature 3', 'Comprehensive certification system with industry-recognized credentials and career advancement opportunities.', 'Award', 'green', 3);

-- Insert default supporting organizations
INSERT INTO public.supporting_organizations (name, logo_text, order_index) VALUES
('University Tech Club', 'UTC', 1),
('Daily Education News', 'DEN', 2),
('Innovation Hub BD', 'IHB', 3),
('Student Press Association', 'SPA', 4),
('Tech Times Bangladesh', 'TTB', 5),
('Education Today', 'ET', 6),
('Digital Learning Forum', 'DLF', 7),
('Future Leaders Club', 'FLC', 8),
('Academic Excellence Society', 'AES', 9),
('Knowledge Network BD', 'KNB', 10);

-- Insert default client organizations
INSERT INTO public.client_organizations (name, logo_text, website, testimonial, rating, order_index) VALUES
('TechCorp Solutions', 'TC', 'https://techcorp.com', 'Amazing platform that transformed our employee training programs.', 5, 1),
('EduInnovate', 'EI', 'https://eduinnovate.com', 'The best investment we made for our educational initiatives.', 5, 2),
('Global Learning Hub', 'GLH', 'https://globallearning.com', 'Exceptional quality and outstanding support from the team.', 5, 3),
('FutureTech Academy', 'FTA', 'https://futuretech.com', 'Our students love the interactive learning experience.', 5, 4);

-- Insert default testimonials
INSERT INTO public.testimonials (name, role, avatar_text, rating, comment, order_index) VALUES
('Sarah Johnson', 'Software Developer', 'SJ', 5, 'This platform completely changed how I approach learning. The courses are incredibly well-structured and the instructors are top-notch.', 1),
('Michael Chen', 'Data Scientist', 'MC', 5, 'I''ve tried many online learning platforms, but this one stands out. The interactive elements and practical projects make all the difference.', 2),
('Emily Rodriguez', 'Product Manager', 'ER', 5, 'The quality of education here is exceptional. I was able to advance my career significantly thanks to the skills I learned.', 3),
('David Thompson', 'UX Designer', 'DT', 5, 'Amazing learning experience! The platform is intuitive and the course content is always up-to-date with industry standards.', 4),
('Lisa Wang', 'Marketing Director', 'LW', 5, 'The best investment I''ve made in my professional development. The courses are engaging and the community is incredibly supportive.', 5),
('James Wilson', 'Full Stack Developer', 'JW', 5, 'Fantastic platform with excellent instructors. The hands-on approach really helps in understanding complex concepts.', 6),
('Anna Martinez', 'Business Analyst', 'AM', 5, 'The beta experience has been incredible. Looking forward to seeing more features as the platform evolves.', 7),
('Robert Kim', 'AI Engineer', 'RK', 5, 'Being part of the beta program gave me early access to cutting-edge courses. Highly recommend this platform!', 8);

-- Insert default founders
INSERT INTO public.founders (name, title, description, avatar_text, portfolio_url, has_image, order_index) VALUES
('Mahedi Hasan Nabil', 'Co-Founder & COO', 'As a strategist at heart, I align internal operations with long-term business growth, giving ideas a clear structure, commercial direction, and the ability to scale. My focus is on building systems that make innovation sustainable.', 'MN', 'https://mahedi-portfolio.com', FALSE, 1),
('Adnan Shihab', 'Co-Founder & CEO', 'Passionate about building innovative educational solutions that not only make learning accessible to all, but also deliver a seamless user experience, with a vision to unify the fragmented education market under one powerful, integrated platform.', 'AS', NULL, FALSE, 2);

-- Insert default advisors
INSERT INTO public.advisors (name, credentials, expertise, description, color_scheme, has_image, image_url, order_index) VALUES
('Mujibur Rahman', 'ACCA Member & CEO of MR-Accountants', 'Financial Systems & Strategic Planning', 'Has advised and supported multiple international EdTech startups, including CodeNinja, TutorChase, and Lumiere Education, serving as a Fractional CFO. As an advisor, he helps us build strong financial systems, establish transparent reporting practices, and craft smarter, long-term financial strategies. His guidance ensures we stay investor-ready, cost-efficient, and financially aligned with our growth goals.', 'from-blue-500 to-indigo-600', TRUE, '/lovable-uploads/8b1a45e2-9d85-4b67-9eb6-59b0a2909411.png', 1),
('Md. Farabi', 'IBA DU Graduate & Edtech Veteran', 'Business Strategy & Growth', 'Previously worked in a leading edtech platform, helps us plan business strategic decisions and growth acceleration with precise timing and market insights.', 'from-purple-500 to-blue-600', FALSE, NULL, 2);

-- Enable Row Level Security on all tables (for future admin authentication)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_tiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supporting_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (content should be readable by everyone)
CREATE POLICY "Public read access" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.about_tiles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.features FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.supporting_organizations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.client_organizations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.founders FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.advisors FOR SELECT USING (true);

-- Admin users can do everything on content tables (we'll implement proper admin auth later)
CREATE POLICY "Admin full access" ON public.hero_content FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.about_tiles FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.features FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.supporting_organizations FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.client_organizations FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.testimonials FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.founders FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.advisors FOR ALL USING (true);
