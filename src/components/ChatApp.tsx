
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Paperclip, LogOut, Users, Hash } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessage } from "./ChatMessage";
import { FileUpload } from "./FileUpload";

interface ChatAppProps {
  user: { id: string; name: string; email: string };
  onLogout: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: { id: string; name: string };
  timestamp: Date;
  files?: { name: string; url: string; type: string }[];
}

export const ChatApp = ({ user, onLogout }: ChatAppProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Avitha! 🎉 Feel free to share files, images, and chat with everyone.",
      sender: { id: "system", name: "Avitha Bot" },
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: user,
      timestamp: new Date(),
      files: selectedFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      })),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    setSelectedFiles([]);
  };

  const handleFileSelect = (files: FileList) => {
    setSelectedFiles(Array.from(files));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-purple-800 text-white flex flex-col">
        <div className="p-4 border-b border-purple-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Avitha</h1>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                CHANNELS
              </h3>
              <div className="space-y-1">
                <div className="px-3 py-2 rounded-lg bg-white/10 text-white">
                  # general
                </div>
                <div className="px-3 py-2 rounded-lg text-purple-200 hover:bg-white/5 cursor-pointer">
                  # random
                </div>
                <div className="px-3 py-2 rounded-lg text-purple-200 hover:bg-white/5 cursor-pointer">
                  # announcements
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                ONLINE - 1
              </h3>
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-500 text-white text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-purple-600">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-purple-500 text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-purple-200 truncate">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="w-full border-purple-400 text-purple-100 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <div className="flex items-center gap-3">
            <Hash className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">general</h2>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>

        {/* File Upload Area */}
        {selectedFiles.length > 0 && (
          <div className="px-6 py-4 bg-purple-50 border-t border-purple-200">
            <FileUpload files={selectedFiles} onRemove={(index) => {
              setSelectedFiles(prev => prev.filter((_, i) => i !== index));
            }} />
          </div>
        )}

        {/* Message Input */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex items-end gap-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 flex items-end gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message in #general"
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
