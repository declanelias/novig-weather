import { WeatherDisplay } from "../WeatherDisplay";
import styles from "./WeatherCarousel.module.css";
import { useWeatherContext } from "../../../context/WeatherContext.tsx";
import { type DayOfWeek, DAYS_OF_WEEK } from "../../../constants/constants.ts";
import { useIsMobile } from "../../../hooks/useIsMobile";
import React, { useState } from "react";

export const WeatherCarousel: React.FC = () => {
    const { latLng, dayOfWeek, timeOfDay } = useWeatherContext();
    const isMobile = useIsMobile();
    const [showNextWeek, setShowNextWeek] = useState(false);

    const {thisDate, nextDate} = getNextDatesForDay(dayOfWeek);

    if (!latLng) {
        return (
            <div className={styles.message}>
                Enter an address to view the weather
            </div>
        );
    }

    const toggleWeek = () => setShowNextWeek(prev => !prev);

    return (
        <div className={styles.weatherCarousel}>
            {isMobile ? (
                <div className={styles.displayContainer}>
                    {showNextWeek && (
                        <button onClick={toggleWeek} className={styles.arrowButtonLeft}>
                            {"←"}
                        </button>
                    )}

                    <div className={styles.weatherContent}>
                        <div
                            className={styles.display}
                            style={{ display: showNextWeek ? "none" : "block" }}
                        >
                            <WeatherDisplay
                                dayOfWeek={dayOfWeek}
                                date={thisDate}
                                timeOfDay={timeOfDay}
                                latLng={latLng}
                                thisWeek
                            />
                        </div>
                        <div
                            className={styles.display}
                            style={{ display: showNextWeek ? "block" : "none" }}
                        >
                            <WeatherDisplay
                                dayOfWeek={dayOfWeek}
                                date={nextDate}
                                timeOfDay={timeOfDay}
                                latLng={latLng}
                            />
                        </div>
                    </div>

                    {!showNextWeek && (
                        <button onClick={toggleWeek} className={styles.arrowButtonRight}>
                            {"→"}
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <WeatherDisplay
                        dayOfWeek={dayOfWeek}
                        date={thisDate}
                        timeOfDay={timeOfDay}
                        latLng={latLng}
                        thisWeek
                    />
                    <WeatherDisplay
                        dayOfWeek={dayOfWeek}
                        date={nextDate}
                        timeOfDay={timeOfDay}
                        latLng={latLng}
                    />
                </>
            )}
        </div>
    );
};

const getNextDatesForDay = (
    targetDay: DayOfWeek
): { thisDate: Date; nextDate: Date } => {

    const currentDate = new Date();

    const currentDayIndex = currentDate.getDay();
    const targetDayIndex = DAYS_OF_WEEK.indexOf(targetDay);
    const daysUntilThis = (targetDayIndex - currentDayIndex + 7) % 7;
    const daysUntilNext = daysUntilThis + 7;
    const thisDate = new Date(currentDate);
    thisDate.setDate(currentDate.getDate() + daysUntilThis);

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysUntilNext);
    return {thisDate, nextDate};
};
