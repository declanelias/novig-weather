import React, {createContext, type ReactNode, useContext, useState} from "react";
import type {LatLng} from "../types/LatLng.ts";
import {
  type DayOfWeek,
  DAYS_OF_WEEK,
  TIME_OF_DAY,
  type TimeOfDay
} from "../constants/constants.ts";

interface WeatherContextProps {
  latLng: LatLng | null;
  setLatLng: (latLng: LatLng | null) => void;

  dayOfWeek: DayOfWeek;
  setDayOfWeek: (day: DayOfWeek) => void;

  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay ) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

interface WeatherProviderProps {
    children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [latLng, setLatLng] = useState<LatLng | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(DAYS_OF_WEEK[0]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TIME_OF_DAY[0]);

  return (
    <WeatherContext.Provider value={{ latLng, setLatLng, dayOfWeek, setDayOfWeek, timeOfDay, setTimeOfDay }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useLatLng must be used within a LatLngProvider");
  }
  return context;
};