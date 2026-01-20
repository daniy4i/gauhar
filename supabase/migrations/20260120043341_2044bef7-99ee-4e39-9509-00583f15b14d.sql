-- Create inquiries table to store contact form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT,
  project_type TEXT,
  area TEXT,
  budget TEXT,
  message TEXT,
  language TEXT DEFAULT 'ru',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public contact form)
CREATE POLICY "Anyone can submit inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users (admin) can view inquiries
CREATE POLICY "Authenticated users can view inquiries" 
ON public.inquiries 
FOR SELECT 
USING (auth.role() = 'authenticated');