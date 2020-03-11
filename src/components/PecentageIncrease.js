import React from "react";
import className from "classnames";
import CountUp from "react-countup";

const PercentageIncrease = ({ first, last, dictionaryKey }) => {
  const difference = last - first;
  let percentage = (difference / first) * 100;

  percentage = Math.round((percentage + Number.EPSILON) * 100) / 100;

  const hasIncreased = Math.sign(percentage) === -1 ? false : true;

  if (difference === 0) percentage = 0;
  return (
    <div className="card flex items-center justify-center flex-col h-56">
      <span className="text-xs text-blue-600 font-bold">
        PERVENTAGE INCREASE/ DECREASE
      </span>
      <div className="text-5xl font-extrabold flex items-center justify-center truncate text-center">
        <CountUp end={percentage} decimals="2" duration={0.5} suffix="%" />
        <span
          className={className({
            "transform rotate-180": hasIncreased,
            "text-green-600": hasIncreased,
            "text-red-600": !hasIncreased
          })}
        >
          <svg
            width="25"
            height="25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <g
              clip-path="url(#clip0)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M11.769-7.657l.764 26.989M19.332 12.137l-6.8 7.195-7.195-6.8" />
            </g>
            <defs>
              <clipPath id="clip0">
                <path
                  transform="rotate(178.379 24.67 23.99)"
                  d="M24.669 23.99h24v24h-24z"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
      <span>{dictionaryKey}</span>
    </div>
  );
};

export default PercentageIncrease;
