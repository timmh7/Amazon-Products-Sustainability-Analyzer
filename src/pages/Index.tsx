import { useState } from "react";
import { UrlInput } from "@/components/UrlInput";
import { EcoScoreResults, EcoScoreData } from "@/components/EcoScoreResults";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import heroImage from "@/assets/eco-hero.jpg";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<EcoScoreData | null>(null);
  const { toast } = useToast();

  const analyzeProduct = async (url: string) => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Mock product data (since we can't scrape Amazon from frontend)
      const mockProductData = getMockProductData(url);
      const score = await getEcoScore(mockProductData, apiKey);
      setResults(score);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the product. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMockProductData = (url: string): string => {
    // Extract product type from URL for better mock data
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('electronics') || urlLower.includes('phone') || urlLower.includes('laptop')) {
      return "Wireless Bluetooth Headphones - Premium Audio Quality with Active Noise Cancellation. Made with recycled plastic materials. Lightweight design with 30-hour battery life. Eco-friendly packaging.";
    } else if (urlLower.includes('clothing') || urlLower.includes('shirt') || urlLower.includes('apparel')) {
      return "Organic Cotton T-Shirt - 100% GOTS certified organic cotton. Sustainable manufacturing process. Fair trade certified. Biodegradable packaging materials.";
    } else if (urlLower.includes('home') || urlLower.includes('kitchen')) {
      return "Stainless Steel Water Bottle - BPA-free, dishwasher safe. Made from recycled stainless steel. Vacuum insulated design keeps drinks cold for 24 hours. Minimal plastic components.";
    }
    
    return "Multi-purpose Household Item - Durable construction with mixed materials including plastic and metal components. Standard packaging. Ships in medium-sized box.";
  };

  const getEcoScore = async (productDescription: string, apiKey: string): Promise<EcoScoreData> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an environmental impact scoring assistant. Given a product description, output a JSON object with:
- detected_materials: list of materials found in the product
- shipping_weight_category: "light" | "medium" | "heavy" 
- eco_friendly_keywords: list of eco-friendly terms found
- estimated_score: number from 0-100 (100 = most eco-friendly)
- explanation: short string summary of the environmental impact

Respond only with valid JSON, no additional text.`
          },
          {
            role: 'user',
            content: `Analyze this product: ${productDescription}`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(content);
      return {
        score: parsed.estimated_score,
        detected_materials: parsed.detected_materials || [],
        eco_friendly_keywords: parsed.eco_friendly_keywords || [],
        shipping_weight_category: parsed.shipping_weight_category || 'medium',
        explanation: parsed.explanation || 'Environmental impact analysis completed.',
      };
    } catch {
      throw new Error('Invalid AI response format');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-surface to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-eco-good bg-clip-text text-transparent">
            EcoScore Analyzer
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the environmental impact of Amazon products with AI-powered analysis
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* API Key Input */}
          <ApiKeyInput 
            apiKey={apiKey} 
            onApiKeyChange={setApiKey} 
          />
          
          {/* URL Input */}
          <UrlInput 
            onAnalyze={analyzeProduct}
            isLoading={isAnalyzing}
          />
          
          {/* Results */}
          {results && (
            <div className="animate-fade-in">
              <EcoScoreResults data={results} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
