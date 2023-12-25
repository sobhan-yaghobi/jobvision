import React from "react";
import RequestBox from "../../../Components/RequestBox/RequestBox";

const ReqeustReject: React.FC = () => {
    return (
        <>
            <h3>درخواست های رد شده</h3>
            <div className="mt-3">
                {Array(2)
                    .fill("")
                    .map((value, index) => (
                        <RequestBox key={`ReqeustBox-${index}`}></RequestBox>
                    ))}
            </div>
        </>
    );
};

export default ReqeustReject;
