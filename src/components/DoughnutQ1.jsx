import React from "react";
import Chart from "react-apexcharts";
import questions from "../questions/question.json";

export default function ApexChart({ surveyData }) {
  const calculateTotalOccurrences = (questionId, answerText) => {
    // Initialize total occurrences count
    let totalOccurrences = 0;

    // Loop through surveyData to count occurrences
    surveyData.forEach((entry) => {
      // Check if the entry has an answer for the specified questionId and it matches the answerText
      if (
        entry.answers[questionId] &&
        entry.answers[questionId].includes(answerText)
      ) {
        // Increment totalOccurrences if the answer matches
        totalOccurrences++;
      }
    });

    return totalOccurrences;
  };

  const question1 = questions.questions[1];
  const questionId = question1.id;
  const answerTexts = question1.choices;

  // Calculate total occurrences for each answer text in the question
  const series = answerTexts.map((answerText) =>
    calculateTotalOccurrences(questionId, answerText)
  );

  // Chart options with labels and chart type
  const options = {
    chart: {
      type: "donut",
    },
    labels: answerTexts,
  };

  return (
    <div id="chart">
      {/* Render Chart component with computed options and series */}
      <Chart
        options={options}
        series={series}
        type="donut"
        width={"100%"}
        height={350}
      />
    </div>
  );
}
