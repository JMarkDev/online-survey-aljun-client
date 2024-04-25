import React, { useState } from "react";
import { Link } from "react-router-dom";
import noticeImg from "../assets/terms_condition.png";

const TermsCondition = ({ openModal }) => {
  const [agree, setAgree] = useState(false);

  const handleAgree = () => {
    if (agree) {
      // Execute the action (e.g., navigate to survey)
      openModal();
    } else {
      // Show error message or perform other actions when not agreed
      alert("Please agree to the terms and conditions");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-xl">
        <div className="relative bg-white rounded-lg shadow p-6">
          {/* Image container */}
          <div className="relative">
            <img src={noticeImg} alt="" className="h-20 mb-10 m-auto" />
            {/* Letter above the image */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 text-3xl font-bold text-gray-800">
              Terms & Conditions
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Greetings User</h1>
          <p className="text-gray-700 leading-relaxed my-4">
            You are invited to participate in our student stress survey. We know
            that higher education experience can be truly genuinely stressful
            sometimes, and we want to find out ways to support our students to
            cope with that more efficiently.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The purpose of this questionnaire is to capture feedback about the
            stress you've experienced this academic year and how you've handled
            that. The completion will take approximately 5-10 minutes.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Please, take some moments to reflect on each question addressed and
            try to be as sincere as possible.We assure you that the gathered data 
            is safe and will not be used for personal interest and Your answers will remain
            confidential and they will be only used in finding ways to improve
            the academic experience of our students in the future...
          </p>
          <div className="flex items-center justify-center mt-4">
            <input
              onChange={(e) => setAgree(e.target.checked)}
              type="checkbox"
              className="cursor-pointer h-4 w-4 accent-blue-600 form-checkbox"
            />
            <label className="text-gray-700 ml-2">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="flex justify-center items-center gap-5 mt-6">
            <button
              onClick={handleAgree}
              className={`${
                !agree ? "cursor-not-allowed opacity-50" : ""
              } bg-blue-500 rounded-lg text-white px-4 py-2 font-bold block`}
              disabled={!agree}
            >
              Agree
            </button>
            <Link
              to={"/dashboard"}
              className="bg-gray-300 p-2 rounded-lg text-black font-bold block"
            >
              Disagree
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
