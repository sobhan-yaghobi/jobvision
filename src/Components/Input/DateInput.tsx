import React from "react";
import { TypeDateInput } from "./Input.type";

// Date Picker
import DatePicker from "react-multi-date-picker";
import Jalali from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

const DateInput: React.FC<TypeDateInput> = ({ placeholder, date, setDate }) => {
    return (
        <>
            <DatePicker
                calendar={Jalali}
                value={date}
                placeholder={placeholder}
                locale={persian_fa}
                maxDate={new Date()}
                onChange={(date: DateObject) => setDate(date.valueOf())}
                style={{
                    padding: ".5rem",
                    fontFamily: "dana",
                    background: "transparent",
                    borderColor: "var(--lightGray3xColor)",
                }}
                calendarPosition="top-right"
                fixMainPosition
                fixRelativePosition
                hideOnScroll
            />
        </>
    );
};
export default DateInput;
