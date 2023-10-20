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
    placeholder?: string;
    className?: string;
    register: {}; //
    isError?: boolean | undefined;
}

export interface TypeTextInput extends Omit<TypeMainInput, "className"> {
    className?: [TypeClassNameInput];
    iconSide?: TypeIconSide;
    icon?: ReactNode;
}
export interface TypeSelectInput extends TypeMainInput {
    options: TypeOptionInput[];
    label: string;
}

export type TypeOptionInput = {
    value: string;
    label: string;
};

export interface TypeDateInput extends Omit<TypeMainInput, "register"> {
    date?: Date;
    setDate: (date: number) => void;
}

export interface TypeNumberInput extends TypeMainInput {
    defValue?: number;
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
