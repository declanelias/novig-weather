import styles from './WeatherDisplay.module.css'
import {WeatherInfo} from "../../Molecules/WeatherInfo";
import {WeatherGraph} from "../../Molecules/WeatherGraph";
import React from 'react';
import {DateInfo} from '../../Molecules/DateInfo';
import type {DayOfWeek, TimeOfDay} from "../../../constants/constants";
import type {LatLng} from "../../../types/LatLng";
import {useFetchWeather} from "../../../hooks/useFetchWeather.ts";

interface WeatherDisplayProps {
    timeOfDay: TimeOfDay,
    dayOfWeek: DayOfWeek,
    date: Date,
    latLng: LatLng | null,
    thisWeek?: boolean
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = (
    {timeOfDay, dayOfWeek, date, latLng, thisWeek=false}
) => {

    const {dailyWeatherData, loading, error} = useFetchWeather(latLng, date);

    if (!loading && error) {
        return <div>{error}</div>
    }

    if (loading || !dailyWeatherData) {
        return <div></div>
    }

    return (
        <div
            className={styles.weatherDisplay}
        >
            <DateInfo
                dayOfWeek={dayOfWeek}
                date={date}
                thisWeek={thisWeek}
            />
            <WeatherInfo
                dailyWeatherData={dailyWeatherData}
            />
            <WeatherGraph
                dailyWeatherData={dailyWeatherData}
                timeOfDay={timeOfDay}
            />
            <small className={styles.timeOfDay}>{timeOfDay}</small>
        </div>
    )

}