import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Children from './pages/Children';
import AddChild from './pages/AddChild';
import ChildProfile from './pages/ChildProfile';
import OralReading from './pages/OralReading';
import OralReadingResult from './pages/OralReadingResult';
import QnAAssessment from './pages/QnAAssessment';
import QnAResult from './pages/QnAResult';
import QuestionBank from './pages/QuestionBank';
import AssessmentHistory from './pages/AssessmentHistory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Root Redirect component: Ensures Login page appears when the application starts
function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Educator Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/children" element={<Children />} />
            <Route path="/children/add" element={<AddChild />} />
            <Route path="/children/:id" element={<ChildProfile />} />
            
            {/* Assessment Module 1: Oral Reading Fluency */}
            <Route path="/assess/oral" element={<OralReading />} />
            <Route path="/assess/oral/result" element={<OralReadingResult />} />

            {/* Assessment Module 2: Q&A Reading Comprehension */}
            <Route path="/assess/qa" element={<QnAAssessment />} />
            <Route path="/assess/qa/result" element={<QnAResult />} />

            {/* Benchmark Datasets & History */}
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/history" element={<AssessmentHistory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Application Entry Point: Redirect to /login if unauthenticated, else /dashboard */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
