import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Users, MessageSquare, BookOpen, User } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();

  if (!user) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Users className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SkillSwap
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavItem
                  to="/"
                  icon={<Home className="h-5 w-5" />}
                  label="Home"
                  isActive={location.pathname === '/'}
                />
                <NavItem
                  to="/skills"
                  icon={<BookOpen className="h-5 w-5" />}
                  label="Skills"
                  isActive={location.pathname === '/skills'}
                />
                <NavItem
                  to="/messages"
                  icon={<MessageSquare className="h-5 w-5" />}
                  label="Messages"
                  isActive={location.pathname === '/messages'}
                />
                <NavItem
                  to="/profile"
                  icon={<User className="h-5 w-5" />}
                  label="Profile"
                  isActive={location.pathname === '/profile'}
                />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}