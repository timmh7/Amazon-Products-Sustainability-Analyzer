import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const ApiKeyInput = ({ apiKey, onApiKeyChange }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    onApiKeyChange(tempKey);
  };

  const handleClear = () => {
    setTempKey("");
    onApiKeyChange("");
  };

  return (
    <Card className="p-6 bg-card border-primary/10">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">OpenAI API Configuration</h3>
      </div>
      
      <Alert className="mb-4">
        <Info className="w-4 h-4" />
        <AlertDescription>
          Your API key is stored locally and never sent to our servers. 
          Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a>.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type={showKey ? "text" : "password"}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="sk-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSave}
            disabled={!tempKey.trim() || tempKey === apiKey}
            className="bg-primary hover:bg-primary-glow"
          >
            Save API Key
          </Button>
          {apiKey && (
            <Button 
              onClick={handleClear}
              variant="outline"
            >
              Clear
            </Button>
          )}
        </div>
        
        {apiKey && (
          <div className="text-sm text-eco-good">
            ✓ API key configured
          </div>
        )}
      </div>
    </Card>
  );
};