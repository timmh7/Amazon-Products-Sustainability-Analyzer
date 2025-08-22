import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Package, Recycle, Truck } from "lucide-react";

export interface EcoScoreData {
  score: number;
  detected_materials: string[];
  eco_friendly_keywords: string[];
  shipping_weight_category: "light" | "medium" | "heavy";
  sustain_certs: string[];
  eco_warnings: string[];
  explanation: string;
}

interface EcoScoreResultsProps {
  data: EcoScoreData;
}

export const EcoScoreResults = ({ data }: EcoScoreResultsProps) => {
  // Custom color classes for score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-[#17643b]"; // darker green
    if (score >= 40) return "text-[#3bb273]"; // medium green
    return "text-[#b91c1c]"; // dark red
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getWeightIcon = (category: string) => {
    switch (category) {
      case "light":
        return "📦";
      case "medium":
        return "📫";
      case "heavy":
        return "🚚";
      default:
        return "📦";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
  <Card className="p-8 bg-white border-primary/20 shadow-xl">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full ">
            <Leaf className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">EcoScore</span>
          </div>
          
          <div className="space-y-2">
            <div className={`text-6xl font-bold ${getScoreColor(data.score)} cursor-default transition-all duration-300 animate-fade-in delay-300`}>
              {data.score}
            </div>
            <div className="text-xl font-semibold text-muted-foreground animate-fade-in delay-500">
              {getScoreLabel(data.score)}
            </div>
          </div>
          
          <div className="animate-fade-in delay-700">
            <Progress 
              value={data.score} 
              className="w-full h-3 bg-muted transition-all duration-1000 hover:h-4"
            />
          </div>
        </div>
      </Card>

      {/* Details Grid */}
  <div className="grid md:grid-cols-2 gap-6">
        {/* Materials Card */}
        <Card className="p-6 bg-card border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary hover-scale transition-transform duration-300" />
            <h3 className="text-lg font-semibold">Detected Materials</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.detected_materials.map((material, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="capitalize hover-scale transition-all duration-300 hover:shadow-md animate-fade-in cursor-default"
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                {material}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Sustainability Features Grid */}
        <Card className="p-6 bg-card border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-eco-good hover-scale transition-transform duration-300" />
            <h3 className="text-lg font-semibold">Sustainability Certifications</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.sustain_certs.map((material, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="capitalize hover-scale transition-all duration-300 hover:shadow-md animate-fade-in cursor-default"
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                {material}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Shipping Weight */}
        <Card className="p-6 bg-card border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in delay-500">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Shipping Impact</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-2xl cursor-default transition-transform duration-300">
              {getWeightIcon(data.shipping_weight_category)}
            </span>
            <div>
              <div className="font-semibold capitalize">{data.shipping_weight_category} Package</div>
              <div className="text-sm text-muted-foreground">
                {data.shipping_weight_category === "light" && "Minimal shipping impact"}
                {data.shipping_weight_category === "medium" && "Moderate shipping impact"}
                {data.shipping_weight_category === "heavy" && "High shipping impact"}
              </div>
            </div>
          </div>
        </Card>

        {/* Warnings Grid */}
  <Card className="p-6 bg-card border-primary/10 transition-all duration-300 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-eco-good hover-scale transition-transform duration-300" />
            <h3 className="text-lg font-semibold">Warnings</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.eco_warnings.map((material, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="capitalize bg-red-100 text-red-800 animate-fade-in cursor-default"
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                {material}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Eco Keywords */}
        {data.eco_friendly_keywords.length > 0 && (
          <Card className="p-6 bg-card border-primary/10 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Eco-Friendly Features</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.eco_friendly_keywords.map((keyword, index) => (
                <Badge key={index} className="bg-eco-good text-white">
                  {keyword}
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Explanation Card */}
      <Card className="p-6 bg-card border-primary/10">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Analysis Summary</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {data.explanation}
        </p>
      </Card>
    </div>
  );
};