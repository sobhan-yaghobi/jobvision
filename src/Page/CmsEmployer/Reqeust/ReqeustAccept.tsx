import React from "react";
import RequestBox from "../../../Components/RequestBox/RequestBox";

const ReqeustAccept: React.FC = () => {
    return (
        <>
            <h3>درخواست های تایید شده</h3>
            <div className="mt-3">
                {Array(7)
                    .fill("")
                    .map((value, index) => (
                        <RequestBox key={`ReqeustBox-${index}`}></RequestBox>
                    ))}
            </div>
        </>
    );
};

export default ReqeustAccept;
