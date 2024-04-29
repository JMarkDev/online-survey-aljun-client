import React, { useEffect, useState } from "react";

const FilterComponents = ({ handleFilter }) => {
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);

  useEffect(() => {
    handleFilter(minAge, maxAge, course, yearLevel, gender);
  }, [minAge, maxAge, course, yearLevel, gender]);

  return (
    <div className="p-2 flex flex-col gap-4">
      <h1 className="font-bold text-xl">Filter by:</h1>
      <div>
        <div className="flex flex-col w-full">
          <label htmlFor="">Filter age range:</label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min Age"
              onChange={(e) => setMinAge(e.target.value)}
              className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md "
            />

            <input
              type="number"
              placeholder="Max Age"
              onChange={(e) => setMaxAge(e.target.value)}
              className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md "
            />
          </div>
        </div>
      </div>
      <div className="relative inline-block w-full">
        <h1>Filter by Course</h1>
        <select
          name="course"
          id="course"
          onChange={(e) => setCourse(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Course</option>
          <option value="BSCS">Bachelor of Science in Computer Science</option>
          <option value="ACT">Associate in Computer Technology</option>
          <option value="BSED">
            Bachelor of Science in Secondary Education
          </option>
          <option value="BEED">
            Bachelor of Science in Elementary Education
          </option>
          <option value="BSSW">Bachelor of Science in Social Work</option>
          <option value="BSPOLSCIE">
            Bachelor of Science in Political Science
          </option>
          <option value="BSCRIM">Bachelor of Science in Criminology</option>
          <option value="AB FIL">Bachelor of Arts in Filipino</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5 7l5 5 5-5z" />
          </svg>
        </div>
      </div>
      <div>
        <div className="relative inline-block w-full">
          <h1>Filter by Year Level</h1>
          <select
            name="year_levevl"
            id="year"
            onChange={(e) => setYearLevel(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Year Level</option>
            <option value="1st Year">1ST YEAR</option>
            <option value="2nd Year">2ND YEAR</option>
            <option value="3rd Year">3RD YEAR</option>
            <option value="4th Year">4TH YEAR</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5 7l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <div className="relative inline-block w-full">
          <h1>Filter by Gender</h1>
          <select
            name="year_levevl"
            id="year"
            onChange={(e) => setGender(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Filter by gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5 7l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponents;
