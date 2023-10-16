import React, { ReactNode } from "react";
import { IconType } from "react-icons";

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
