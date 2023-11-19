import React, { ReactNode } from "react";
import { Control } from "react-hook-form";

export type TypeIconSide = "Left" | "Right";

interface TypeClassNameInput {
    inputwrapperClassName?: string;
    inputClassName?: string;
    iconWrapperClassName?: string;
    autoCompleteWrapperClassName?: string;
    dangerInputClassName?: string;
}

export type TypeClassNameInputRequird = {
    [P in keyof TypeClassNameInput]: string;
};

export interface TypeMainInput {
    placeholder?: string;
    className?: string;
    register: {};
    isError?: string | undefined;
}

export interface TypeTextInput extends Omit<TypeMainInput, "className"> {
    className?: [TypeClassNameInput];
    iconSide?: TypeIconSide;
    icon?: ReactNode;
    value?: string;
    onChange?: (value: string) => void | React.Dispatch<React.SetStateAction<string>>;
}

export type TypeSelectInput = TypeMainInput &
    (
        | {
              mode: "Multiple";
              id: string;
              callBackFn: (param: string[]) => void;
          }
        | {
              mode: "Single";
              options: TypeOptionInput[];
              label: string;
          }
        | {
              id: string;
              mode: "Multiple_Option";
              options: TypeOptionInput[];
              callBackFn: (param: string[]) => void;
          }
    );

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

export type CheckBoxProps = {
    control: Control<any>;
    name: string;
    label: string;
    value?: string;
};

export type TypeIconGenerator = {
    mode?: "Menu";
    iconSide: TypeIconSide | undefined;
    className: string | undefined;
    icon: ReactNode;
};

export type TypeAutoCompleteGenerator = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    className?: [
        {
            wrapper?: string;
            ulElement?: string;
        }
    ];
};
