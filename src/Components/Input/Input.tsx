import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import {
    TypeClassNameInputRequird,
    TypeMainInput,
    TypeIconGenerator,
    TypeAutoCompleteGenerator,
    TypeSelectInput,
    TypeTextareaInput,
} from "./Input.type";
import { DatePicker } from "antd";

namespace InputUtils {
    export const className: TypeClassNameInputRequird = {
        inputwrapperClassName:
            "parentInput m-0 py-2 px-3 text-xs relative w-full inline-flex bg-jv-transparent border-[1px] border-solid border-[#d9d9d9] rounded-lg !leading-[1.5714285714285714] hover:border-jv-primary hover:border-e-[1px] shadow-[rgba(5, 145, 255, 0.1)]",
        inputClassName: "w-full group-focus:border-jv-primary bg-transparent",
        iconWrapperClassName: "flex items-center",
        autoCompleteWrapperClassName: "",
    };

    export const IconGenerator: React.FC<TypeIconGenerator> = (props) => {
        const ClassName = {
            iconSideClass: `${
                props.iconSide === "Right"
                    ? `${props.mode === "Menu" ? "ms-2" : "me-2"}`
                    : props.iconSide === "Left"
                    ? `${props.mode === "Menu" ? "me-2" : "ms-2"}`
                    : `${props.mode === "Menu" ? "me-2" : "ms-2"}`
            }`,
            propsClassName: `text-lg ${typeof props.className !== "undefined" ? props.className : ""}`,
        };
        return <span className={twMerge(ClassName.iconSideClass, ClassName.propsClassName)}>{props.icon}</span>;
    };

    export const AutoCompleteGenerator: React.FC<React.PropsWithChildren<TypeAutoCompleteGenerator>> = ({
        children,
        show,
    }) => {
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

    export const AutoCompleteAction = (
        mode: "Blur" | "Focus",
        state: boolean,
        setState: React.Dispatch<React.SetStateAction<boolean>>
    ): undefined => {
        setState((prev) => (mode === "Blur" ? false : mode === "Focus" ? true : false));
    };

    export const isClassNameUndefined: Function = (className: string | undefined): string =>
        typeof className !== "undefined" ? className : "";
}

const TextInput: React.FC<React.PropsWithChildren<TypeMainInput>> = (props) => {
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    return (
        <span
            className={twMerge(
                InputUtils.className.inputwrapperClassName,
                InputUtils.isClassNameUndefined(
                    typeof props.className !== "undefined" ? props.className[0].inputwrapperClassName : undefined
                ),
                `flex items-center ${props.iconSide === "Right" ? "flex-row-reverse" : ""}`
            )}
        >
            {typeof props.children !== "undefined" ? (
                <span onClick={() => setShowAutoComplete((prev) => (showAutoComplete ? false : true))}>
                    <InputUtils.IconGenerator
                        icon={showAutoComplete ? <AiOutlineClose /> : <AiFillCaretDown />}
                        iconSide={props.iconSide}
                        mode="Menu"
                        className={InputUtils.className.iconWrapperClassName}
                    ></InputUtils.IconGenerator>
                </span>
            ) : null}
            <input
                className={InputUtils.className.inputClassName}
                type="text"
                placeholder={props.placeholder}
                autoComplete="off"
                onBlur={() => InputUtils.AutoCompleteAction("Blur", showAutoComplete, setShowAutoComplete)}
                onFocus={() => InputUtils.AutoCompleteAction("Focus", showAutoComplete, setShowAutoComplete)}
                {...props.register}
            />
            <InputUtils.IconGenerator
                icon={props.icon}
                iconSide={props.iconSide}
                className={InputUtils.className.iconWrapperClassName}
            ></InputUtils.IconGenerator>
            {typeof props.children !== "undefined" ? (
                <InputUtils.AutoCompleteGenerator show={showAutoComplete} setShow={setShowAutoComplete}>
                    {props.children}
                </InputUtils.AutoCompleteGenerator>
            ) : null}
        </span>
    );
};

const PasswordInput: React.FC<TypeMainInput> = (props) => {
    const [isPassShow, setIsPassShow] = useState(false);
    return (
        <>
            <span
                className={twMerge(
                    InputUtils.className.inputwrapperClassName,
                    InputUtils.isClassNameUndefined(
                        typeof props.className !== "undefined" ? props.className[0].inputwrapperClassName : undefined
                    ),
                    `flex items-center ${props.iconSide === "Right" ? "flex-row-reverse" : ""}`
                )}
            >
                <input
                    type={isPassShow ? "text" : "password"}
                    className={`w-full group-focus:border-jv-primary ${InputUtils.className.inputClassName}`}
                    placeholder={props.placeholder}
                    {...props.register}
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
            </span>
        </>
    );
};

const SelectInput: React.FC<TypeSelectInput> = (props) => {
    return (
        <>
            <div
                className={twMerge(
                    `select w-full max-w-[15rem] min-w-[10rem] border-2 border-solid border-jv-primary rounded-lg p-2 bg-transparent cursor-pointer text-lg`,
                    props.className
                )}
            >
                <select {...props.register} className="w-full bg-transparent cursor-pointer" id="standard-select">
                    <option value="">{props.label}</option>
                    {props.options.map((item, index) => (
                        <option value={item.value} key={index}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

const TextareaInput: React.FC<TypeTextareaInput> = (props) => {
    return (
        <>
            <textarea
                placeholder={props.placeholder}
                className={twMerge(
                    `w-full min-h-[4rem] max-h-72 resize-y p-2 bg-transparent border-[1px] border-solid rounded-lg border-jv-lightGray3x`,
                    props.className
                )}
                {...props.register}
            ></textarea>
        </>
    );
};

const DateInput: React.FC = () => {
    const now = new Date().toLocaleDateString("fa-IR");
    return (
        <>
            {/* <DatePicker></DatePicker> */}
            <input type="date" value={now} name="" id="" />
        </>
    );
};

export { TextInput, PasswordInput, SelectInput, TextareaInput, DateInput };
