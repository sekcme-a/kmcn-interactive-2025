"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/app/zz_components/Header";
import { useRouter } from "next/navigation";

// ===============================================
// MOCK COMPONENTS (단일 파일 구성을 위해 임시로 모킹됨)
// ===============================================

const MockHeader = () => (
  <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
    <div className="font-bold text-xl tracking-tighter text-gray-800">
      BUSAN CONTENT
    </div>
    <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
      <a href="#" className="hover:text-black transition-colors">
        Overview
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Issues
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Integration
      </a>
    </nav>
  </div>
);

// ChartSingapore는 부산 컨텐츠에 필요 없으므로 주석 처리하거나 제거 (여기서는 제거)
// const MockChartSingapore = () => ( ... );

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
  <MockButton className="bg-gradient-to-r from-blue-500 to-teal-600 w-full lg:w-auto">
    <span>관련 기사 바로가기</span>
  </MockButton>
);

const MockFieldsButton = () => (
  <MockButton className="bg-gradient-to-r from-gray-700 to-gray-900 w-full lg:w-auto">
    <span>다른 도시 보기</span>
  </MockButton>
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
// MAIN COMPONENT (메인 컴포넌트 - Busan 구조 적용)
// ===============================================

export default function App() {
  const router = useRouter();
  const featureCards = [
    {
      title: "고령화와 노동력 공백",
      subtitle: "Aging Population and Labor Shortage",
      content:
        "부산은 2024년 65세 이상이 23.5%로 고령화가 빠르게 진행 중이며, 중장기적으로 생산가능인구 감소가 예상됩니다. 현장에는 인력 공백 우려가 커지고 있습니다.",
    },
    {
      title: "외국인 노동자 비중 증가",
      subtitle: "Rising Share of Foreign Workers",
      content:
        "전국적으로 건설업 외국인 비중이 약 15%까지 상승했고, 부산도 외국인 주민 기반 확대가 나타납니다. 현장 핵심 공정에서 외국인 숙련 인력이 늘며 인력 수급을 뒷받침하고 있습니다.",
    },
    {
      title: "지역사회 적응 과제",
      subtitle: "Challenges of Community Integration",
      content:
        "외국인 인력 확대는 산업 유지에 기여하지만, 언어/안전/정착 지원 등 현장 관리 과제가 병존합니다. 제도적/현장적 보완이 필요합니다.",
    },
  ];

  return (
    <div className="h-full min-h-screen flex-col flex ">
      <Header />
      <motion.div
        className="lg:flex mt-10 lg:mt-0 flex-col justify-around flex-1  w-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Top Section: Image and Main Text */}
        <motion.div
          className="lg:flex gap-x-10 mx-[5%] "
          variants={containerVariants}
        >
          {/* Image Block */}
          <motion.div className="flex-1" variants={containerVariants}>
            <motion.div
              variants={imageVariants}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                // Placeholder 이미지 사용
                src="/busan.png"
                alt="busan"
                className="w-full object-cover"
                style={{ height: "40vh" }}
              />
            </motion.div>

            <motion.p
              className="mt-3 text-xs leading-[1.3] text-right text-gray-600"
              variants={itemVariants}
            >
              {`부산 건설 현장에서 아침 TBM(Tool Box Meeting)을 진행하는 모습. 안전 교육과 작업 지시가 함께 이뤄지고 있다.`}
            </motion.p>
            <motion.p
              className="text-xs leading-[1.3] text-right text-gray-400"
              variants={itemVariants}
            >
              {`A morning Tool Box Meeting(TBM) at a construction site in Busan, where safely briefings and work instructions are delivered`}
            </motion.p>
          </motion.div>

          {/* Text and Button Block */}
          <motion.div
            className="flex-1 lg:flex flex-col justify-around h-full mt-10 lg:mt-0"
            variants={containerVariants}
          >
            <motion.h1
              className="text-5xl font-extrabold tracking-tighter text-gray-900 leading-[1.1]"
              variants={itemVariants}
            >
              IN BUSAN
            </motion.h1>
            <motion.p
              className="leading-[1.3] mt-5 text-lg text-gray-700"
              variants={itemVariants}
            >
              부산은 고령화로 인한 노동력 부족과 외국인 노동자 비중 확대가
              동시에 나타나는 도시입니다. 산업 유지에는 도움이 되지만, 지역사회
              적응 문제는 여전히 과제로 남아있습니다.
            </motion.p>
            <motion.p
              className="leading-[1.3] mt-3 text-gray-500 italic"
              variants={itemVariants}
            >
              Busan is a city facing both labor shortages due to an aging
              population and a growing share of foreign workers. While this
              helps sustain local industries, challenges of community
              integration remain unresolved.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants}>
              <div
                className="lg:flex justify-end mt-8"
                onClick={() =>
                  window.open(
                    "https://www.kmcn.kr/news/article.html?no=8394",
                    "_blank"
                  )
                }
              >
                <MockArticleButton url="" />
              </div>
              <div
                className="lg:flex justify-end"
                onClick={() => router.back()}
              >
                <MockFieldsButton />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Feature Cards */}
        <motion.div
          className="lg:flex gap-x-6 mx-[5%] mt-10 lg:mt-0"
          variants={containerVariants}
        >
          {featureCards.map((item, index) => (
            <motion.div
              className="flex-1 px-6 py-2 bg-gray-50 rounded-xl shadow-md border border-gray-100 mb-6 lg:mb-0"
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.p
                className="font-bold text-xl text-gray-900"
                variants={itemVariants}
              >
                {item.title}
              </motion.p>
              <motion.p
                className="font-semibold text-lg text-gray-600 mb-2"
                variants={itemVariants}
              >
                {item.subtitle}
              </motion.p>
              <motion.p
                className="mt-3 text-md leading-relaxed text-gray-700"
                variants={itemVariants}
              >
                {item.content}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
