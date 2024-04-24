import React, { useState } from "react";
import "../../src/App.css";
import { useNavigate, Link } from "react-router-dom";
import questions from "../questions/question.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";
import Loading from "../components/loading/Loading";
import TermsCondition from "./TermsCondition";
import Thankyou from "./Thankyou";

const Survey = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(true);
  const [thankyou, setThankyou] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    course: "",
    age: "",
    gender: "",
    year_level: "",
    answers: [],
  });

  const closeModal = () => {
    setModal(false);
  };

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [yearLevelError, setYearLevelError] = useState("");
  const [answerError, setAnswerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setFullnameError("");
    setCourseError("");
    setGenderError("");
    setAnswerError("");
    setEmailError("");
    setAgeError("");
    setYearLevelError("");

    // Check if all questions have been answered
    const unansweredQuestions = questions.questions.filter(
      (question) => !values.answers.hasOwnProperty(question.id)
    );

    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all questions before submitting.");
      setLoading(false);
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
      return;
    }

    try {
      const response = await api.post(`/survey/add`, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === "success") {
        toast.success("Survey submitted successfully");
        setThankyou(true);
        setTimeout(() => {
          navigate("/Dashboard");
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.status === "error") {
        setFullnameError(error.response.data.message);
      }

      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          switch (error.path) {
            case "fullname":
              setFullnameError(error.msg);
              break;
            case "email":
              setEmailError(error.msg);
              break;
            case "age":
              setAgeError(error.msg);
              break;
            case "course":
              setCourseError(error.msg);
              break;
            case "gender":
              setGenderError(error.msg);
              break;
            case "year_level":
              setGenderError(error.msg);
              break;
            case "answers":
              setAnswerError(error.msg);
              break;
            default:
              // Handle other errors as needed
              break;
          }
        });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (questionId, choiceIndex, choice) => {
    const selectedAnswers = values.answers[questionId] || [];

    if (
      questions.questions.find((q) => q.id === questionId).choices.length <= 5
    ) {
      // Radio input logic (only one choice can be selected)
      setValues((prevValues) => ({
        ...prevValues,
        answers: {
          ...prevValues.answers,
          [questionId]: [choice],
        },
      }));
    } else {
      // Checkbox input logic (at least three choices required)
      if (selectedAnswers.includes(choice)) {
        // If already selected, remove it
        const newAnswers = selectedAnswers.filter(
          (answer) => answer !== choice
        );
        setValues((prevValues) => ({
          ...prevValues,
          answers: {
            ...prevValues.answers,
            [questionId]: newAnswers,
          },
        }));
      } else {
        // If not selected, add it
        const newAnswers = [...selectedAnswers, choice];
        setValues((prevValues) => ({
          ...prevValues,
          answers: {
            ...prevValues.answers,
            [questionId]: newAnswers,
          },
        }));
      }
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed h-6 ml-[46%] mt-[280px] z-20">
          <Loading />
        </div>
      )}
      {thankyou && <Thankyou />}
      {modal && <TermsCondition openModal={closeModal} />}
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-4">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
        <div className="container rounded-t-lg bg-white max-w-4xl pb-4 m-auto">
          <header className="border-gray-300 border-b py-6 px-4 rounded-t-lg">
            <h1 className="text-lg text-center md:text-2xl font-bold leading-tight">
              Stress Survey from WMSU ESU Pagadian
            </h1>
          </header>

          <form
            action="#"
            className="px-5"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="respondents_info my-10">
              <h1 className="text-lg md:text-3xl font-bold text-left text-gray-800 mb-3">
                Please fill out personal details
              </h1>

              <div>
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="firstname"
                    value={values.fullname}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        fullname: e.target.value,
                      })
                    }
                    placeholder="Enter your Full Name"
                    className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${
                      fullnameError ? "border-red-600" : ""
                    }`}
                  />
                </div>
                {fullnameError && (
                  <div className="text-red-600 text-sm">{fullnameError}</div>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your Email"
                    className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${
                      emailError ? "border-red-600" : ""
                    }`}
                  />
                </div>
                {emailError && (
                  <div className="text-red-600 text-sm">{emailError}</div>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700"
                >
                  Age
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="age"
                    value={values.age}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        age: e.target.value,
                      })
                    }
                    placeholder="Enter your Age"
                    className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${
                      ageError ? "border-red-600" : ""
                    }`}
                  />
                </div>
                {ageError && (
                  <div className="text-red-600 text-sm">{ageError}</div>
                )}
              </div>
              <div className="name flex flex-col mt-4">
                <label
                  htmlFor="course"
                  className="block text-md font-medium text-gray-700"
                >
                  Course
                </label>
                <div className="relative inline-block w-full">
                  <select
                    name="course"
                    id="course"
                    value={values.course}
                    onChange={(e) =>
                      setValues({ ...values, course: e.target.value })
                    }
                    className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      courseError ? "border-red-600" : ""
                    }`}
                  >
                    <option value="">Select Course</option>
                    <option value="BSCS">
                      Bachelor of Science in Computer Science
                    </option>
                    <option value="ACT">
                      Associate in Computer Technology
                    </option>
                    <option value="BSED">
                      Bachelor of Science in Secondary Education
                    </option>
                    <option value="BEED">
                      Bachelor of Science in Elementary Education
                    </option>
                    <option value="BSSW">
                      Bachelor of Science in Social Work
                    </option>
                    <option value="BSPOLSCIE">
                      Bachelor of Science in Political Science
                    </option>
                    <option value="BSCRIM">
                      Bachelor of Science in Criminology
                    </option>
                    {/* <option value="AB FIL">Bachelor of Arts in Filipino</option> */}
                    {/* <option value="ACT">Associate in Computer Technology</option> */}
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
                {courseError && (
                  <div className="text-red-600 text-sm">{courseError}</div>
                )}
                <div className="name flex flex-col mt-4">
                  <label
                    htmlFor="course"
                    className="block text-md font-medium text-gray-700"
                  >
                    Year Level
                  </label>
                  <div className="relative inline-block w-full">
                    <select
                      name="year_levevl"
                      id="year"
                      value={values.year_level}
                      onChange={(e) =>
                        setValues({ ...values, year_level: e.target.value })
                      }
                      className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                        yearLevelError ? "border-red-600" : ""
                      }`}
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
                  {yearLevelError && (
                    <div className="text-red-600 text-sm">{yearLevelError}</div>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="gender"
                    className="block text-md font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div className="flex items-start">
                    <label className="inline-flex items-center mt-2 mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={values.gender === "Male"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={values.gender === "Female"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center mt-2 ml-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Non-Binary"
                        checked={values.gender === "Non-Binary"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Non-binary</span>
                    </label>
                  </div>
                  {genderError && (
                    <div className="text-red-600 text-sm">{genderError}</div>
                  )}
                </div>
              </div>
            </div>

            <h1 className="text-lg md:text-3xl font-bold text-left text-gray-800 mb-3">
              Please answer the following questions:
            </h1>
            {questions.questions.map((question) => (
              <div
                className="relative mt-5 bg-white p-5 rounded-lg hover:shadow-xl border-gray-300 border"
                key={question.id}
              >
                <label
                  htmlFor={question.id}
                  className="block text-lg font-semibold mb-2"
                >
                  {question.question_text}
                </label>
                <div className="options">
                  {question.choices.map((choice, choiceIndex) => (
                    <div
                      className="flex flex-col items-left mb-2 hover:bg-gray-300 rounded-md cursor-pointer"
                      key={choiceIndex}
                    >
                      <div className="flex items-center pl-2">
                        <input
                          type={
                            question.choices.length <= 5 ? "radio" : "checkbox"
                          }
                          id={`${question.id}-${choiceIndex}`}
                          name={question.id}
                          className="mr-2 cursor-pointer h-4 w-4 accent-blue-600 form-checkbox"
                          onChange={() =>
                            handleSelectAnswer(question.id, choiceIndex, choice)
                          }
                          checked={values.answers[question.id]?.includes(
                            choice
                          )}
                        />
                        <label
                          htmlFor={`${question.id}-${choiceIndex}`}
                          className="cursor-pointer  w-full py-2"
                        >
                          {choice}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="relative items-center w-full justify-center flex my-4 btn bg-blue-500 hover:bg-blue-600 text-white font-semibold px-12 py-2 rounded-md shadow-md transition duration-300 ease-in-out`}
            "
            >
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Survey;
