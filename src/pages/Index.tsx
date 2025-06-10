
import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { ChatApp } from "@/components/ChatApp";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const handleLogin = (userData: { id: string; name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <ChatApp user={user!} onLogout={handleLogout} />;
};

export default Index;
