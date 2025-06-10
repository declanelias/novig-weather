import styles from "./WeatherInfo.module.css"
import type {DailyWeatherData} from "../../../types/WeatherResponse.ts";
import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog, WiThunderstorm, WiWindy, WiRaindrops } from "weather-icons-react";

const conditionIcons: Record<string, React.FC<{ size: number; color: string }>> = {
    Sunny: WiDaySunny,
    Cloudy: WiCloudy,
    Rainy: WiRain,
    Snowy: WiSnow,
    Foggy: WiFog,
    Stormy: WiThunderstorm,
    Windy: WiWindy,
    Drizzly: WiRaindrops,
    Default: WiDaySunny,
};

interface WeatherInfoProps {
    dailyWeatherData: DailyWeatherData;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({dailyWeatherData}) => {
    const {
        temp,
        windspeed,
        precipprob
    } = dailyWeatherData;

    const conditionsText = getConditionsText(dailyWeatherData);
    const WeatherIcon = conditionIcons[conditionsText] || conditionIcons.Default;

    const roundedWindspeed = Math.round(windspeed);
    const roundedPrecipprob = Math.round(precipprob);
    const rainText = roundedPrecipprob > 0
        ? `${roundedPrecipprob}% Chance of Rain`
        : "No Rain";

    return (
        <div className={styles.weatherInfo}>
            <div className={styles.bottomSection}>
                <div className={styles.imgContainer}>
                    <WeatherIcon size={63} color={"#0"} />
                </div>
                <div className={styles.weatherText}>
                    <div>{conditionsText} {temp}°F</div>
                    <div className={styles.container}>
                        <WiWindy size={16} color={"#0"} />
                        <small>Winds {roundedWindspeed}mph</small>
                    </div>
                    <div className={styles.container}>
                        <WiRain size={16} color={"#0"} />
                        <small>{rainText}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

const getConditionsText = (dailyWeatherData: DailyWeatherData): string => {

    if (dailyWeatherData.precipprob >= 50 && dailyWeatherData.preciptype.length > 0) {
        return `${capitalize(dailyWeatherData.preciptype[0])}y`;
    }

    if (dailyWeatherData.cloudcover >= 50) {
        return "Cloudy";
    }

    return "Sunny";
}