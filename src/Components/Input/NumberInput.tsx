import React from "react";
import { TypeNumberInput } from "./Input.type";
import { twMerge } from "tailwind-merge";
import { InputUtils } from "./Input";

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

export default NumberInput;
