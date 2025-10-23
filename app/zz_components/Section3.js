"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const items = [
  "한국의 기초산업은 빠르게 변하고 있습니다.",
  "외국인 노동자 비중이 꾸준히 늘고 있습니다",
  "현장에서는 의존과 배제가 동시에 나타납니다.",
  "갈등의 뿌리는 제도적 공백에 있습니다.",
  "우리의 취재는 이 문제를 드러내고자 합니다.",
];

export default function Section3() {
  const ref = useRef(null);
  const [visibleKey, setVisibleKey] = useState(0); // key를 바꿔서 재마운트

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 화면에 들어올 때 key를 바꿔서 마운트 → 애니메이션 재생
          setVisibleKey((prev) => prev + 1);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="lg:flex mt-10 lg:mt-20 px-[5%]">
      <div className="lg:w-1/2 relative" key={visibleKey}>
        <h3 className="font-bold text-3xl lg:text-5xl mb-6 lg:mb-12">
          WHY THIS PROJECT MATTERS
        </h3>
        <ul className="space-y-2 lg:space-y-8 relative">
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-6 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.4,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <motion.span
                className="w-2 lg:w-4 aspect-square bg-black rounded-full z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.4 + 0.2,
                  type: "spring",
                  stiffness: 400,
                }}
              />
              <motion.p
                className="lg:text-lg leading-relaxed font-semibold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.4 + 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                {item}
              </motion.p>
              {index !== items.length - 1 && (
                <motion.div
                  className="absolute left-[3px] lg:left-[7px] top-4 lg:top-5 w-[1px] lg:w-[2px] h-full bg-gray-300 origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.4 + 0.3, duration: 0.5 }}
                />
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="lg:w-1/2 mt-10 lg:mt-0  ">
        <div className="w-full relative lg:aspect-[4/3] rounded-xl overflow-hidden">
          <img
            src="/page3.png"
            alt="asdlf"
            className="w-full h-[20vh] lg:h-full object-cover rounded-xl 
            hover:scale-[1.05] transition duration-1000"
          />
        </div>
        <p className="text-right text-sm mt-2 leading-tight">
          경기도 용인시 건설 현장 아침 안전교육
        </p>
        <p className="text-right text-sm  leading-tight">
          A morning safety training session at a construction site in Yongin,
          Gyeonggi Province
        </p>
      </div>
    </div>
  );
}
