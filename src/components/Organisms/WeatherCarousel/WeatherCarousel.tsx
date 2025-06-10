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

    const thisDate: Date = getNextDateForDay(new Date(), dayOfWeek);
    const nextDate: Date = getNextDateForDay(thisDate, dayOfWeek);

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

const getNextDateForDay = (currentDate: Date, targetDay: DayOfWeek): Date => {
    const currentDayIndex = currentDate.getDay();
    const targetDayIndex = DAYS_OF_WEEK.indexOf(targetDay);
    const daysUntilNext = (targetDayIndex - currentDayIndex + 7) % 7 || 7;
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysUntilNext);
    return nextDate;
};
