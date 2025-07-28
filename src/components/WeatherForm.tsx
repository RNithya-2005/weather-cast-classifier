import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, Sun, CloudRain, Snowflake, Zap } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudCover: string;
  season: string;
  location: string;
}

interface WeatherFormProps {
  onPredict: (data: WeatherData) => void;
  isLoading?: boolean;
}

const WeatherForm = ({ onPredict, isLoading = false }: WeatherFormProps) => {
  const [formData, setFormData] = useState<WeatherData>({
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    pressure: 1013,
    cloudCover: "",
    season: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cloudCover && formData.season && formData.location) {
      onPredict(formData);
    }
  };

  const handleInputChange = (field: keyof WeatherData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Cloud className="h-6 w-6 text-primary" />
          Weather Parameters
        </CardTitle>
        <CardDescription>
          Enter the weather conditions to predict the weather type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                value={formData.temperature}
                onChange={(e) => handleInputChange("temperature", Number(e.target.value))}
                placeholder="25"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                type="number"
                min="0"
                max="100"
                value={formData.humidity}
                onChange={(e) => handleInputChange("humidity", Number(e.target.value))}
                placeholder="60"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="windSpeed">Wind Speed (km/h)</Label>
              <Input
                id="windSpeed"
                type="number"
                min="0"
                value={formData.windSpeed}
                onChange={(e) => handleInputChange("windSpeed", Number(e.target.value))}
                placeholder="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pressure">Pressure (hPa)</Label>
              <Input
                id="pressure"
                type="number"
                value={formData.pressure}
                onChange={(e) => handleInputChange("pressure", Number(e.target.value))}
                placeholder="1013"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Cloud Cover</Label>
              <Select value={formData.cloudCover} onValueChange={(value) => handleInputChange("cloudCover", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cloud cover" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">Clear</SelectItem>
                  <SelectItem value="partly cloudy">Partly Cloudy</SelectItem>
                  <SelectItem value="cloudy">Cloudy</SelectItem>
                  <SelectItem value="overcast">Overcast</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Season</Label>
              <Select value={formData.season} onValueChange={(value) => handleInputChange("season", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="autumn">Autumn</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coastal">Coastal</SelectItem>
                  <SelectItem value="inland">Inland</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isLoading || !formData.cloudCover || !formData.season || !formData.location}
          >
            {isLoading ? "Predicting..." : "Predict Weather"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeatherForm;