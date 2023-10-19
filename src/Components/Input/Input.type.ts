import React, { ReactNode } from "react";
import { DateObject } from "react-multi-date-picker";

export type TypeIconSide = "Left" | "Right";

interface TypeClassNameInput {
    inputwrapperClassName?: string;
    inputClassName?: string;
    iconWrapperClassName?: string;
    autoCompleteWrapperClassName?: string;
}

export type TypeClassNameInputRequird = {
    [P in keyof TypeClassNameInput]: string;
};

export interface TypeMainInput {
    placeholder: string;
    className?: [TypeClassNameInput];
    register: {};
    iconSide?: TypeIconSide;
    icon?: ReactNode;
    isError?: boolean;
}

export type TypeOptionInput = {
    value: string;
    label: string;
};

export interface TypeSelectInput {
    options: TypeOptionInput[];
    register: {};
    label: string;
    className?: string;
}
export interface TypeTextareaInput {
    register: {};
    placeholder: string;
    className?: string;
}

export interface TypeDateInput {
    placeholder?: string;
    date?: Date;
    setDate: (date: number) => void;
}

export interface TypeNumberInput {
    register: {};
    defValue?: number;
    placeholder: string;
    max?: number;
    min?: number;
}

export type TypeIconGenerator = {
    mode?: "Menu";
    iconSide: TypeIconSide | undefined;
    className: string | undefined;
    icon: ReactNode;
};

export type TypeAutoCompleteGenerator = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
