import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, MessageSquare, ArrowRight, CheckCircle, Globe, Shield } from 'lucide-react';

export function Home() {
  const { user, signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (email === 'admin' && password === 'admin123') {
        await signIn(email, password);
        navigate('/admin');
        return;
      }

      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setIsSignUp(type === 'signup');
    document.getElementById('auth-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="pt-16 pb-20">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-white mb-6">
                Welcome to SkillSwap
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Exchange skills, learn from others, and grow together. Join our community of learners and teachers sharing knowledge without monetary transactions.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleAuthClick('signin')}
                  className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors border-2 border-white"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              How SkillSwap Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Skills</h3>
                <p className="text-indigo-100">Share what you can teach and what you want to learn. Our platform makes it easy to showcase your expertise.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
                <p className="text-indigo-100">Get matched with users who have complementary skills. Our smart system helps you find the perfect learning partner.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                <p className="text-indigo-100">Connect through our built-in chat, schedule sessions, and begin your skill exchange journey.</p>
              </div>
            </div>
          </div>

          {/* Auth Form */}
          <div id="auth-form" className="py-12">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="px-8 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {email === 'admin' ? 'Username' : 'Email'}
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                  <div className="text-sm text-center pb-6">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {isSignUp
                        ? 'Already have an account? Sign in'
                        : "Don't have an account? Sign up"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose SkillSwap?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <CheckCircle className="w-8 h-8 mb-4 text-indigo-300" />
                <h3 className="text-lg font-semibold mb-2">Free to Use</h3>
                <p className="text-indigo-100">No monetary transactions required. Exchange skills based on mutual benefit.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Shield className="w-8 h-8 mb-4 text-indigo-300" />
                <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
                <p className="text-indigo-100">Your data is protected. We ensure a safe environment for skill exchange.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Users className="w-8 h-8 mb-4 text-indigo-300" />
                <h3 className="text-lg font-semibold mb-2">Growing Community</h3>
                <p className="text-indigo-100">Join thousands of users sharing knowledge and skills.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <Globe className="w-8 h-8 mb-4 text-indigo-300" />
                <h3 className="text-lg font-semibold mb-2">Global Network</h3>
                <p className="text-indigo-100">Connect with learners and teachers from around the world.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-8 text-center border-t border-white/10">
          <p className="text-indigo-100 text-sm">
            Created by{' '}
            <span className="font-medium">
              Vaibhav Manihar, Abhinav Debnath, Madhav M, Vikhyat, Adhithya RP
            </span>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/skills"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Explore Skills
              </h2>
              <p className="text-gray-500">
                Discover skills to learn or share your expertise
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/messages"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <p className="text-gray-500">
                Connect with your skill exchange partners
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/forum"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Community Forum
              </h2>
              <p className="text-gray-500">
                Join discussions and share experiences
              </p>
            </div>
          </div>
        </Link>
      </div>

      <section className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <p className="text-gray-500">No recent activity</p>
        </div>
      </section>
    </div>
  );
}