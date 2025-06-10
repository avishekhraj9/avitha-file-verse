
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";
import { ChatApp } from "@/components/ChatApp";

const Index = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const userData = {
    id: user.id,
    name: user.user_metadata?.username || user.email?.split("@")[0] || "Unknown",
    email: user.email || ""
  };

  return <ChatApp user={userData} onLogout={signOut} />;
};

export default Index;
