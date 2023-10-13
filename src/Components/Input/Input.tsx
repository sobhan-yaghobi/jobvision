import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineEye } from "react-icons/ai";

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

type TypeIconSide = "Left" | "Right";

interface TypeClassNameInput {
    inputwrapperClassName?: string;
    inputClassName?: string;
    iconWrapperClassName?: string;
}

type TypeClassNameInputRequird = {
    [P in keyof TypeClassNameInput]: string;
};

interface TypeMainInput {
    placeholder: string;
    className?: [TypeClassNameInput];
    register: {};
    iconSide?: TypeIconSide;
    icon?: ReactNode;
}

const className: TypeClassNameInputRequird = {
    inputwrapperClassName:
        "parentInput m-0 py-2 px-3 text-xs relative w-full inline-flex bg-jv-transparent border-[1px] border-solid border-[#d9d9d9] rounded-lg !leading-[1.5714285714285714] hover:border-jv-primary hover:border-e-[1px] shadow-[rgba(5, 145, 255, 0.1)]",
    inputClassName: "w-full group-focus:border-jv-primary bg-transparent",
    iconWrapperClassName: "",
};

type TypeIconGenerator = {
    iconSide: TypeIconSide;
    icon: ReactNode;
    className: string;
};

const IconGenerator: React.FC<TypeIconGenerator> = ({ icon, iconSide, className }) => (
    <span
        className={twMerge(
            `${iconSide === "Right" ? "me-2" : iconSide === "Left" ? "ms-2" : ""} flex items-center`,
            className
        )}
    >
        {icon}
    </span>
);

const isClassNameUndefined: Function = (className: string | undefined): string => {
    return typeof className !== "undefined" ? className : "";
};

const TextInput: React.FC<TypeMainInput> = (props) => {
    return (
        <span
            className={twMerge(
                className.inputwrapperClassName,
                isClassNameUndefined(
                    typeof props.className !== "undefined" ? props.className[0].inputwrapperClassName : undefined
                )
            )}
        >
            {props.iconSide === "Right" || typeof props.iconSide === "undefined" ? (
                <IconGenerator
                    className={isClassNameUndefined(
                        typeof props.className !== "undefined" ? props.className[0].iconWrapperClassName : undefined
                    )}
                    icon={props.icon}
                    iconSide="Right"
                ></IconGenerator>
            ) : null}
            <input
                className={className.inputClassName}
                type="text"
                placeholder={props.placeholder}
                autoComplete="off"
                {...props.register}
            />
            {props.iconSide === "Left" ? (
                <IconGenerator
                    className={isClassNameUndefined(
                        typeof props.className !== "undefined" ? props.className[0].iconWrapperClassName : undefined
                    )}
                    icon={props.icon}
                    iconSide="Left"
                ></IconGenerator>
            ) : null}
        </span>
    );
};

export { TextInput };
