
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, X } from "lucide-react";

interface FileUploadProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const FileUpload = ({ files, onRemove }: FileUploadProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-purple-700">Uploading {files.length} file(s):</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {files.map((file, index) => (
          <Card key={index} className="p-3 border border-purple-200 bg-white">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                {isImage(file.type) ? (
                  <Image className="h-5 w-5 text-purple-600" />
                ) : (
                  <FileText className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {isImage(file.type) && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-20 object-cover rounded border border-gray-200"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
