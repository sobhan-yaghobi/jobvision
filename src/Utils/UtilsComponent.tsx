import { FaStar, FaRegStar } from "react-icons/fa";
import { TimeType } from "./Utils";
interface ScoreIconGeneratorProps {
    score: number;
}
const ScoreIconGenerator: React.FC<ScoreIconGeneratorProps> = ({ score }) => {
    return (
        <>
            {Array(Math.ceil(score))
                .fill("")
                .map((value, index) => (
                    <FaStar key={index + 1} />
                ))}
            {Array(5 - Math.ceil(score))
                .fill("")
                .map((value, index) => (
                    <FaRegStar key={index + 1} />
                ))}
        </>
    );
};

interface TimeGeneratorProps {
    dateInfo: TimeType;
}

const TimeGenerator: React.FC<TimeGeneratorProps> = ({ dateInfo }) => {
    return (
        <>
            {dateInfo.type === "Second"
                ? `هم اکنون`
                : dateInfo.type === "Minute"
                ? `${dateInfo.date} دقیقه پیش`
                : dateInfo.type === "Hour"
                ? `${dateInfo.date} ساعت پیش`
                : dateInfo.type === "Day"
                ? `${dateInfo.date} روز پیش`
                : dateInfo.type === "Month"
                ? `${dateInfo.date} ماه پیش`
                : dateInfo.type === "Year"
                ? `${dateInfo.date} سال پیش`
                : null}
        </>
    );
};

export { ScoreIconGenerator, TimeGenerator };
