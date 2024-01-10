import React from "react";
import { TypeMainInput } from "./Input.type";
import { twMerge } from "tailwind-merge";
import { InputUtils } from "./Input";
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
export default TextareaInput;
