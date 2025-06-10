import React, { useRef } from "react";
import styles from "./WeatherGraph.module.css";
import type {DailyWeatherData} from "../../../types/WeatherResponse.ts";
import {LineChart} from "../LineChart/LineChart.tsx";
import type {TimeOfDay} from "../../../constants/constants.ts";

interface WeatherGraphProps {
    dailyWeatherData: DailyWeatherData;
    timeOfDay: TimeOfDay;
}

export const WeatherGraph: React.FC<WeatherGraphProps> = (
    {dailyWeatherData, timeOfDay}
) => {

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={styles.weatherGraphContainer}>
            <LineChart dailyWeatherData={dailyWeatherData} timeOfDay={timeOfDay} />
        </div>
    );
};