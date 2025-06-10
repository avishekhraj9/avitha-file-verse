
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FileText, Image, Download } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: { id: string; name: string };
  timestamp: Date;
  files?: { name: string; url: string; type: string }[];
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isImage = (type: string) => type.startsWith('image/');
  const isSystem = message.sender.id === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <Card className="px-4 py-2 bg-purple-50 border-purple-200">
          <p className="text-sm text-purple-700">{message.text}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex gap-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className="bg-purple-500 text-white">
          {message.sender.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <h4 className="font-semibold text-gray-900">{message.sender.name}</h4>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
        </div>
        
        {message.text && (
          <p className="text-gray-700 mb-2 whitespace-pre-wrap">{message.text}</p>
        )}
        
        {message.files && message.files.length > 0 && (
          <div className="space-y-2">
            {message.files.map((file, index) => (
              <div key={index} className="max-w-md">
                {isImage(file.type) ? (
                  <div className="relative group/image">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="rounded-lg border border-gray-200 max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(file.url, '_blank')}
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover/image:opacity-100 transition-opacity">
                      <a
                        href={file.url}
                        download={file.name}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 text-white rounded text-xs hover:bg-black/70"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>
                    </div>
                  </div>
                ) : (
                  <Card className="p-3 border border-gray-200 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.type || 'Unknown file type'}
                        </p>
                      </div>
                      <a
                        href={file.url}
                        download={file.name}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
