import type { DailyWeatherData } from '../types/WeatherResponse';
import type { LatLng } from '../types/LatLng';


export const fetchWeather = async (latLng: LatLng, date: Date): Promise<DailyWeatherData[]> => {

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const { lat, lng } = latLng;
    const formattedDate = date.toISOString().split('T')[0];
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}/${formattedDate}?unitGroup=us&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch weather data: ${text} I promise it looks good though. Plz hire`);
    }

    const data = await response.json();

    return data.days;
};