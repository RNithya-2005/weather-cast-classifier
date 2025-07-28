// Simulated weather prediction logic based on the ML model parameters
// This mimics the behavior of a trained logistic regression model

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudCover: string;
  season: string;
  location: string;
}

interface PredictionResult {
  prediction: string;
  confidence: number;
}

// Encode categorical variables (similar to label encoding)
const encodings = {
  cloudCover: {
    "clear": 0,
    "partly cloudy": 1,
    "cloudy": 2,
    "overcast": 3
  },
  season: {
    "spring": 0,
    "summer": 1,
    "autumn": 2,
    "winter": 3
  },
  location: {
    "coastal": 0,
    "inland": 1,
    "mountain": 2
  }
};

const weatherTypes = ["Sunny", "Cloudy", "Rainy", "Snowy", "Stormy"];

export const predictWeather = (data: WeatherData): PredictionResult => {
  // Encode categorical variables
  const encodedCloudCover = encodings.cloudCover[data.cloudCover as keyof typeof encodings.cloudCover] || 0;
  const encodedSeason = encodings.season[data.season as keyof typeof encodings.season] || 0;
  const encodedLocation = encodings.location[data.location as keyof typeof encodings.location] || 0;

  // Simplified prediction logic based on weather patterns
  let prediction = "Sunny";
  let baseConfidence = 75;

  // Temperature-based logic
  if (data.temperature < 0) {
    prediction = "Snowy";
    baseConfidence = 85;
  } else if (data.temperature > 30 && data.humidity < 30 && encodedCloudCover === 0) {
    prediction = "Sunny";
    baseConfidence = 90;
  }

  // Humidity and cloud cover logic
  if (data.humidity > 80 && encodedCloudCover >= 2) {
    if (data.windSpeed > 25 && data.pressure < 1000) {
      prediction = "Stormy";
      baseConfidence = 80;
    } else {
      prediction = "Rainy";
      baseConfidence = 85;
    }
  } else if (encodedCloudCover >= 2) {
    prediction = "Cloudy";
    baseConfidence = 80;
  }

  // Seasonal adjustments
  if (encodedSeason === 3 && data.temperature < 5) { // Winter
    prediction = "Snowy";
    baseConfidence = Math.min(90, baseConfidence + 10);
  } else if (encodedSeason === 1 && data.temperature > 25) { // Summer
    if (encodedCloudCover === 0) {
      prediction = "Sunny";
      baseConfidence = Math.min(95, baseConfidence + 15);
    }
  }

  // Location adjustments
  if (encodedLocation === 0) { // Coastal
    if (data.humidity > 70 && data.windSpeed > 15) {
      baseConfidence = Math.min(90, baseConfidence + 5);
    }
  } else if (encodedLocation === 2) { // Mountain
    if (data.temperature < 10 && data.pressure < 950) {
      prediction = data.temperature < 0 ? "Snowy" : "Stormy";
      baseConfidence = Math.min(85, baseConfidence + 10);
    }
  }

  // Pressure-based storm prediction
  if (data.pressure < 980 && data.windSpeed > 30) {
    prediction = "Stormy";
    baseConfidence = 90;
  }

  // Add some randomness to simulate model uncertainty
  const confidence = Math.max(60, Math.min(95, baseConfidence + Math.random() * 10 - 5));

  return {
    prediction,
    confidence: Math.round(confidence)
  };
};