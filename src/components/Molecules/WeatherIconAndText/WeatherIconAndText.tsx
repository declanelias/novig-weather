import React from "react";
import styles from "./WeatherIconAndText.module.css"

interface Props {
    imgSrc: string;
    text: string;
    height: number;
}

export const WeatherIconAndText: React.FC<Props> = (
    {imgSrc, text, height}
) => {

    return (
        <div className={styles.container}>
            <img src={imgSrc} height={height}/>
            <small>{text}</small>
        </div>
    )

}