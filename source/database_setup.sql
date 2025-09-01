-- Supabase Database Setup SQL
-- Run these commands in your Supabase SQL Editor

-- 1. Create user profiles table (extends auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  car_id UUID REFERENCES public.cars(id),
  car_type TEXT NOT NULL,
  car_brand TEXT NOT NULL,
  insurance_type TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  dropoff_location TEXT NOT NULL,
  dropoff_date DATE NOT NULL,
  dropoff_time TIME NOT NULL,
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create cars table (if you want to store car data in Supabase instead of Contentful)
CREATE TABLE public.cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(8,2) NOT NULL,
  size TEXT NOT NULL,
  thumbnail_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies

-- User profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Bookings: Users can only see and manage their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings" ON public.bookings
  FOR DELETE USING (auth.uid() = user_id);

-- Cars: Everyone can view cars, only authenticated users can see them
CREATE POLICY "Anyone can view cars" ON public.cars
  FOR SELECT USING (true);

-- 6. Create function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Insert real car data from Contentful
INSERT INTO public.cars (title, description, price, size, thumbnail_url) VALUES
('Audi A4', '2.0L, Diesel, Automatic, Black', 150, 'medium', 'https://images.ctfassets.net/f8dn2cn69vjh/RSWxuMc16rqx5Pmx92aEA/8ab779b012ee99b8ef242e7b30a6687d/AudiA4.jpg'),
('Audi A5', '2.0L, Diesel, Automatic, Red', 170, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/61h3GOOMVe7DNBF6vtedHJ/8a373920b132620657cbc4366b0f78ef/AudiA5.jpg'),
('Mercedes C63 AMG', '4.0L, Petrol, Automatic, Black', 250, 'medium', 'https://images.ctfassets.net/f8dn2cn69vjh/7ihC2NtIS91LmenAyBR3OK/8d178f060abca1dc60106b142f46a62e/MercedesC63AMG.jpg'),
('Mercedes E63 AMG', '4.0L, Petrol, Automatic, Black', 270, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/7MMmw5GuOFAHQ5NMZrZ2et/14a4ef8e22583d1659da9a065db69bb6/MercedesE63AMG.jpg'),
('Mercedes S63 AMG', '4.0L, Petrol, Automatic, Black', 300, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/njvJwBBozYedEnLzS7MPr/2ba16b5d08ca7d1a7813978f3a01071f/MercedesS63AMG.jpg'),
('VW Transporter T6', '2.0L, Diesel, Manual, White', 100, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/332XYXptBa7RMIOvrnYHyG/41f5024ef743f5415a6a5c9cbaea4939/TransporterT6.jpg'),
('VW Golf R', '2.0L, Petrol, Automatic, Blue', 150, 'small', 'https://images.ctfassets.net/f8dn2cn69vjh/6Fa5TqJRGn5yRWFUu5OuGX/3cd1879827d4ea01bb38b7fba12870e8/GolfR.jpg'),
('Alfa Romeo Gulia QV', '3.0L, Petrol, Automatic, Green', 200, 'medium', 'https://images.ctfassets.net/f8dn2cn69vjh/18yzsSuJ5noAOGxpj8OCm8/7bcc678363a0bc9130ba1cd5a498cc15/AlfaRomeGuliaQ.jpg'),
('Audi A8', '4.0L, Petrol, Automatic, Gray', 400, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/DbGh2Lc6ucyvv2bVQHt7Y/f7aa8cccba42055d0e8482d541b7740a/AudiA8.jpg'),
('Alfa Romeo Stelvio', '3.0L, Petrol, Automatic, Gray', 250, 'medium', 'https://images.ctfassets.net/f8dn2cn69vjh/1vHHWVDYbcwpcUd1wGOg9g/6b5af579788881c321cfa20cc44a0940/AlfaRomeoStelvia.jpg'),
('Mercedes A45 AMG', '2.5L, Petrol, Automatic, Gray', 200, 'small', 'https://images.ctfassets.net/f8dn2cn69vjh/5PQv2vZ7ksLLZqq57ARafU/81e69eeabe2aa58316ec0493f2eeb2e8/MercedesA45AMG.jpg'),
('VW Arteon', '2.0L, Diesel, Automatic, Gray', 200, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/6erT1tPe7tsyQOCFHYWtuD/99983653c50e5e2a4da4e2fb1aff8c99/VWArteonRLine.jpg'),
('Audi A6 Avant', '3.0L, Diesel, Automatic, Black', 200, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/7ECPXCXiKOSRkvkpNX8Idd/813910205e8520d8d8bb2ca4e13c57e1/AudiA6Avant.jpg'),
('VW Passat CC R Line', '2.0L, Diesel, Automatic, White', 120, 'large', 'https://images.ctfassets.net/f8dn2cn69vjh/5F2QoRFh4MwExaidx99Kit/7dc20bc76a46e99c3c2fb57eae5bdd37/PassatCCRLine.jpg');

-- Create a function to check car availability that can read all bookings
CREATE OR REPLACE FUNCTION check_car_availability(
  car_ids_input UUID[],
  pickup_date_input DATE,
  pickup_time_input TIME,
  dropoff_date_input DATE,
  dropoff_time_input TIME
)
RETURNS UUID[]
LANGUAGE SQL
SECURITY DEFINER  -- This allows the function to bypass RLS
AS $$
  SELECT ARRAY(
    SELECT DISTINCT car_id 
    FROM bookings 
    WHERE car_id = ANY(car_ids_input)
    AND (
      -- Check for datetime overlap using the standard logic:
      -- existing_start < requested_end AND existing_end > requested_start
      (pickup_date + pickup_time::interval) < (dropoff_date_input + dropoff_time_input::interval)
      AND
      (dropoff_date + dropoff_time::interval) > (pickup_date_input + pickup_time_input::interval)
    )
  );
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_car_availability TO authenticated;
GRANT EXECUTE ON FUNCTION check_car_availability TO anon;

-- Alternative: Create a more permissive RLS policy for availability checking
-- This policy allows reading booking data for availability purposes
CREATE POLICY "Allow availability checking" ON public.bookings
  FOR SELECT 
  USING (
    -- Allow reading car_id and date/time fields for availability checking
    -- You can make this more restrictive if needed
    true
  );


-- ===============================================
-- MIGRATION SCRIPT FOR EXISTING DATABASES
-- ===============================================
-- Run this if you already have a bookings table and need to add the new fields

-- Add new columns to existing bookings table
-- ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS car_id UUID REFERENCES public.cars(id);
-- ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS dropoff_location TEXT;

-- Add DELETE policy for bookings (required for booking cancellation)
-- CREATE POLICY "Users can delete own bookings" ON public.bookings
--   FOR DELETE USING (auth.uid() = user_id);

-- Note: You may need to update existing records to have dropoff_location values
-- UPDATE public.bookings SET dropoff_location = pickup_location WHERE dropoff_location IS NULL;