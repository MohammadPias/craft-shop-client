import React from 'react';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const UserChart = () => {
    const data = {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
        datasets: [
            {
                label: 'Total User for 2022',
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
        ]
    }
    return (
        <div>
            <Bar data={data} />
        </div>
    );
};

export default UserChart;