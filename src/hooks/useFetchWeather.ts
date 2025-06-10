import { useState, useEffect } from 'react';
import { fetchWeather } from '../utils/fetchWeather';
import type {DailyWeatherData} from '../types/WeatherResponse';
import type { LatLng } from '../types/LatLng';

export const useFetchWeather = (latLng: LatLng | null, date: Date) => {
    const [dailyWeatherData, setDailyWeatherData] = useState<DailyWeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!latLng) {
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchWeather(latLng, date);
                setDailyWeatherData(data[0]);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (latLng && date) {
            fetchData();
        } else {
            setLoading(false);
            setError('Invalid location or date');
        }

    }, [latLng, date]);

    return { dailyWeatherData, loading, error };
};