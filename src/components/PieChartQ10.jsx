import React from "react";
import Chart from "react-apexcharts";
import questions from "../questions/question.json";

export default function ApexChart({ surveyData }) {
  const courses = [
    "BSCS",
    "ACT",
    "BSED",
    "BEED",
    "BSPOLSCIE",
    "BSCRIM",
    "AB FIL",
    "BSSW",
  ];

  // Function to calculate total occurrences of an answer text for a specific question
  const calculateTotalOccurrences = (course) => {
    const filteredData = surveyData.filter((entry) => {
      return entry.course === course && entry.answers.question10[0] === "Yes";
    });

    return filteredData.length;
  };

  // Calculate total occurrences for each answer text in the question
  const series = courses.map((course) => calculateTotalOccurrences(course));
  // Define a custom color palette for the chart
  const customColors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#E72929",
  ];

  // Chart options with labels, chart type, and custom color palette
  const options = {
    chart: {
      type: "pie",
    },
    colors: customColors,
    labels: courses,
  };

  return (
    <div id="chart">
      {/* Render Chart component with computed options and series */}
      <Chart
        options={options}
        series={series}
        type="pie"
        width={"100%"}
        height={350}
      />
    </div>
  );
}
