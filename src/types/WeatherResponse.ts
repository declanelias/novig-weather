export interface WeatherData {
    datetime: string;
    temp: number;
    icon: string;
    precip: number;
    precipprob: number;
    windgust: number;
    windspeed: number;
    conditions: string;
    preciptype: string[];
    cloudcover: number;
}

export interface DailyWeatherData extends WeatherData {
    hours: WeatherData[];
}

export interface WeatherResponse {
    days: DailyWeatherData[];
}