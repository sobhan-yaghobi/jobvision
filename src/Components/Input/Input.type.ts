import React, { ReactNode } from "react";

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
}

export type TypeOptionInput = {
    value: string;
    label: string;
};

export interface TypeSelectInput {
    options: TypeOptionInput[];
    register: {};
    label: string;
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
