-- Add ip_address column for rate limiting
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- Create index for efficient rate limit queries
CREATE INDEX IF NOT EXISTS idx_inquiries_ip_created ON public.inquiries(ip_address, created_at);

-- Add explicit DENY policy for UPDATE on inquiries (only admins can update)
CREATE POLICY "Only admins can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add explicit DENY policy for DELETE on inquiries (only admins can delete)
CREATE POLICY "Only admins can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));