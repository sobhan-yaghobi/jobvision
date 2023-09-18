import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

import { AnimatePresence, motion } from "framer-motion";

interface AccordionProps {
    title: string;
    content: string;
    isOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, isOpen }) => {
    const [isActive, setIsActive] = useState<boolean>(isOpen ? isOpen : false);
    return (
        <div
            className={`accordion-item transition-all duration-300 my-1 w-full border border-solid rounded-xl p-1 border-transparent ${
                isActive ? "border-jv-dark" : ""
            }`}
        >
            <div
                onClick={() => setIsActive((prev) => !prev)}
                className={`accordion-header py-2 px-3 flex items-center justify-between transition-all duration-300 ${
                    isActive ? "text-jv-primary" : "border-b-[1px] border-solid"
                }`}
            >
                <span className="truncate text-xl">{title}</span>
                <AiOutlineDown className={`${isActive ? "rotate-180" : ""}`}></AiOutlineDown>
            </div>
            <div className={`${isActive ? "block" : "hidden"} border border-solid border-jv-primary my-3`}></div>
            <div
                className={`accordion-content p-2 relative transition-all duration-300 ${
                    isActive ? "h-auto visible opacity-1" : "h-0 invisible opacity-0"
                }`}
            >
                {content}
            </div>
        </div>
    );
};

export default Accordion;
