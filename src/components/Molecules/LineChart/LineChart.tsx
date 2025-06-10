import React, { useRef, useEffect } from "react";
import { createChart } from "../../../utils/createChart";
import type { DailyWeatherData } from "../../../types/WeatherResponse";
import type { Chart } from "chart.js";
import {TIME_OF_DAY_TO_HOUR, type TimeOfDay} from "../../../constants/constants.ts";

interface LineChartProps {
    dailyWeatherData: DailyWeatherData;
    timeOfDay: TimeOfDay;
}

export const LineChart: React.FC<LineChartProps> = ({ dailyWeatherData, timeOfDay }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const startIndex: number = TIME_OF_DAY_TO_HOUR[timeOfDay] - 2;

        if (chartRef.current) {
            const hours = dailyWeatherData.hours.map((hour) => hour.datetime).slice(startIndex, startIndex + 9);
            const temperatures = dailyWeatherData.hours.map((hour) => hour.temp).slice(startIndex, startIndex + 9);
            const precipProbs = dailyWeatherData.hours.map((hour) => hour.precipprob).slice(startIndex, startIndex + 9);

            chartInstanceRef.current = createChart(
                chartRef.current,
                hours,
                temperatures,
                precipProbs,
            );

        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [dailyWeatherData, timeOfDay]);

    return <canvas ref={chartRef} style={{height: "100%", width: "100%"}}/>;
};