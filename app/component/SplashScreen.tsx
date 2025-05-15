import React, { useEffect, useState } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { time } from "console";

interface SplashScreenProps {
  finishLoading: () => void;
}

const SplashScreen = ({ finishLoading }: SplashScreenProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const animateLogo = () => {
    // Animasi logo dengan durasi lebih lama
    const loader = animate("#logo", {
      delay: 0,
      scale: [0.5, 1, 1.2, 1], // Menambahkan efek bounce
      opacity: [0, 1],
      duration: 2000, // Meningkatkan durasi animasi menjadi 2 detik
      easing: "easeInOutExpo",
    });

    // Menambahkan delay sebelum memanggil finishLoading
    setTimeout(() => {
      finishLoading();
    }, 3000); // Menambahkan delay 3 detik setelah animasi
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animateLogo();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-400 to-blue-500"
      data-mounted={isMounted}
    >
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-24 mx-auto"
          id="logo"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
          />
        </svg>
        <p className="text-white mt-4 text-xl font-semibold animate-pulse">
          Loading Weather Data...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
