import React, { useEffect, useRef, useState } from "react";

// Types
import {
    TypeClassNameInputRequird,
    TypeMainInput,
    TypeIconGenerator,
    TypeAutoCompleteGenerator,
    TypeSelectInput,
    TypeDateInput,
    TypeNumberInput,
    TypeTextInput,
    CheckBoxProps,
} from "./Input.type";

// Components
import { Controller } from "react-hook-form";
import { Checkbox, Select } from "antd";

// Functions
import { twMerge } from "tailwind-merge";

// Icons
import { AiOutlineEye } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

// Date Picker
import DatePicker from "react-multi-date-picker";
import Jalali from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

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

const TextInput: React.FC<React.PropsWithChildren<TypeTextInput>> = (props) => {
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
                className={twMerge(InputUtils.className.inputClassName, props.className?.[0].inputClassName)}
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

const PasswordInput: React.FC<TypeTextInput> = (props) => {
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
    if (props.mode === "Single") {
        return (
            <>
                <div
                    className={twMerge(
                        `select w-fit border-[1px] border-solid border-jv-primary rounded-lg p-2 bg-transparent cursor-pointer text-lg`,
                        props.className
                    )}
                >
                    <select {...props.register} className="w-full bg-transparent cursor-pointer" id="standard-select">
                        {props.options.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            </>
        );
    } else if (props.mode === "Multiple") {
        const inputRef = useRef<HTMLInputElement>(null);
        const [value, setValue] = useState<string>("");
        const [list, setList] = useState<string[]>([]);
        const keyPressAction = (event?: React.KeyboardEvent<HTMLInputElement>) => {
            typeof event !== "undefined" ? event.preventDefault() : null;
            if (value.length) {
                setList((prev) => (prev.includes(value.trim()) ? prev : [...prev, value.trim()]));
                setValue("");
            }
        };
        const activeInput = () => {
            inputRef.current?.classList.remove("hidden");
            inputRef.current?.focus();
        };
        useEffect(() => props.callBackFn(list), [list]);
        return (
            <div
                onClick={activeInput}
                className={twMerge(InputUtils.className.inputwrapperClassName, "min-h-[2.5rem] flex-wrap")}
            >
                {list.map((item, index) => (
                    <p className="box-info-type truncate my-1 flex items-center" key={index}>
                        {item}
                        <span
                            className="flex items-center cursor-pointer"
                            onClick={() => setList((prev) => prev.filter((prevItem) => prevItem !== item))}
                        >
                            <AiOutlineClose className="mr-2" />
                        </span>
                    </p>
                ))}
                <input
                    id={props.id}
                    ref={inputRef}
                    onBlur={() => inputRef.current?.classList.add("hidden")}
                    value={value}
                    onKeyDownCapture={(e) => (e.key === "Enter" ? keyPressAction(e) : null)}
                    onChange={(e) => setValue(e.target.value)}
                    autoComplete="off"
                    placeholder={
                        !list.length
                            ? props.placeholder
                                ? props.placeholder
                                : "برای اضافه کردن Enter کیبورد رو فشار دهید"
                            : undefined
                    }
                    className={twMerge(InputUtils.className.inputClassName, "")}
                />
            </div>
        );
    }
    return <></>;
};

const TextareaInput: React.FC<TypeMainInput> = (props) => {
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

const DateInput: React.FC<TypeDateInput> = ({ placeholder, date, setDate }) => {
    return (
        <>
            <DatePicker
                calendar={Jalali}
                value={date}
                placeholder={placeholder}
                locale={persian_fa}
                maxDate={new Date()}
                onChange={(date: DateObject) => setDate(date.valueOf())}
                style={{
                    padding: ".5rem",
                    fontFamily: "dana",
                    background: "transparent",
                    borderColor: "var(--lightGray3xColor)",
                }}
                calendarPosition="top-right"
                fixMainPosition
                fixRelativePosition
                hideOnScroll
            />
        </>
    );
};

const NumberInput: React.FC<TypeNumberInput> = ({ placeholder, defValue, max, min, register, className }) => {
    return (
        <>
            <input
                value={defValue}
                placeholder={placeholder}
                max={max}
                min={min}
                {...register}
                className={twMerge(
                    "bg-transparent p-2 rounded-lg outline-none border border-solid border-jv-lightGray3x",
                    className
                )}
                type="number"
            />
        </>
    );
};

const CheckBox: React.FC<CheckBoxProps> = ({ control, name, label }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox className="text-inherit" checked={field.value} {...field}>
                        {label}
                    </Checkbox>
                )}
            />
        </>
    );
};

export { TextInput, PasswordInput, SelectInput, TextareaInput, DateInput, NumberInput, CheckBox };
