import React from "react";
import { Bar } from 'react-chartjs-2'
import { defaults } from "react-chartjs-2"

function GroupedBarAssist(props) {
    defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    defaults.font.weight = "bolder";
    defaults.color = "rgb(0,0,0)";

    const state = {
        labels: props.labels,
        datasets: [
          {
            label: 'Riesgo Bajo',
            data: props.data1,
            backgroundColor: 'blue',
            stack: 'Stack 0',
          },
          {
            label: 'Riesgo Moderado',
            data: props.data2,
            backgroundColor: 'green',
            stack: 'Stack 1',
          },
          {
            label: 'Riesgo Alto',
            data: props.data3,
            backgroundColor: 'rgb(80, 80, 80)',
            stack: 'Stack 2',
          },
        ],
      };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Bar data={state} options={options} />
        </>
    );
}

export { GroupedBarAssist };