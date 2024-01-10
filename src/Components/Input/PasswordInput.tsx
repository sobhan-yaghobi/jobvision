import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { InputUtils } from "./Input";
import { TypeTextInput } from "./Input.type";

import { AiOutlineEye } from "react-icons/ai";

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
                    `flex items-center ${props.iconSide === "Right" ? "flex-row-reverse" : ""}`,
                    Boolean(props.isError) ? InputUtils.className.dangerInputClassName : ""
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

export default PasswordInput;
