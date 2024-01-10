import React, { useEffect, useRef, useState } from "react";
import { TypeOptionInput, TypeSelectInput } from "./Input.type";

import { twMerge } from "tailwind-merge";
import { InputUtils } from "./Input";

import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";

const SelectInput: React.FC<TypeSelectInput> = (props) => {
    if (props.mode === "Single") {
        return (
            <>
                <div
                    className={twMerge(
                        `select w-full border-[1px] border-solid border-jv-primary rounded-lg bg-transparent cursor-pointer text-lg relative`,
                        props.className,
                        Boolean(props.isError) ? InputUtils.className.dangerInputClassName : ""
                    )}
                >
                    <AiFillCaretDown className="w-3 h-3 -z-10 flex absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-4" />
                    <select
                        {...props.register}
                        className="w-full p-2 bg-transparent cursor-pointer text-inherit"
                        id="standard-select"
                    >
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
        const setBlurAction = (value: string) => {
            value.length > 0 ? setList((prev) => [...prev, value.trim()]) : null;
            setValue("");
            list.length > 0 ? inputRef.current?.classList.add("hidden") : null;
        };
        useEffect(() => props.callBackFn(list), [list]);
        useEffect(() => (props.isReset ? setList([]) : undefined), [props.isReset]);
        return (
            <div
                onClick={activeInput}
                className={twMerge(
                    InputUtils.className.inputwrapperClassName,
                    "min-h-[2.5rem] flex-wrap",
                    Boolean(props.isError) ? InputUtils.className.dangerInputClassName : ""
                )}
            >
                {list.map((item, index) => (
                    <p
                        onClick={() => setList((prev) => prev.filter((prevItem) => prevItem !== item))}
                        className="cursor-pointer box-info-type truncate my-1 flex items-center"
                        key={index}
                    >
                        {item}
                        <AiOutlineClose className="mr-2" />
                    </p>
                ))}
                <input
                    id={props.id}
                    ref={inputRef}
                    onBlur={(e) => setBlurAction(e.target.value)}
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
                    className={twMerge(InputUtils.className.inputClassName)}
                />
            </div>
        );
    } else if (props.mode === "Multiple_Option") {
        const [showAutoComplete, setShowAutoComplete] = useState(false);
        const [list, setList] = useState<TypeOptionInput[]>([] as TypeOptionInput[]);
        const listUpdateAction = () => {
            const mainList = list.map((item) => item.value);
            props.callBackFn(mainList);
        };
        const autoCompleteAction = (
            isClose: boolean,
            event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined
        ) => {
            event?.stopPropagation();
            InputUtils.AutoCompleteAction(isClose ? "Blur" : "Focus", showAutoComplete, setShowAutoComplete);
        };
        useEffect(() => listUpdateAction(), [list]);
        useEffect(() => (props.isReset ? setList([]) : undefined), [props.isReset]);
        return (
            <div
                onClick={() => {
                    autoCompleteAction(false, undefined);
                }}
                className={twMerge(
                    InputUtils.className.inputwrapperClassName,
                    "min-h-[2.5rem] flex-wrap",
                    props.className,
                    Boolean(props.isError) ? InputUtils.className.dangerInputClassName : ""
                )}
            >
                <span
                    onClick={(e) => autoCompleteAction(showAutoComplete, e)}
                    className="flex items-center justify-center absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    {showAutoComplete ? <AiOutlineClose /> : <AiFillCaretDown />}
                </span>
                {!list.length ? (
                    <p>{props.placeholder}</p>
                ) : (
                    list.map((item, index) => (
                        <p
                            onClick={() => setList((prev) => prev.filter((prevItem) => prevItem !== item))}
                            className="cursor-pointer box-info-type truncate my-1 flex items-center"
                            key={`${index}-listItem-${props.id}`}
                        >
                            {item.label}
                            <AiOutlineClose className="mr-2" />
                        </p>
                    ))
                )}
                <InputUtils.AutoCompleteGenerator
                    className={[{ wrapper: "drop-shadow-xl rounded-lg" }]}
                    show={showAutoComplete}
                    setShow={setShowAutoComplete}
                >
                    {props.options.map((item, index) =>
                        !list.find((listItem) => listItem.value === item.value) ? (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-jv-lightGray3x"
                                onClick={() =>
                                    setList((prev) =>
                                        list.find((listItem) => listItem.value === item.value) ? prev : [...prev, item]
                                    )
                                }
                            >
                                {item.label}
                            </li>
                        ) : null
                    )}
                </InputUtils.AutoCompleteGenerator>
            </div>
        );
    }
    return <></>;
};

export default SelectInput;
