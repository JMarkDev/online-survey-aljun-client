import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Doughnut from "../components/DoughnutQ1";
import FilterComponents from "../components/FilterComponents";
import LineChart from "../components/LineChart";
import api from "../api/api";
import BarChartQ9 from "../components/BarChartQ9";
import DoughnutQuestion3 from "../components/DoughnutQuestion3";
import BarChartQ4 from "../components/BarchartQ5";
import BarChartQ6 from "../components/BarChartQ6";
import PieChartQ10 from "../components/PieChartQ10";

const Dashboard = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [responseCount, setResponseCount] = useState(0);
  const [regular, setRegular] = useState(0);
  const [irregular, setIrregular] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [filterPieChart, setFilterPieChart] = useState([]);
  const [filterFrequency, setfilterFrequency] = useState([]);
  const [filterStress, setFilterStress] = useState([]);
  const [filterMechamnisms, setfilterMechamnisms] = useState([]);
  const [filterSupport, setfilterSupport] = useState([]);

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

  const handleFilter = (minAge, maxAge, course, yearLevel, gender) => {
    if (!minAge && !maxAge && !course && !yearLevel && !gender) {
      setFilterData(surveyData);
    }
    const filterDataSurvey = surveyData.filter((data) => {
      const age = data.age;

      if (age < minAge || age > maxAge) {
        return false;
      }

      if (course && data.course !== course) {
        return false;
      }

      if (yearLevel && data.year_level !== yearLevel) {
        return false;
      }

      if (gender && data.gender !== gender) {
        return false;
      }

      return true;
    });
    setFilterData(filterDataSurvey);
  };

  useEffect(() => {
    handleFilter();
  }, [surveyData]);

  const handleFilterPieChart = (minAge, maxAge, course, yearLevel, gender) => {
    if (!minAge && !maxAge && !course && !yearLevel && !gender) {
      setFilterPieChart(surveyData);
    }
    const filterDataSurvey = surveyData.filter((data) => {
      const age = data.age;

      if (age < minAge || age > maxAge) {
        return false;
      }

      if (course && data.course !== course) {
        return false;
      }

      if (yearLevel && data.year_level !== yearLevel) {
        return false;
      }

      if (gender && data.gender !== gender) {
        return false;
      }

      return true;
    });
    setFilterPieChart(filterDataSurvey);
  };

  useEffect(() => {
    handleFilterPieChart();
  }, [surveyData]);

  const handleFilterFrequency = (minAge, maxAge, course, yearLevel, gender) => {
    if (!minAge && !maxAge && !course && !yearLevel && !gender) {
      setfilterFrequency(surveyData);
    }
    const filterDataSurvey = surveyData.filter((data) => {
      const age = data.age;

      if (age < minAge || age > maxAge) {
        return false;
      }

      if (course && data.course !== course) {
        return false;
      }

      if (yearLevel && data.year_level !== yearLevel) {
        return false;
      }

      if (gender && data.gender !== gender) {
        return false;
      }

      return true;
    });
    setfilterFrequency(filterDataSurvey);
  };

  useEffect(() => {
    handleFilterFrequency();
  }, [surveyData]);

  const handleFilterStress = (minAge, maxAge, course, yearLevel, gender) => {
    if (!minAge && !maxAge && !course && !yearLevel && !gender) {
      setFilterStress(surveyData);
    }
    const filterDataSurvey = surveyData.filter((data) => {
      const age = data.age;

      if (age < minAge || age > maxAge) {
        return false;
      }

      if (course && data.course !== course) {
        return false;
      }

      if (yearLevel && data.year_level !== yearLevel) {
        return false;
      }

      if (gender && data.gender !== gender) {
        return false;
      }

      return true;
    });
    setFilterStress(filterDataSurvey);
  };

  useEffect(() => {
    handleFilterStress();
  }, [surveyData]);

  const handleFilterMechanisms = (
    minAge,
    maxAge,
    course,
    yearLevel,
    gender
  ) => {
    if (!minAge && !maxAge && !course && !yearLevel && !gender) {
      setfilterMechamnisms(surveyData);
    }
    const filterDataSurvey = surveyData.filter((data) => {
      const age = data.age;

      if (age < minAge || age > maxAge) {
        return false;
      }

      if (course && data.course !== course) {
        return false;
      }

      if (yearLevel && data.year_level !== yearLevel) {
        return false;
      }

      if (gender && data.gender !== gender) {
        return false;
      }

      return true;
    });
    setfilterMechamnisms(filterDataSurvey);
  };

  useEffect(() => {
    handleFilterMechanisms();
  }, [surveyData]);

  const handleFilterSupport = (minAge, maxAge, course, yearLevel, gender) => {
    if (!minAge && !maxAge && !course && !yearLevel && !gender) {
      setfilterSupport(surveyData);
    }
    const filterDataSurvey = surveyData.filter((data) => {
      const age = data.age;

      if (age < minAge || age > maxAge) {
        return false;
      }

      if (course && data.course !== course) {
        return false;
      }

      if (yearLevel && data.year_level !== yearLevel) {
        return false;
      }

      if (gender && data.gender !== gender) {
        return false;
      }

      return true;
    });
    setfilterSupport(filterDataSurvey);
  };

  useEffect(() => {
    handleFilterSupport();
  }, [surveyData]);

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
            <h1 className="text-lg p-6 font-semibold text-gray-800 mb-2">
              Current Stress Level
            </h1>
            <FilterComponents handleFilter={handleFilter} />

            <Doughnut surveyData={filterData} />
          </div>
        </div>
        <div className="max-w-5xl mt-10 m-auto">
          <div className="bg-white rounded-lg shadow-md">
            <h1 className="text-lg p-6 font-semibold text-gray-800 mb-2">
              Attend stress management workshop or training program
            </h1>
            <FilterComponents handleFilter={handleFilterPieChart} />

            <PieChartQ10 surveyData={filterPieChart} />
          </div>
        </div>
        <div className="max-w-5xl mt-10 m-auto">
          <div className="bg-white rounded-lg p-6 shadow-md ">
            <h1 className="text-lg p-6 font-semibold text-gray-800 mb-2">
              Frequency of Stress Experience
            </h1>
            <FilterComponents handleFilter={handleFilterFrequency} />

            <DoughnutQuestion3 surveyData={filterFrequency} />
          </div>
        </div>
        <div className="max-w-5xl mt-10 m-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              Sources of Stress in Life
            </h1>
            <FilterComponents handleFilter={handleFilterStress} />

            <BarChartQ4 surveyData={filterStress} />
          </div>
        </div>
        <div className="max-w-5xl mt-10 m-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              Preferred Coping Mechanisms for Stress
            </h1>
            <FilterComponents handleFilter={handleFilterMechanisms} />

            <BarChartQ6 surveyData={filterMechamnisms} />
          </div>
        </div>
        <div className="max-w-5xl mt-10 m-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              Frequency of Seeking Support When Stressed
            </h1>
            <FilterComponents handleFilter={handleFilterSupport} />

            <BarChartQ9 surveyData={filterSupport} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
