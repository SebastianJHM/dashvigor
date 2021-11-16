import React from "react";
import { Bar } from 'react-chartjs-2'
import { defaults } from "react-chartjs-2"

function GroupedBarRiesgoSocial(props) {
    defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    defaults.font.weight = "bolder";
    defaults.color = "rgb(0,0,0)";
    // defaults.animation.duration = 0;

    const state = {
        labels: props.labels,
        datasets: [
            {
                label: 'Resultado Normal',
                data: props.data1,
                backgroundColor: 'blue',
                stack: 'Stack 0',
            },
            {
                label: 'Falta de apoyo',
                data: props.data2,
                backgroundColor: 'green',
                stack: 'Stack 1',
            }
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Resultados Riesgo Social`,
                font: {
                    size: 18,
                    family: "Segoe UI",
                    weight: "bolder"
                }
            }
        }
    };

    return (
        <>
            <Bar data={state} options={options} />
        </>
    );
}

export { GroupedBarRiesgoSocial };