import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Doughnut from "../components/DoughnutQ1";
import LineChart from "../components/LineChart";
import api from "../api/api";
import BarChartQ9 from "../components/BarChartQ9";
import DoughnutQuestion3 from "../components/DoughnutQuestion3";
import BarChartQ4 from "../components/BarchartQ5";
import BarChartQ6 from "../components/BarChartQ6";

import questions from "../questions/question.json";

const Dashboard = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [responseCount, setResponseCount] = useState(0);
  const cardsData = [
    { title: "Total Responses", count: responseCount },
    { title: "Total Course", count: 8 },
    { title: "Total Questions", count: 10 },
  ];

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await api.get("/survey/all");
        setResponseCount(response.data.length);
        setSurveyData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResponse();
  }, []);

  // Function to calculate total occurrences of an answer text for a specific question
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

  function downloadCSV() {
    const headers = ["Category", "Total"];

    const question1 = questions.questions[0];
    const questionId = question1.id;
    const answerTexts = question1.choices;

    // Calculate total occurrences for each answer text in the question
    const series = answerTexts.map((answerText) =>
      calculateTotalOccurrences(questionId, answerText)
    );

    // Combine categories and totals into an array of arrays (rows)
    const dataRows = answerTexts.map((answerText, index) => [
      answerText,
      series[index],
    ]);

    // Prepare CSV content
    const csvContent = [headers, ...dataRows.map((row) => row.join(","))].join(
      "\n"
    );

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadCSVDoughnut2() {
    const headers = ["Category", "Total"];

    const question3 = questions.questions[2];
    const questionId = question3.id;
    const answerTexts = question3.choices;

    // Calculate total occurrences for each answer text in the question
    const series = answerTexts.map((answerText) =>
      calculateTotalOccurrences(questionId, answerText)
    );

    // Combine categories and totals into an array of arrays (rows)
    const dataRows = answerTexts.map((answerText, index) => [
      answerText,
      series[index],
    ]);

    // Prepare CSV content
    const csvContent = [headers, ...dataRows.map((row) => row.join(","))].join(
      "\n"
    );

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadCSVQ6() {
    const headers = ["Category", "Total"];

    const question6 = questions.questions[5];
    const questionId = question6.id;
    const answerTexts = question6.choices;

    // Calculate total occurrences for each answer text in the question
    const series = answerTexts.map((answerText) =>
      calculateTotalOccurrences(questionId, answerText)
    );

    // Combine categories and totals into an array of arrays (rows)
    const dataRows = answerTexts.map((answerText, index) => [
      answerText,
      series[index],
    ]);

    // Prepare CSV content
    const csvContent = [headers, ...dataRows.map((row) => row.join(","))].join(
      "\n"
    );

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="bg-gray-200 shadow-lg p-4 flex justify-between">
        <h1 className="text-2xl font-bold ml-10">Survey Dashboard</h1>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 flex items-center rounded-lg"
          to={"/survey"}
        >
          Survey Form
        </Link>
      </div>
      <div className="max-w-5xl m-auto ">
        <div className="grid md:grid-cols-3 gap-10 mt-5 px-20">
          {cardsData.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                {card.title}
              </h1>
              <h1 className="text-3xl font-bold text-blue-500">{card.count}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Survey Responses
          </h1>
          <LineChart surveyData={surveyData} />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-lg p-6 font-semibold text-gray-800 mb-2">
              Current Stress Level
            </h1>
            <button
              onClick={downloadCSV}
              className="mr-4 text-sm bg-blue-600 hover:bg-blue-800 text-white h-10 rounded-lg px-4"
            >
              Download CSV
            </button>
          </div>

          <Doughnut
            surveyData={surveyData}
            data={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md ">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              Frequency of Stress Experience
            </h1>
            <button
              onClick={downloadCSVDoughnut2}
              className="mr-4 text-sm bg-blue-600 hover:bg-blue-800 text-white h-10 rounded-lg px-4"
            >
              Download CSV
            </button>
          </div>

          <DoughnutQuestion3
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Sources of Stress in Life
          </h1>
          <BarChartQ4
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Preferred Coping Mechanisms for Stress
          </h1>
          <BarChartQ6
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Frequency of Seeking Support When Stressed
          </h1>
          <BarChartQ9
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
