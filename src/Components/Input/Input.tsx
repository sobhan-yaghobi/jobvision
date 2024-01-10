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
    TypeOptionInput,
} from "./Input.type";

// Components
import { Controller } from "react-hook-form";
import { Checkbox } from "antd";

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

export namespace InputUtils {
    export const className: TypeClassNameInputRequird = {
        inputwrapperClassName:
            "parentInput m-0 py-2 px-3 text-xs relative w-full inline-flex bg-jv-transparent border-[1px] border-solid border-[#d9d9d9] rounded-lg !leading-[1.5714285714285714] hover:border-jv-primary hover:border-e-[1px] shadow-[rgba(5, 145, 255, 0.1)]",
        dangerInputClassName: "border-jv-danger hover:border-jv-danger",
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
        className,
    }) => {
        return (
            <div
                className={twMerge(
                    `w-full absolute  left-0 pt-4 transition-all duration-500 ${
                        show ? "opacity-100 visible top-full z-30" : "opacity-0 invisible top-0 -z-10"
                    }`,
                    className?.[0].wrapper
                )}
            >
                <ul
                    className={twMerge(
                        "w-full max-h-48 overflow-y-auto rounded-lg bg-jv-light",
                        className?.[0].ulElement
                    )}
                >
                    {children}
                </ul>
            </div>
        );
    };

    export const AutoCompleteAction = (
        mode: "Blur" | "Focus",
        state: boolean,
        setState: React.Dispatch<React.SetStateAction<boolean>>
    ): void => {
        setState(() => (mode === "Blur" ? false : mode === "Focus" ? true : false));
    };

    export const isClassNameUndefined: Function = (className: string | undefined): string =>
        typeof className !== "undefined" ? className : "";
}

const TextInput: React.FC<React.PropsWithChildren<TypeTextInput>> = (props) => {
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const changeHanlderAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        typeof props.onChange !== "undefined" ? props.onChange(event.currentTarget.value) : undefined;
    };
    return (
        <span
            className={twMerge(
                InputUtils.className.inputwrapperClassName,
                InputUtils.isClassNameUndefined(
                    typeof props.className !== "undefined" ? props.className[0].inputwrapperClassName : undefined
                ),
                `flex items-center ${props.iconSide === "Right" ? "flex-row-reverse" : ""}`,
                Boolean(props.isError) ? InputUtils.className.dangerInputClassName : ""
            )}
        >
            {typeof props.children !== "undefined" ? (
                <span onClick={() => setShowAutoComplete(() => (showAutoComplete ? false : true))}>
                    <InputUtils.IconGenerator
                        icon={showAutoComplete ? <AiOutlineClose /> : <AiFillCaretDown />}
                        iconSide={props.iconSide}
                        mode="Menu"
                        className={InputUtils.className.iconWrapperClassName}
                    ></InputUtils.IconGenerator>
                </span>
            ) : null}
            <input
                value={typeof props.value !== "undefined" ? props.value : undefined}
                onInput={changeHanlderAction}
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

const TextareaInput: React.FC<TypeMainInput> = (props) => {
    return (
        <>
            <textarea
                placeholder={props.placeholder}
                className={twMerge(
                    `w-full min-h-[4rem] max-h-72 resize-y p-2 bg-transparent border-[1px] border-solid rounded-lg border-jv-lightGray3x`,
                    props.className,
                    Boolean(props.isError) ? InputUtils.className.dangerInputClassName : ""
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

const NumberInput: React.FC<TypeNumberInput> = ({
    placeholder,
    defValue,
    max,
    min,
    register,
    className,
    isError,
    disabled,
}) => {
    return (
        <>
            <input
                disabled={disabled}
                value={defValue}
                placeholder={placeholder}
                max={max}
                min={min}
                {...register}
                className={twMerge(
                    "bg-transparent p-2 rounded-lg outline-none border border-solid border-jv-lightGray3x",
                    className,
                    Boolean(isError) ? InputUtils.className.dangerInputClassName : ""
                )}
                type="number"
            />
        </>
    );
};

const CheckBox: React.FC<CheckBoxProps> = ({ control, name, label, value }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox
                        {...field}
                        className="text-inherit"
                        checked={field.value}
                        value={typeof value !== "undefined" ? value : field.value}
                    >
                        {label}
                    </Checkbox>
                )}
            />
        </>
    );
};

export { TextInput, TextareaInput, DateInput, NumberInput, CheckBox };
