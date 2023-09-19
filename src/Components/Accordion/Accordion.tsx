import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface AccordionProps {
    title: string;
    content: string;
    isOpen?: boolean | undefined;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, isOpen }) => {
    const [isActive, setIsActive] = useState<boolean>(typeof isOpen === "undefined" ? false : isOpen);
    return (
        <div
            className={`accordion-item transition-all duration-300 my-1 w-full border border-solid rounded-xl p-1 ${
                isActive ? "border-jv-dark" : "border-transparent"
            }`}
        >
            <div
                onClick={() => setIsActive((prev) => !prev)}
                className={`accordion-header py-2 px-3 flex items-center justify-between transition-all duration-300 border-b-[1px] border-solid ${
                    isActive ? "text-jv-primary border-jv-primary" : "border-jv-dark"
                }`}
            >
                <span className="truncate text-xl">{title}</span>
                <AiOutlineDown className={`${isActive ? "rotate-180" : ""}`}></AiOutlineDown>
            </div>
            <div
                className={`wrapper overflow-hidden grid transition-all duration-700 ${
                    isActive ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"
                }`}
            >
                <div className={`min-h-0`}>{content}</div>
            </div>
        </div>
    );
};

export default Accordion;
