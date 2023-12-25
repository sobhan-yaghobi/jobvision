import React from "react";
import logo from "/Svg/Logo/PrimaryColorLogo.svg";
import { PuffLoader } from "react-spinners";

const Loading: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-fit glass rounded-lg p-4 flex flex-col items-center justify-center">
                <img className="h-7 mb-5 no-drag" src={logo} alt="" />
                <PuffLoader speedMultiplier={1.5} size="30px" color="#5660f2" cssOverride={{}} />
            </div>
        </div>
    );
};

export default Loading;
