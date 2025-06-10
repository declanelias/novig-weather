import styles from './DateInfo.module.css';
import type { DayOfWeek } from "../../../constants/constants.ts";

interface DateInfoProps {
    dayOfWeek: DayOfWeek;
    date: Date;
    thisWeek: boolean;
}

export const DateInfo: React.FC<DateInfoProps> = (
    {date, dayOfWeek, thisWeek}
) => {

    const thisText: string = thisWeek ? "This" : "Next";
    const textColor: string = thisWeek ? "rgba(255, 99, 132, 1)" : "black";

    const mmDD: string = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

    return (
        <div className={styles.dateInfo}>
            <h1 style={{color: textColor}}>{thisText} {dayOfWeek} {mmDD}</h1>
        </div>
    );
};