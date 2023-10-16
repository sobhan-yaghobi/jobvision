import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

interface InputProps {
    Type: "PASSWORD" | "TEXT";
    Placeholder: string;
    ClassName?: string;
    IsDefault?: boolean;
    IsIcon?: boolean;
    IconSide?: "Right" | "Both" | "Left";
    IconRight?: ReactNode;
    IconLeft?: ReactNode;
    Register?: {};
}

const Input: React.FC<InputProps> = ({
    Type,
    Placeholder,
    ClassName,
    IsDefault,
    IsIcon,
    IconSide,
    IconRight,
    IconLeft,
    Register,
}) => {
    const defaultParentClassName =
        "parentInput m-0 py-2 px-3 text-xs relative w-full inline-flex bg-jv-light border-[1px] border-solid border-[#d9d9d9] rounded-lg !leading-[1.5714285714285714] hover:border-jv-primary hover:border-e-[1px] shadow-[rgba(5, 145, 255, 0.1)]";
    const defaultInputClass = "bg-transparent";
    const ClassList = `${IsDefault ? "" : defaultParentClassName} ${IsDefault ? "" : defaultInputClass} ${ClassName}`;
    if (Type === "TEXT") {
        return (
            <>
                <span className={ClassList}>
                    {(IsIcon && IconSide === "Both") || IconSide === "Right" ? (
                        <span className="me-2 flex items-center">{IconRight}</span>
                    ) : null}
                    {typeof Register !== "undefined" ? (
                        <input
                            className={`w-full group-focus:border-jv-primary ${defaultInputClass}`}
                            type="text"
                            placeholder={Placeholder}
                            {...Register}
                            autoComplete="off"
                        />
                    ) : (
                        <input
                            className={`w-full group-focus:border-jv-primary ${defaultInputClass}`}
                            type="text"
                            placeholder={Placeholder}
                        />
                    )}

                    {(IsIcon && IconSide === "Both") || IconSide === "Left" ? (
                        <span className="ms-2 flex items-center">{IconLeft}</span>
                    ) : null}
                </span>
            </>
        );
    } else if (Type === "PASSWORD") {
        const [isPassShow, setIsPassShow] = useState(false);
        return (
            <>
                <span className={ClassList}>
                    {typeof Register !== "undefined" ? (
                        <>
                            <input
                                type={isPassShow ? "text" : "password"}
                                className={`w-full group-focus:border-jv-primary ${defaultInputClass}`}
                                placeholder={Placeholder}
                                {...Register}
                            />
                            <span
                                onClick={() => setIsPassShow((prev) => !prev)}
                                className="cursor-pointer text-lg flex items-center relative"
                            >
                                <span
                                    className={`${
                                        isPassShow ? "w-full" : "w-0"
                                    } h-[1px] rotate-45 bg-jv-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                                ></span>
                                <AiOutlineEye />
                            </span>
                        </>
                    ) : null}
                </span>
            </>
        );
    }
};
export default Input;

// !------------------------------------------------------------------------------

import {
    TypeIconSide,
    TypeClassNameInputRequird,
    TypeMainInput,
    TypeIconGenerator,
    TypeAutoCompleteGenerator,
} from "./Input.type";

const className: TypeClassNameInputRequird = {
    inputwrapperClassName:
        "parentInput m-0 py-2 px-3 text-xs relative w-full inline-flex bg-jv-transparent border-[1px] border-solid border-[#d9d9d9] rounded-lg !leading-[1.5714285714285714] hover:border-jv-primary hover:border-e-[1px] shadow-[rgba(5, 145, 255, 0.1)]",
    inputClassName: "w-full group-focus:border-jv-primary bg-transparent",
    iconWrapperClassName: "flex items-center",
    autoCompleteWrapperClassName: "",
};

const IconGenerator: React.FC<TypeIconGenerator> = (props) => {
    const ClassName = {
        iconSideClass: `${props.iconSide === "Right" ? "me-2" : props.iconSide === "Left" ? "ms-2" : "ms-2"}`,
        propsClassName: typeof props.className !== "undefined" ? props.className : "",
    };
    return <span className={twMerge(ClassName.iconSideClass, ClassName.propsClassName)}>{props.icon}</span>;
};

const AutoCompleteAction = (
    mode: "Blur" | "Focus",
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
): undefined => {
    setState((prev) => (mode === "Blur" ? false : mode === "Focus" ? true : false));
};

const AutoCompleteGenerator: React.FC<React.PropsWithChildren<TypeAutoCompleteGenerator>> = ({ children, show }) => {
    return (
        <div
            className={`w-full absolute  left-0 pt-4 transition-all duration-500 ${
                show ? "opacity-100 visible top-full z-30" : "opacity-0 invisible top-0 -z-10"
            }`}
        >
            <ul className="w-full max-h-48 overflow-y-auto rounded-lg bg-jv-light">{children}</ul>
        </div>
    );
};

const isClassNameUndefined: Function = (className: string | undefined): string =>
    typeof className !== "undefined" ? className : "";

const TextInput: React.FC<React.PropsWithChildren<TypeMainInput>> = (props) => {
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    return (
        <span
            className={twMerge(
                className.inputwrapperClassName,
                isClassNameUndefined(
                    typeof props.className !== "undefined" ? props.className[0].inputwrapperClassName : undefined
                ),
                `flex items-center ${props.iconSide === "Right" ? "flex-row-reverse" : ""}`
            )}
        >
            {typeof props.children !== "undefined" ? (
                <span onClick={() => setShowAutoComplete((prev) => (showAutoComplete ? false : true))}>
                    <IconGenerator
                        icon={showAutoComplete ? <AiOutlineClose /> : <AiFillCaretDown />}
                        iconSide={props.iconSide}
                        mode="Menu"
                        className={className.iconWrapperClassName}
                    ></IconGenerator>
                </span>
            ) : null}
            <input
                className={className.inputClassName}
                type="text"
                placeholder={props.placeholder}
                autoComplete="off"
                onBlur={() => AutoCompleteAction("Blur", showAutoComplete, setShowAutoComplete)}
                onFocus={() => AutoCompleteAction("Focus", showAutoComplete, setShowAutoComplete)}
                {...props.register}
            />
            <IconGenerator
                icon={props.icon}
                iconSide={props.iconSide}
                className={className.iconWrapperClassName}
            ></IconGenerator>
            {typeof props.children !== "undefined" ? (
                <AutoCompleteGenerator show={showAutoComplete} setShow={setShowAutoComplete}>
                    {props.children}
                </AutoCompleteGenerator>
            ) : null}
        </span>
    );
};

// const;

export { TextInput };
