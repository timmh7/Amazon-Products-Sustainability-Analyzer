import { useState } from "react";
import { UrlInput } from "@/components/UrlInput";
import { EcoScoreResults, EcoScoreData } from "@/components/EcoScoreResults";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<EcoScoreData | null>(null);

  // API key provided by the system
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const analyzeProduct = async (url: string) => {
    setIsAnalyzing(true);
    try {
      // Call backend to extract product data from Amazon
  const response = await fetch(`${import.meta.env.VITE_API_URL}/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to extract product data');
      const extracted = await response.json();
      console.log('Extracted product data:', extracted);

      // Store title and description from extracted product data
      const { title, description, features} = extracted;

      // Combine extracted fields for AI analysis
      const productData = `-Title: ${title}
      -Description: ${description}
      -Sustainability Features: ${features}`;

      const score = await getEcoScore(productData, OPENAI_API_KEY);
      setResults(score);

    } catch (error) {
      // Handle error without toast
    } finally {
      setIsAnalyzing(false);
    }
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
            content: 
      `You are an expert environmental impact scoring assistant that is very strict. Given a product description, 
      output a JSON object with:

      - detected_materials: list of materials found in the product
      - sustain_certs: list of sustainability organization certifications offered (i.e climate pledge, cradle to cradle, etc. )
      - shipping_weight_category: "light" | "medium" | "heavy", (if you do not know, make an educated guess based on the product)
      - eco_friendly_keywords: list of eco-friendly terms found (terms MUST be related to environment)
      - eco_warnings: list of pontetially harmful terms or materials found (doesn't have to be explicitly harmful, just questionable is enough)
      - estimated_score: number from 0-100 (100 = most eco-friendly, be VERY strict on scoring, factor in product's historical environmental context)
      - explanation: short string summary of the environmental impact, talk about positives and environmental concerns

      Respond only with valid JSON, no additional text.`
          },
          {
            role: 'user',
            content: `Analyze this product: ${productDescription}`
          }
        ],
        temperature: 0.1,
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
        sustain_certs: parsed.sustain_certs || [],
        eco_warnings: parsed.eco_warnings || [],
        explanation: parsed.explanation || 'Environmental impact analysis completed.',
      };
    } catch {
      throw new Error('Invalid AI response format');
    }
  };

  return (
  <div className="min-h-screen" style={{ backgroundColor: '#e6f4ea' }}>
      {/* Main Content */}
    <section className="px-4 pb-20 pt-16">
        <div className="max-w-4xl mx-auto space-y-8">          
          {/* URL Input with entrance animation */}
          <div className="animate-fade-in delay-700">
            <UrlInput 
              onAnalyze={analyzeProduct}
              isLoading={isAnalyzing}
            />
          </div>
          
          {/* Results with staggered animation */}
          {results && (
            <div className="animate-fade-in animate-scale-in">
              <EcoScoreResults data={results} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
