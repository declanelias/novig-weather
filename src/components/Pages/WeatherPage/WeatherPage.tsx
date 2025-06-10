import { Header } from '../../Organisms/Header';
import styles from './WeatherPage.module.css';
import {WeatherCarousel} from "../../Organisms/WeatherCarousel";
import {WeatherProvider} from "../../../context/WeatherContext.tsx";
import React from "react";

export const WeatherPage: React.FC = () => {
    return (
        <WeatherProvider>
            <div className={styles.weatherTemplate}>
                <div className={styles.headerBox}>
                    <Header />
                </div>
                <div className={styles.separator}></div>
                <div className={styles.carouselBox}>
                    <WeatherCarousel />
                </div>
            </div>
        </WeatherProvider>
    );
};