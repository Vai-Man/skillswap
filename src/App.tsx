import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { SkillExplorer } from './pages/SkillExplorer';
import { Messages } from './pages/Messages';
import { Forum } from './pages/Forum';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skills" element={<SkillExplorer />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;