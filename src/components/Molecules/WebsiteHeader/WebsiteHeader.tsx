import styles from './WebsiteHeader.module.css';
import React from 'react';
import {useIsMobile} from "../../../hooks/useIsMobile.ts";

export const WebsiteHeader: React.FC = () => {

    const isMobile = useIsMobile();

    return (
        <div className={styles.header}>
            <div className={styles.left}>WutIsDaWeather.io</div>
            <div className={styles.right}>
                {isMobile ? (
                    <span>☰</span>
                ) : (
                    <>
                        <span>Help</span>
                        <span>Sign out</span>
                    </>
                )}
            </div>
        </div>
    );
};