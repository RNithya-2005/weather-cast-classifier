import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, CloudRain, Snowflake, Zap, ThermometerSun } from "lucide-react";

interface WeatherResultProps {
  prediction: string;
  confidence: number;
  inputData: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    cloudCover: string;
    season: string;
    location: string;
  };
}

const getWeatherIcon = (weatherType: string) => {
  switch (weatherType.toLowerCase()) {
    case "sunny":
      return <Sun className="h-8 w-8 text-sunny" />;
    case "cloudy":
      return <Cloud className="h-8 w-8 text-cloudy" />;
    case "rainy":
      return <CloudRain className="h-8 w-8 text-rainy" />;
    case "snowy":
      return <Snowflake className="h-8 w-8 text-snowy" />;
    case "stormy":
      return <Zap className="h-8 w-8 text-stormy" />;
    default:
      return <ThermometerSun className="h-8 w-8 text-primary" />;
  }
};

const getWeatherColor = (weatherType: string) => {
  switch (weatherType.toLowerCase()) {
    case "sunny":
      return "bg-sunny/10 text-sunny border-sunny/20";
    case "cloudy":
      return "bg-cloudy/10 text-cloudy border-cloudy/20";
    case "rainy":
      return "bg-rainy/10 text-rainy border-rainy/20";
    case "snowy":
      return "bg-snowy/10 text-snowy border-snowy/20";
    case "stormy":
      return "bg-stormy/10 text-stormy border-stormy/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return "bg-green-100 text-green-800 border-green-200";
  if (confidence >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
};

const WeatherResult = ({ prediction, confidence, inputData }: WeatherResultProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Prediction Card */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Weather Prediction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            {getWeatherIcon(prediction)}
            <div className="space-y-2">
              <Badge 
                variant="outline" 
                className={`text-lg px-4 py-2 ${getWeatherColor(prediction)}`}
              >
                {prediction}
              </Badge>
              <div className="flex justify-center">
                <Badge 
                  variant="outline"
                  className={`${getConfidenceColor(confidence)}`}
                >
                  {confidence}% Confidence
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Input Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Temperature</div>
              <div className="text-lg font-semibold">{inputData.temperature}°C</div>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Humidity</div>
              <div className="text-lg font-semibold">{inputData.humidity}%</div>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Wind Speed</div>
              <div className="text-lg font-semibold">{inputData.windSpeed} km/h</div>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Pressure</div>
              <div className="text-lg font-semibold">{inputData.pressure} hPa</div>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Cloud Cover</div>
              <div className="text-lg font-semibold capitalize">{inputData.cloudCover}</div>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Season</div>
              <div className="text-lg font-semibold capitalize">{inputData.season}</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-block p-3 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="text-lg font-semibold capitalize">{inputData.location}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherResult;