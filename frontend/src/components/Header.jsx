import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${assets.heroImg})`,
      }}
      className="bg-cover bg-center rounded-lg"
    >
      <div className="flex flex-col md:flex-row flex-wrap backdrop-filter backdrop-blur-sm bg-primary bg-opacity-90 rounded-lg px-6 md:px-10 lg:px-20">
        <div className="md:w-1/2 flex flex-col items-center justify-center text-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-3xl md:text-4xl lg-text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            Transforming Your Help Into
            <br /> Smiles and Wellness.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <p>
              {" "}
              We foster a culture of giving by transforming religious donations
              into impactful initiatives
              <br className="hidden sm:block" /> that uplift underprivileged
              communities and create lasting societal change.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-white font-medium px-8 py-3 rounded-full text-gray-700 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/register-form")}
          >
            DONATE NOW <img className="w-3" src={assets.arrow_icon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
