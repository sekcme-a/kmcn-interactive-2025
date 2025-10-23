"use client";

import { motion } from "framer-motion";

const mainTitle = `국가 기초산업 현장이주근로자 토착화`;
const subTitle = "건설업 현장을 중심으로 본 외국인 노동의 구조적 과제";
const enTitle =
  "LOCALIZATION OF MIGRANT WORKERS IN KOREA'S KEY INDUSTRIAL SITES";
const enSub =
  "A reporting project on how foreign workers shape Korea's industries.";

export default function Section1() {
  const wordSplit = (text) =>
    text.split(" ").map((word, idx) => ({ word, idx }));

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: -50, scale: 0.95, rotate: -2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const lineVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="lg:flex items-center lg:gap-x-10 justify-between lg:py-20 mt-20 px-4 lg:px-[5%] ">
      {/* 한글 텍스트 */}
      <motion.div
        className="lg:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={container}
      >
        {/* H1 단어별 stagger */}
        <h1 className="text-4xl lg:text-7xl font-extrabold leading-[1] lg:leading-[1.15] tracking-tight flex flex-wrap gap-2">
          {wordSplit(mainTitle).map(({ word, idx }) => (
            <motion.span
              key={idx}
              variants={wordVariant}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* 문단 line별 stagger */}
        {subTitle.split(". ").map((line, idx) => (
          <motion.p
            key={idx}
            className="text-lg lg:text-xl font-medium mt-3 lg:mt-6"
            variants={lineVariant}
            transition={{ delay: idx * 0.2 }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      {/* 영어 텍스트 */}
      <motion.div
        className="lg:w-1/2 text-left lg:text-right lg:pl-32  pt-10 lg:pt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={container}
      >
        <h2 className="text-lg lg:text-4xl font-semibold leading-[1.1] flex flex-wrap lg:justify-end gap-1 lg:gap-2">
          {wordSplit(enTitle).map(({ word, idx }) => (
            <motion.span
              key={idx}
              variants={wordVariant}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {enSub.split(". ").map((line, idx) => (
          <motion.p
            key={idx}
            className="text-base mt-2 lg:mt-5 lg:pl-52"
            variants={lineVariant}
            transition={{ delay: idx * 0.2 }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}
