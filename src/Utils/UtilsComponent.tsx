import { FaStar, FaRegStar } from "react-icons/fa";
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

export { ScoreIconGenerator };
