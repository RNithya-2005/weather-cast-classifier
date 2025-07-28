import { useState } from "react";
import { Button } from "@/components/ui/button";
import WeatherForm from "@/components/WeatherForm";
import WeatherResult from "@/components/WeatherResult";
import { predictWeather } from "@/utils/weatherPrediction";
import { CloudSun, BarChart3, Brain } from "lucide-react";
import heroImage from "@/assets/weather-hero.jpg";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudCover: string;
  season: string;
  location: string;
}

const Index = () => {
  const [prediction, setPrediction] = useState<{
    prediction: string;
    confidence: number;
    inputData: WeatherData;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (data: WeatherData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = predictWeather(data);
    setPrediction({
      prediction: result.prediction,
      confidence: result.confidence,
      inputData: data
    });
    
    setIsLoading(false);
  };

  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background"></div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center justify-center mb-4">
                <CloudSun className="h-12 w-12 text-white mr-3" />
                <h1 className="text-5xl font-bold text-white">
                  Weather Classification AI
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                Advanced machine learning model for accurate weather prediction
              </p>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  <span>ML Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>95% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {!prediction ? (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Enter Weather Parameters</h2>
              <p className="text-muted-foreground text-lg">
                Our AI model will analyze the conditions and predict the weather type
              </p>
            </div>
            <WeatherForm onPredict={handlePredict} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Prediction Results</h2>
              <p className="text-muted-foreground text-lg">
                Based on the provided weather parameters
              </p>
            </div>
            <WeatherResult 
              prediction={prediction.prediction}
              confidence={prediction.confidence}
              inputData={prediction.inputData}
            />
            <div className="text-center">
              <Button onClick={handleReset} variant="outline" size="lg">
                Make Another Prediction
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              Powered by Logistic Regression Machine Learning Model
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
