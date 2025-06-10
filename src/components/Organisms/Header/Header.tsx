import styles from './Header.module.css';
import { LocationSelector } from "../../Molecules/LocationSelector";
import { DAYS_OF_WEEK, TIME_OF_DAY } from "../../../constants/constants.ts";
import { Dropdown } from "../../Atoms/Dropdown";
import {useWeatherContext} from "../../../context/WeatherContext.tsx";
import { WiTime3 } from "weather-icons-react";

export const Header: React.FC = () => {

    const {
        dayOfWeek, setDayOfWeek,
        timeOfDay, setTimeOfDay
    } = useWeatherContext();

    return (
        <div className={styles.header}>
            <div className={styles.location}>
                <LocationSelector />
            </div>
            <div className={styles.dayAndTime}>
                <WiTime3 color={"#0"} />
                <div>&nbsp;</div>
                <p>Every</p>
                <div>&nbsp;</div>
                <Dropdown
                    options={[...DAYS_OF_WEEK]}
                    value={dayOfWeek}
                    onChange={(value) => setDayOfWeek(value as typeof dayOfWeek)}
                    label={"day-dropdown"}
                />
                <div>&nbsp;</div>
                <Dropdown
                    options={[...TIME_OF_DAY]}
                    value={timeOfDay}
                    onChange={(value) => setTimeOfDay(value as typeof timeOfDay)}
                    label={"time-dropdown"}
                />
            </div>
        </div>
    );
}