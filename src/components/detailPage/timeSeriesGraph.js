import React from "react";
import { Line } from "react-chartjs-2";
import "./detailPage.css";

function TimeSeriesGraph({ cryptoHistory, cryptoInfo, currency }) {
  let xLabels = [];
  let yLabels = [];

  if (cryptoHistory.data) {
    xLabels = cryptoHistory.data.history.map((slice, i) => {
      const dateObject = new Date(slice.timestamp);
      const humanDateFormat = dateObject.toLocaleString();
      return humanDateFormat;
    });

    yLabels = cryptoHistory.data.history.map((slice, i) => slice.price);
  }

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: `Price in ${currency}`,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: yLabels,
      },
    ],
  };

  return (
    <div className="graph">
      <Line
        options={{
          maintainAspectRatio: false,

          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  // Include a dollar sign in the ticks
                  callback: function (value, index, values) {
                    return `${cryptoInfo.data.base.sign} ${value.toFixed(2)}`;
                  },
                  //fontSize: 20,
                },
                scaleLabel: {
                  display: true,
                  labelString: `Price (${currency})`,
                  fontSize: 15,
                  fontColor: "blue",
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Time Stamps",
                  fontSize: 15,
                  fontColor: "blue",
                },
                ticks: {
                  display: false,
                },
                //fontSize: 20,
              },
            ],
          },
        }}
        data={data}
      />
    </div>
  );
}

export default TimeSeriesGraph;
