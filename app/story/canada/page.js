"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/app/zz_components/Header";
import ChartCanada from "./components/ChartCanada";
import { useRouter } from "next/navigation";
import ArticleButton from "../ArticleButton";
import FieldsButton from "../FieldsButton";

// ===============================================
// MOCK COMPONENTS (단일 파일 구성을 위해 임시로 모킹됨)
// ===============================================

const MockHeader = () => (
  <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
    <div className="font-bold text-xl tracking-tighter">
      APPLE-INSPIRED CONTENT
    </div>
    <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
      <a href="#" className="hover:text-black transition-colors">
        Overview
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Details
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Chart
      </a>
    </nav>
  </div>
);

const MockChartCanada = () => (
  <div className="w-full h-64 bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center text-sm text-gray-500">
    {/* 원본 ChartCanada 컴포넌트의 Placeholder */}
    <div className="text-center">
      <p className="font-semibold text-gray-700">차트 영역 Placeholder</p>
      <p>캐나다 주택 건설업 주요 직종별 이민자 비중 데이터 시각화</p>
    </div>
  </div>
);

// ===============================================
// ANIMATION VARIANTS (애니메이션 설정)
// Apple-like ease (smooth acceleration/deceleration)
// ===============================================

const appleEase = [0.25, 0.46, 0.45, 0.94];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 요소들이 순차적으로 나타나는 시간 간격
      ease: appleEase,
    },
  },
};

const itemVariants = {
  initial: { y: 30, opacity: 0, scale: 0.98 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7, // 애니메이션 지속 시간
      ease: appleEase,
    },
  },
};

const imageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: appleEase,
    },
  },
};

// ===============================================
// MAIN COMPONENT (메인 컴포넌트)
// ===============================================

export default function App() {
  const router = useRouter();
  return (
    <div className="lg:h-screen flex flex-col pb-10 lg:pb-0 ">
      {/* <MockHeader /> */}
      <Header />
      <motion.div
        className="lg:flex mx-[5%] mt-10 lg:mt-0 gap-x-14 py-3 flex-1 "
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Left Column - Text and Chart */}
        <motion.div
          className="lg:flex-1 flex flex-col justify-around"
          variants={containerVariants}
        >
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tighter"
              variants={itemVariants}
            >
              IN CANADA
            </motion.h1>

            <motion.p
              className="text mt-3 leading-relaxed text-gray-700"
              variants={itemVariants}
            >
              캐나다 건설업은 포르투갈계 노동자 팀 문화가 뿌리내려 숙련공
              중심으로 현장을 주도하고 있습니다. 이들은 산업 성장에 기여하지만
              동시에 현지 노동자에게는 진입 장벽이 되며, 공정한 고용 관리가
              과제로 남아 있습니다.
            </motion.p>

            {/* Button - Hover Animation Added */}
            <motion.div className="lg:flex justify-end" variants={itemVariants}>
              <ArticleButton url="https://www.kmcn.kr/news/article.html?no=8069" />
            </motion.div>
            <motion.div
              className="lg:flex justify-end hidden"
              variants={itemVariants}
            >
              <FieldsButton />
            </motion.div>
          </div>
          <div>
            <motion.h2
              className="font-bold text-2xl mt-10 lg:mt-5 mb-5 tracking-tight"
              variants={itemVariants}
            >
              캐나다 주택 건설업 주요 직종별 이민자 비중
            </motion.h2>

            <motion.div variants={itemVariants}>
              <ChartCanada />
            </motion.div>

            <motion.p
              className="text-right text-sm mt-3 text-gray-500"
              variants={itemVariants}
            >
              각 수치는 해당 직종 종사자 중 이민자가 차지하는 비율이며, 합산되지
              않습니다.
            </motion.p>
            <motion.p
              className="text-right text-xs leading-[1.1] text-gray-400"
              variants={itemVariants}
            >
              {/* 데이터 출처 */}
              {
                '{Government of Canada, Immigration, Refugees and Citizenship Canada(2024), "Immigration Matters"}'
              }
            </motion.p>
          </div>
        </motion.div>

        {/* Right Column - Image and Cards */}
        <motion.div
          className="lg:flex-1 mt-16 lg:mt-0 flex flex-col justify-around"
          variants={containerVariants}
        >
          <div>
            {/* Image Block */}
            <motion.div
              variants={imageVariants}
              className="shadow-2xl rounded-2xl overflow-hidden"
            >
              {/* Apple 느낌을 위해 이미지 대신 더미 placeholder 이미지 사용 */}
              <img
                src="/canada.png"
                alt="캐나다"
                className="w-full h-[40vh] object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </motion.div>

            <motion.p
              className="text-right text-sm mt-3 text-gray-700"
              variants={itemVariants}
            >
              토론토 도심 건설 현장, 외국인 노동자들이 다수 참여하는 캐나다
              건설업의 현주소를 보여준다.
            </motion.p>
            <motion.p
              className="text-right text-xs leading-[1.1] text-gray-500"
              variants={itemVariants}
            >
              {`A construction site in downtwon Toronto, reflecting Canada's
              reliance on migrant workers in the building sector`}
            </motion.p>
          </div>

          {/* Feature Cards Section */}
          <motion.div
            className="lg:flex gap-x-6 mt-10 lg:mt-0 "
            variants={containerVariants}
          >
            {/* Card 1 */}
            <motion.div
              className="lg:flex-1  py-6 lg:py-3 px-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 "
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div className="px-3 py-1 font-bold bg-black text-white inline-block rounded-full text-xs tracking-wider">
                팀 문화의 주도성
              </motion.div>
              <p className="mt-4 leading-[1.3] text-gray-700">
                포르투갈계 노동자들은 숙련공으로서 현장의 주요 공정을 맡으며, 팀
                단위로 강한 영향력을 발휘하고 있습니다.
              </p>
              <p className="mt-2 text-sm leading-[1.3] text-gray-500 italic">
                Portuguese workers, as skilled laborers, play leading roles in
                major site operations through strong team culture
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="lg:flex-1 mt-5 lg:mt-0 py-6 lg:py-3 px-6 bg-gray-50 rounded-xl shadow-md border border-gray-100"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div className="px-3 py-1 font-bold bg-black text-white inline-block rounded-full text-xs tracking-wider">
                현지 노동자의 체감 장벽
              </motion.div>
              <p className="mt-4 leading-[1.3] text-gray-700">
                일부 현지 노동자들은 이러한 팀 문화 속에서 기회가 제한된다고
                느끼며, 갈등의 배경이 되고 있습니다.
              </p>
              <p className="mt-2 leading-[1.3] text-gray-500 text-sm italic">
                Some local workers perceive limited opportunities within this
                structure, fuelin underlying tensions.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          onClick={() => router.back()}
          // onClick={() => router.push("/fields")}
          className="py-3 mt-7 lg:hidden px-8 rounded-full text-white cursor-pointer text-sm font-semibold tracking-wide
             bg-gray-700
              flex items-center justify-center space-x-2 w-full lg:w-auto "
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            ease: appleEase,
          }}
        >
          <span>다른 도시 보기</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
