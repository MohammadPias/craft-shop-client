import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SummaryChart = () => {
    const data = {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
        datasets: [
            {
                label: 'Total Orders for 2022',
                data: [3000, 2590, 3320, 3825, 2910, 3500],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',

            },
            {
                label: 'Total Cost for 2022 (K)',
                data: [2500, 3500, 3825, 2540, 3600, 2650],
                borderColor: 'rgb(255, 50, 235)',
                backgroundColor: 'rgba(255, 50, 235, 0.5)',

            },
            {
                label: 'Total Sale for 2022 (K)',
                data: [3550, 3000, 4800, 3600, 3700, 4200],
                borderColor: 'rgb(255, 255, 50)',
                backgroundColor: 'rgba(255, 255, 50, 0.5)',

            },
        ]
    }
    return (
        <div>
            <Line data={data} />
        </div>
    );
};

export default SummaryChart;