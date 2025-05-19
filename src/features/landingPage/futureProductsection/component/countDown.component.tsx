"use client";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 3);
    const difference = +targetDate - +new Date();

    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      timeLeft = {
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="text-center bg-white text-text rounded-full h-[64px] w-[64px] flex flex-col items-center justify-center"
        >
          <div className="text-[12px] font-[600]">{value}</div>
          <div className="text-[8.9px] font-[400]">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
