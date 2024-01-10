import React from "react";

import { CheckBoxProps } from "./Input.type";
import { Controller } from "react-hook-form";
import { Checkbox } from "antd";

const CheckBox: React.FC<CheckBoxProps> = ({ control, name, label, value }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox
                        {...field}
                        className="text-inherit"
                        checked={field.value}
                        value={typeof value !== "undefined" ? value : field.value}
                    >
                        {label}
                    </Checkbox>
                )}
            />
        </>
    );
};

export default CheckBox;
