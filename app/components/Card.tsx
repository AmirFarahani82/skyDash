import { ReactElement } from "react";

type CardProps = {
  title: string;
  data: number;
  currency?: boolean;
  icon: ReactElement;
};
function Card({ title, data, icon, currency }: CardProps) {
  return (
    <div className="flex flex-col justify-around mt-4 w-1/4 h-37.5 bg-sky-200 rounded-xl p-5 shadow-[0_8px_20px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.08)]">
      <div className="bg-white p-1.5 w-max rounded-lg text-2xl ">{icon}</div>
      <span>{title}</span>
      <span className="font-semibold text-2xl">
        {currency
          ? data.toLocaleString("us-en", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "symbol",
            })
          : data}
      </span>
    </div>
  );
}

export default Card;
