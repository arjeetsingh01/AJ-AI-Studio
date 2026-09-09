import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Features from "./pages/FeatureCard";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AIChat from "./pages/AIChat";
import Summarizer from "./pages/Summarizer";
import Translator from "./pages/Translator";
import ResumeBuilder from "./pages/ResumeBuilder";
import EmailWriter from "./pages/EmailWriter";
import CodeAssistant from "./pages/CodeAssistant";
import ImageGenerator from "./pages/ImageGenerator";
import DocumentQA from "./pages/DocumentQA";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Workspace */}
        <Route element={<ProtectedRoute />}>

          {/* AI Tools */}
          <Route path="/ai-chat" element={<AIChat />} />
          <Route
            path="/summarizer"
            element={<Summarizer />}
          />
          <Route
            path="/translator"
            element={<Translator />}
          />
          <Route
            path="/resume-builder"
            element={<ResumeBuilder />}
          />
          <Route
            path="/email-writer"
            element={<EmailWriter />}
          />
          <Route
            path="/code-assistant"
            element={<CodeAssistant />}
          />
          <Route
            path="/image-generator"
            element={<ImageGenerator />}
          />
          <Route
            path="/document-qa"
            element={<DocumentQA />}
          />

          {/* User Workspace */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/history"
            element={<History />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>
    </Routes>
  );
}

export default App;