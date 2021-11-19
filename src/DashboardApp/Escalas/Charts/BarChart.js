import React from "react";
import { Bar } from 'react-chartjs-2'
import { defaults } from "react-chartjs-2"

function BarChart(props) {
    defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    defaults.font.weight = "bolder";
    defaults.color = "rgb(0,0,0)";
    defaults.animation.duration = 0;

    const state = {
        labels: props.data.x,
        datasets: [
            {
                label: `Resultados ${props.title}`,
                backgroundColor: 'green',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 2,
                data: props.data.y
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 16,
                        family: "Segoe UI",
                        weight: "bolder"
                    }
                }
            },
            title: {
                display: false,
                text: `Resultados ${props.title}`,
                font: {
                    size: 18,
                    family: "Segoe UI",
                    weight: "bolder"
                }
            }
        }
    }

    return (
        <>
            <Bar data={state} options={options} />
        </>
    );
}

export { BarChart };