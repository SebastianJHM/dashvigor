import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { defaults } from "react-chartjs-2"

function DoughnutChart(props) {
    defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    defaults.font.weight = "bolder";
    defaults.color = "rgb(0,0,0)";

    const state = {
        labels: props.data.x,
        datasets: [
          {
            label: '# of Votes',
            data: props.data.y,
            backgroundColor: [
              'green',
              'blue',
        
            ],
            borderColor: [
              'green',
              'blue',
              
            ],
            borderWidth: 1,
          },
        ],
      };
    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 12,
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
            <Doughnut data={state} options={options} />
        </>
    );
}

export { DoughnutChart };