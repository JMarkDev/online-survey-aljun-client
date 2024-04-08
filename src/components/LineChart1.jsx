import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart1 = ({ surveyData }) => {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    if (!surveyData || surveyData.length === 0) return;

    const groupedData = {};
    surveyData.forEach((response) => {
      const date = response.created_at.split("T")[0]; // Extract date without time
      if (!groupedData[date]) {
        groupedData[date] = 0;
      }
      groupedData[date]++;
    });

    const formattedChartData = Object.keys(groupedData).map((date) => ({
      date,
      respondents: groupedData[date],
    }));
    setChartsData(formattedChartData);
  }, [surveyData]);

  // Extract categories from chartsData (dates)
  const categories = chartsData.map((data) => data.date);

  // Extract series data (respondents) from chartsData
  const seriesData = chartsData.map((data) => data.respondents);

  const chartData = {
    series: [
      {
        name: "Respondents",
        data: seriesData, // Use dynamic respondents data
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Respondents Chart",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        min: 0, // Ensure y-axis starts from zero
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default LineChart1;
