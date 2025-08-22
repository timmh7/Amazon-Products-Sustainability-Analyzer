import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import amazonLogo from "@/assets/amazon-logo.png";
// ...existing code...

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput = ({ onAnalyze, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

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
      setError("Please enter a URL.");
      return;
    }
    if (!validateUrl(url)) {
      setError("Please enter a valid Amazon product URL.");
      return;
    }
    setError(null);
    onAnalyze(url);
  };

  return (
  <Card className="p-8 bg-white border-primary/20 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white rounded-lg">
          <img src={amazonLogo} alt="Amazon" className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Amazon Product Sustainability Analyzer</h2>
          <p className="text-muted-foreground">Get an in-depth environmental impact analysis for Amazon products</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-foreground">
            Amazon Product URL
          </label>
          <div className="relative w-full">
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="https://www.amazon.com/product-name/dp/XXXXXXXXXX"
              className="w-full transition-all duration-300 focus:scale-[1.02] hover:border-primary/40 pr-10"
              disabled={isLoading}
            />
            {url && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setUrl("")}
                aria-label="Clear input"
                tabIndex={0}
              >
                &#10005;
              </button>
            )}
          </div>
          {error && (
            <div className="text-sm text-red-600 mt-1">{error}</div>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full bg-primary hover:bg-primary-glow transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="animate-pulse">Analyzing Product...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 21c.5-4.5 2.5-8 7-8s6.5 3.5 7 8M12 3v8m0 0l3-3m-3 3l-3-3" /></svg>
              Analyze EcoScore
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};