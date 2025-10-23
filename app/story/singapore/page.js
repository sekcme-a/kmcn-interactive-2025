"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/app/zz_components/Header";
import ChartSingapore from "./ChartSingapore";
import { useRouter } from "next/navigation";

// ===============================================
// MOCK COMPONENTS (단일 파일 구성을 위해 임시로 모킹됨)
// ===============================================

const MockHeader = () => (
  <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
    <div className="font-bold text-xl tracking-tighter text-gray-800">
      SINGAPORE CONTENT
    </div>
    <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
      <a href="#" className="hover:text-black transition-colors">
        Data
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Policy
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Debate
      </a>
    </nav>
  </div>
);

const MockChartSingapore = () => (
  <div className="w-full h-64 bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-center text-sm text-gray-500 mt-5 shadow-inner">
    {/* 원본 ChartSingapore 컴포넌트의 Placeholder */}
    <div className="text-center">
      <p className="font-semibold text-gray-700">차트 영역 Placeholder</p>
      <p>싱가포르 노동시장 구성 비율 데이터 시각화</p>
    </div>
  </div>
);

// 버튼 템플릿: whileHover를 이용해 상호작용 효과 적용
const MockButton = ({ children, className }) => (
  <motion.div
    className={`py-3 px-8 rounded-full text-white cursor-pointer text-sm font-semibold tracking-wide flex items-center justify-center space-x-2 shadow-lg mb-3 ${className}`}
    whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)" }}
    whileTap={{ scale: 0.98 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 10,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
  >
    {children}
  </motion.div>
);

const MockArticleButton = ({ url }) => (
  <MockButton className="bg-gradient-to-r from-blue-500 to-teal-600 w-full">
    <span>관련 기사 바로가기</span>
  </MockButton>
);

const MockFieldsButton = () => {
  const router = useRouter();
  return (
    <MockButton
      className="bg-gradient-to-r from-gray-700 to-gray-900 w-full"
      onClick={() => router.back()}
    >
      <span>다른 도시 보기</span>
    </MockButton>
  );
};

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
      staggerChildren: 0.1, // 요소들이 순차적으로 나타나는 시간 간격 증가
      ease: appleEase,
    },
  },
};

const itemVariants = {
  initial: { y: 30, opacity: 0, scale: 0.99 }, // 스케일 변화 최소화
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8, // 애니메이션 지속 시간
      ease: appleEase,
    },
  },
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.5, // 이미지 진입 애니메이션은 더 길게
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
    <div className="h-full min-h-screen flex flex-col bg-white">
      <Header />
      <motion.div
        className="px-[5%] lg:flex gap-x-14 w-full flex-1 max-w-8xl 2xl:mx-auto"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Left Column - Chart and Text/Buttons */}
        <motion.div
          className="flex-2 lg:flex flex-col justify-around py-5 h-full"
          variants={containerVariants}
        >
          {/* Chart Block */}
          <motion.div variants={containerVariants}>
            <motion.p
              className="font-bold text-3xl mt-10 lg:mt-0 tracking-tight text-gray-800"
              variants={itemVariants}
            >
              싱가포르 노동시장 내국인/외국인 구성 비율
            </motion.p>
            <motion.p
              className="font-semibold text-xl text-gray-600 mt-1"
              variants={itemVariants}
            >
              Share of Local vs Foreign Workers In Singapore
            </motion.p>
            <motion.p
              className="text-right text-xs mt-5 leading-[1.1] text-gray-400"
              variants={itemVariants}
            >
              {/* 데이터 출처 */}
              {`Singapore Ministry of Manpower, Foreign Workforce Nubmers / data.gov.sg(2024)`}
            </motion.p>
            <motion.div variants={itemVariants}>
              <ChartSingapore />
            </motion.div>
          </motion.div>

          {/* Text & Button Block */}
          <motion.div
            className="lg:flex gap-x-10 mt-10"
            variants={containerVariants}
          >
            <div className="flex-1">
              <motion.h1
                className="text-5xl font-extrabold tracking-tighter text-gray-900 leading-[1.1]"
                variants={itemVariants}
              >
                IN <br />
                SINGAPORE
              </motion.h1>
              <motion.p
                className=" mt-4 leading-relaxed text-gray-700"
                variants={itemVariants}
              >
                싱가포르는 외국인 노동 없이는 산업이 돌아가기 어렵다고 말합니다.
                그러나 정부는 동시에 내국인 일자리를 보호하기 위한 제도적
                안전장치를 강조합니다.
                <br />
                총리와 노동부 장관은 '외국인은 필수지만, 균형이 필요하다'고
                밝혔습니다. 반면 야당은 저숙련 일자리가 외국인에게 고착화될 수
                있다는 우려를 제기했습니다.
              </motion.p>
            </div>
            <div className="flex-1 mt-8 lg:mt-0">
              <motion.p
                className="leading-relaxed text-gray-500 italic"
                variants={itemVariants}
              >
                Singapore acknowledges that industries cannot run without
                foreign workers. Yet the government stresses safeguards to
                protect local jobs. Leaders emphasize balance, while the
                opposition warns of low-skill jobs becoming fixed for
                foreigners.
              </motion.p>
              <motion.div className="mt-10" variants={itemVariants}>
                <div
                  onClick={() =>
                    window.open(
                      "https://www.kmcn.kr/news/article.html?no=8569",
                      "_blank"
                    )
                  }
                >
                  <MockArticleButton url="" />
                </div>
                <div onClick={() => router.back()}>
                  <MockFieldsButton />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className="flex-1 py-[5vh] flex flex-col"
          variants={containerVariants}
        >
          <motion.div
            variants={imageVariants}
            className="rounded-3xl overflow-hidden flex-1 shadow-2xl"
          >
            {/* Apple 느낌을 위해 이미지 대신 더미 placeholder 이미지 사용 */}
            <img
              src="/singapore.jpg"
              alt="singapore"
              className="w-full h-full object-cover"
              style={{ minHeight: "400px" }}
            />
          </motion.div>

          {/* Image Caption */}
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-sm text-right mt-3 text-gray-500"
              variants={itemVariants}
            >
              싱가포르 도심 해안 지역에서 진행중인 'NS Square' 개발 현장
            </motion.p>
            <motion.p
              className="text-xs leading-[1.1] text-right text-gray-400"
              variants={itemVariants}
            >
              Ongoing construction of the "NS Square" development in Singapore's
              downtown watefront
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
