import React, { ReactNode } from "react";

interface InputProps {
    Placeholder: string;
    ClassName?: string;
    IsDefault?: boolean;
    IsIcon?: boolean;
    IconSide?: "Right" | "Both" | "Left";
    IconRight?: ReactNode;
    IconLeft?: ReactNode;
}

const Input: React.FC<InputProps> = ({ Placeholder, ClassName, IsDefault, IsIcon, IconSide, IconRight, IconLeft }) => {
    const defaultParentClassName =
        "parentInput m-0 py-2 px-3 text-xs relative w-full inline-flex bg-jv-light border-[1px] border-solid border-[#d9d9d9] rounded-lg !leading-[1.5714285714285714] hover:border-jv-primary hover:border-e-[1px] shadow-[rgba(5, 145, 255, 0.1)]";
    const defaultINputClass = "bg-transparent";
    const ClassList = `${IsDefault ? "" : defaultParentClassName} ${IsDefault ? "" : defaultINputClass} ${ClassName}`;
    return (
        <>
            <span className={ClassList}>
                {(IsIcon && IconSide === "Both") || IconSide === "Right" ? (
                    <span className="me-2 flex items-center">{IconRight}</span>
                ) : null}

                <input
                    className={`w-full group-focus:border-jv-primary ${defaultINputClass}`}
                    type="text"
                    placeholder={Placeholder}
                />
                {(IsIcon && IconSide === "Both") || IconSide === "Left" ? (
                    <span className="ms-2 flex items-center">{IconLeft}</span>
                ) : null}
            </span>
        </>
    );
};

export default Input;
