import { FaLightbulb } from "react-icons/fa6";

const TipsText = ({ text }: { text: string }) => {
  return (
    <div className="inline-flex justify-center items-center rounded-md bg-white border border-primary-600">
      <span className="p-2 text-sm md:text-sm space-x-2 flex items-center">
        <FaLightbulb className="text-yellow-500" />
        <p>{text}</p>
      </span>
    </div>
  );
};

export default TipsText;
