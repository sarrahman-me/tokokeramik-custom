import { ReactElement } from "react";

export default function DisplayData({
  title,
  data,
}: {
  title: string;
  data: ReactElement | string;
}) {
  return (
    <p className="text-secondary-medium/80">
      {title} :{" "}
      <span className="font-medium text-sm md:text-base text-secondary-medium">
        {data}
      </span>
    </p>
  );
}
