import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Doughnut from "../components/DoughnutQ1";
import DoughnutByCourse from "../components/DoughnutByCourse";
import LineChart from "../components/LineChart";
import api from "../api/api";
import BarChartQ9 from "../components/BarChartQ9";
import DoughnutQuestion3 from "../components/DoughnutQuestion3";
import BarChartQ4 from "../components/BarchartQ5";
import BarChartQ6 from "../components/BarChartQ6";
import PieChartQ10 from "../components/PieChartQ10";
import questions from "../questions/question.json";

const Dashboard = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [responseCount, setResponseCount] = useState(0);
  const [regular, setRegular] = useState(0);
  const [irregular, setIrregular] = useState(0);

  useEffect(() => {
    const getStudentStatus = () => {
      let regularCount = 0;
      let irregularCount = 0;
      surveyData.forEach((response) => {
        const studentStatus = response.answers.question1[0];

        if (studentStatus === "Regular") {
          regularCount++;
        } else if (studentStatus === "Irregular") {
          irregularCount++;
        }
      });
      setRegular(regularCount);
      setIrregular(irregularCount);
    };

    getStudentStatus();
  }, [surveyData]);

  const cardsData = [
    { title: "Total Responses", count: responseCount },
    { title: "Irregular Students", count: irregular },
    { title: "Regular Students", count: regular },
    { title: "Total Course", count: 8 },
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

    const question1 = questions.questions[1];
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

  function downloadCSVDonut1() {
    const headers = [
      "Full Name",
      "Email",
      "Age",
      "Course",
      "Year Level",
      "Gender",
      "Student Status",
      "Stress",
      "Experience Stress",
      "Stress Impact",
      "Stress Main Source",
      "Coping Mechanism",
      "Effective Coping Mechanism",
      "work-life balance ",
      "Seek support ",
      "Attended Stress Management ",



    ];
    const dataRows = surveyData.map((response) => {
      return [
        response.fullname,
        response.email,
        response.age,
        response.course,
        response.year_level,
        response.gender,
        response.answers.question1[0],
        response.answers.question2[0],
        response.answers.question3[0],
        response.answers.question4[0],
        response.answers.question5[0],
        response.answers.question6[0],
        response.answers.question7[0],
        response.answers.question8[0],
        response.answers.question9[0],
        response.answers.question10[0],
      ];
    });

    const csvContent = [headers, ...dataRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "response.csv";
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

  const downloadCsvPieChart = () => {
    const headers = [
      "Full Name",
      "Email",
      "Age",
      "Course",
      "Year Level",
      "Gender",
      "attended a stress management",
    ];
    const dataRows = surveyData.map((response) => {
      return [
        response.fullname,
        response.email,
        response.age,
        response.course,
        response.year_level,
        response.gender,
        response.answers.question10[0],
      ];
    });

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
  };

  return (
    <>
      <div className="pb-10 bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className=" bg-gradient-to-r from-blue-200 to-cyan-200 shadow-lg p-4 flex justify-between">
          <h1 className="text-2xl font-bold ml-10">Survey Dashboard</h1>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 flex items-center rounded-lg"
            to={"/survey"}
          >
            Survey Form
          </Link>
        </div>
        <div className="max-w-5xl m-auto ">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 px-4">
            {cardsData.map((card, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h1 className="text-lg font-semibold text-gray-800 mb-2">
                  {card.title}
                </h1>
                <h1 className="text-3xl font-bold text-blue-500">
                  {card.count}
                </h1>
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
                onClick={downloadCSVDonut1}
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
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="text-lg p-6 font-semibold text-gray-800 mb-2">
                Current Stress Level By Course
              </h1>
              <button
                onClick={downloadCSVDonut1}
                className="mr-4 text-sm bg-blue-600 hover:bg-blue-800 text-white h-10 rounded-lg px-4"
              >
                Download CSV
              </button>
            </div>

            <DoughnutByCourse
              surveyData={surveyData}
              data={surveyData}
              calculateTotalOccurrences={calculateTotalOccurrences}
            />
          </div>
        </div>
        <div className="max-w-5xl mt-10 m-auto">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="text-lg p-6 font-semibold text-gray-800 mb-2">
                Attend stress management workshop or training program By Course
              </h1>
              <button
                onClick={downloadCsvPieChart}
                className="mr-4 text-sm bg-blue-600 hover:bg-blue-800 text-white h-10 rounded-lg px-4"
              >
                Download CSV
              </button>
            </div>

            <PieChartQ10
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
      </div>
    </>
  );
};

export default Dashboard;
