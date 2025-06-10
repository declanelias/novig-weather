import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(...registerables, annotationPlugin);

/**
 * Utility function to create a weather line chart.
 *
 * @param canvas - The HTML canvas element where the chart will be rendered.
 * @param labels - The labels for the chart's x-axis (e.g., hours).
 * @param temperatureData - The temperature dataset.
 * @param precipProbData - The precipitation probability dataset.
 * @param precipitationData - The precipitation dataset.
 * @param options - Optional configuration options for the chart.
 * @returns The created Chart.js instance.
 */
export const createChart = (
    canvas: HTMLCanvasElement,
    labels: string[],
    temperatureData: number[],
    precipProbData: number[],
): Chart => {
    return new Chart(canvas, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Temperature (°F)",
                    data: temperatureData,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                    pointRadius: 0,
                },
                {
                    label: "Precipitation Probability (%)",
                    data: precipProbData,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        font: {
                            family: "IBM Plex Mono",
                        }
                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: "line",
                            xMin: 2,
                            xMax: 2,
                            borderColor: "rgba(0, 0, 0, 0.5)",
                            borderWidth: 2,
                            borderDash: [6, 6],
                        },
                        line2: {
                            type: "line",
                            xMin: 6,
                            xMax: 6,
                            borderColor: "rgba(0, 0, 0, 0.5)",
                            borderWidth: 2,
                            borderDash: [6, 6],
                        },
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: "Time",
                    },
                    ticks: {
                        callback: (tickValue: string | number) => {
                            const hour = typeof tickValue === "string" ? parseInt(tickValue, 10) : tickValue;
                            const period = hour >= 12 ? "PM" : "AM";
                            const formattedHour = hour % 12 || 12;
                            return `${formattedHour}:00 ${period}`;
                        },
                        font: {
                            family: "IBM Plex Mono",
                            size: 12,
                            weight: "normal",
                        },
                    }
                },
                y: {
                    min: 0,
                    max: Math.max(100, ...temperatureData),
                    title: {
                        display: false,
                        text: "Values",
                    },
                    ticks: {
                        font: {
                            family: "IBM Plex Mono",
                            size: 12,
                            weight: "normal",
                        },
                    }
                },
            },
        },
    });
};