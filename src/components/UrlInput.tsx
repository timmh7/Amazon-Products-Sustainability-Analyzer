import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput = ({ onAnalyze, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('amazon.');
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter an Amazon product URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Amazon product URL",
        variant: "destructive",
      });
      return;
    }

    onAnalyze(url);
  };

  return (
    <Card className="p-8 bg-eco-surface border-primary/20 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Leaf className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">EcoScore Analyzer</h2>
          <p className="text-muted-foreground">Get environmental impact scores for Amazon products</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-foreground">
            Amazon Product URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.com/product-name/dp/XXXXXXXXXX"
            className="w-full"
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full bg-primary hover:bg-primary-glow transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Product...
            </>
          ) : (
            <>
              <Leaf className="w-4 h-4 mr-2" />
              Analyze EcoScore
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};