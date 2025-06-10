export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export type DayOfWeek = typeof DAYS_OF_WEEK[number];

export const TIME_OF_DAY = ["Morning", "Afternoon", "Evening"] as const;
export type TimeOfDay = typeof TIME_OF_DAY[number];

export const TIME_OF_DAY_TO_HOUR: Record<TimeOfDay, number> = {
    Morning: 8,
    Afternoon: 12,
    Evening: 16
}