/*
  # Initial Schema for Skill Swap Platform

  1. New Tables
    - `profiles`
      - User profiles with basic information
    - `skills`
      - Available skills that can be offered or requested
    - `user_skills`
      - Skills that users can teach or want to learn
    - `skill_matches`
      - Matches between users based on complementary skills
    - `chat_rooms`
      - Chat rooms for matched users
    - `messages`
      - Messages within chat rooms
    - `reviews`
      - User reviews after skill exchanges
    - `forum_posts`
      - Community forum posts
    - `forum_comments`
      - Comments on forum posts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  full_name text,
  bio text,
  location text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_skills table
CREATE TABLE user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  skill_type text NOT NULL CHECK (skill_type IN ('offering', 'seeking')),
  proficiency_level text CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id, skill_type)
);

-- Create skill_matches table
CREATE TABLE skill_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES profiles(id),
  student_id uuid REFERENCES profiles(id),
  skill_id uuid REFERENCES skills(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_rooms table
CREATE TABLE chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES skill_matches(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES skill_matches(id) ON DELETE CASCADE,
  reviewer_id uuid REFERENCES profiles(id),
  reviewee_id uuid REFERENCES profiles(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create forum_posts table
CREATE TABLE forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum_comments table
CREATE TABLE forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles: users can read all profiles but only update their own
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Skills: viewable by all authenticated users
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

-- User Skills: users can manage their own skills
CREATE POLICY "Users can manage their own skills"
  ON user_skills FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Skill Matches: users can see matches they're involved in
CREATE POLICY "Users can see their own matches"
  ON skill_matches FOR SELECT
  TO authenticated
  USING (auth.uid() = teacher_id OR auth.uid() = student_id);

-- Chat Rooms: users can see rooms they're part of
CREATE POLICY "Users can see their chat rooms"
  ON chat_rooms FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM skill_matches sm
      WHERE sm.id = chat_rooms.match_id
      AND (sm.teacher_id = auth.uid() OR sm.student_id = auth.uid())
    )
  );

-- Messages: users can see messages in their chat rooms
CREATE POLICY "Users can see messages in their rooms"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_rooms cr
      JOIN skill_matches sm ON cr.match_id = sm.id
      WHERE cr.id = messages.chat_room_id
      AND (sm.teacher_id = auth.uid() OR sm.student_id = auth.uid())
    )
  );

-- Reviews: visible to all authenticated users
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

-- Forum posts and comments: visible to all authenticated users
CREATE POLICY "Forum posts are viewable by everyone"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Forum comments are viewable by everyone"
  ON forum_comments FOR SELECT
  TO authenticated
  USING (true);
