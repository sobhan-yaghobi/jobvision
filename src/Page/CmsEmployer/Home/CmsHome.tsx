import React from "react";
import { useSearchParams } from "react-router-dom";

const CmsHome: React.FC = () => {
    const [route, setRoute] = useSearchParams({ page: "main" });
    return (
        <div>
            <button onClick={() => setRoute((prev) => ({ ...prev, page: "sobhan" }))}>Click me</button>
        </div>
    );
};

export default CmsHome;
