"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/app/zz_components/Header";
import { useRouter } from "next/navigation";

// ===============================================
// MOCK COMPONENTS (단일 파일 구성을 위해 임시로 모킹됨)
// Header, ArticleButton, FieldsButton은 원본 파일에서 import되지만, 여기서는 모킹합니다.
// ===============================================

const MockHeader = () => (
  <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
    <div className="font-bold text-xl tracking-tighter text-gray-800">
      ULSAN/ULJIN CONTENT
    </div>
    <nav className="space-x-4 text-sm text-gray-600 hidden sm:block">
      <a href="#" className="hover:text-black transition-colors">
        Ulsan
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Uljin
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Policy
      </a>
    </nav>
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
  <MockButton className="bg-gradient-to-r from-blue-500 to-teal-600 w-full lg:w-auto mx-auto">
    <span>관련 기사 바로가기</span>
  </MockButton>
);

const MockFieldsButton = () => (
  <MockButton className="bg-gradient-to-r from-gray-700 to-gray-900 w-full lg:w-auto mx-auto">
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
      staggerChildren: 0.1, // 요소들이 순차적으로 나타나는 시간 간격
      ease: appleEase,
    },
  },
};

const itemVariants = {
  initial: { y: 30, opacity: 0, scale: 0.99 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
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
      duration: 1.5,
      ease: appleEase,
    },
  },
};

// ===============================================
// MAIN COMPONENT (메인 컴포넌트 - Ulsan/Uljin 구조 적용)
// ===============================================

export default function App() {
  const router = useRouter();
  return (
    <div className="h-full min-h-screen flex-col flex bg-white">
      <Header />

      <motion.div
        className="px-[5%] lg:flex items-center gap-x-14 w-full flex-1  py-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Left Column: Ulsan Image & Text */}
        <motion.div
          className="flex-1 mb-10 lg:mb-0"
          variants={containerVariants}
        >
          <motion.div
            variants={imageVariants}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              // Placeholder 이미지 사용
              src="/ulsan2.jpeg"
              alt="ulsan"
              className="w-full h-[50vh] object-cover"
            />
          </motion.div>

          <motion.p
            className="text-sm mt-3 text-gray-600"
            variants={itemVariants}
          >
            외국인 노동자들이 건설 현장에서 작업 중인 모습
          </motion.p>
          <motion.p
            className="text-sm text-gray-500 italic"
            variants={itemVariants}
          >
            Foreign workers engaged in construction site tasks
          </motion.p>

          <motion.p
            className="text-2xl font-bold mt-5 text-gray-900"
            variants={itemVariants}
          >
            외국인 숙련공의 참여
          </motion.p>
          <motion.p
            className="text-md leading-relaxed text-gray-700"
            variants={itemVariants}
          >
            울산 건설업 현장에서는 숙련된 외국인 노동자가 일부 공정에서 인력
            수급을 보완하며 산업 운명에 기여하고 있습니다.
          </motion.p>
        </motion.div>

        {/* Center Column: Main Title & Context */}
        <motion.div
          className="flex-2 text-center my-10 lg:my-0"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl font-extrabold tracking-tighter text-gray-900 leading-[1.1]"
            variants={itemVariants}
          >
            IN
            <br />
            ULSAN / UNJIN
          </motion.h1>
          <motion.p
            className="mt-5 leading-relaxed text-lg text-gray-700"
            variants={itemVariants}
          >
            울산의 조선업 현장에서는 외국인 숙련공들이 인력 수급의 한 축을
            담당하고 있는 반면, 울진의 원자력 산업은 특수성과 규제 요인으로
            외국인 고용이 제한적입니다. 이러한 차이는 각 산업의 특성과 제도적
            조건을 보여주며, 향후 인력 정책에 중요한 시사접을 줍니다.
          </motion.p>
          <motion.p
            className="mt-5 leading-relaxed text-gray-500 italic"
            variants={itemVariants}
          >
            In Ulsan's shipbuildling sector, foreign skilled workers play a part
            in meeting labor demand, while in Uljin's nuclear industry,
            employment for foreigners remains limited due to its specific nature
            and regulatory factors. These differences highlight how industry
            characteristics and institutional conditions shape workforce
            composition, offering important implications for future labor
            policies.
          </motion.p>

          <motion.div className="mt-10" variants={itemVariants}>
            <div
              onClick={() =>
                window.open(
                  "https://www.kmcn.kr/news/article.html?no=8522",
                  "_blank"
                )
              }
            >
              <MockArticleButton />
            </div>
            <div onClick={() => router.back()}>
              <MockFieldsButton />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Uljin Image & Text */}
        <motion.div
          className="flex-1 text-right mt-10 lg:mt-0"
          variants={containerVariants}
        >
          <motion.div
            variants={imageVariants}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              // Placeholder 이미지 사용
              src="/ulsan1.png"
              alt="ulsan"
              className="w-full h-[50vh] object-cover"
            />
          </motion.div>

          <motion.p
            className="text-sm mt-3 text-gray-600"
            variants={itemVariants}
          >
            울진 한울원자력발전소 전경
          </motion.p>
          <motion.p
            className="text-sm text-gray-500 italic"
            variants={itemVariants}
          >
            자료: Korea Ulchin NPP, IAEA Imagebank
          </motion.p>

          <motion.p
            className="text-2xl font-bold mt-5 text-gray-900"
            variants={itemVariants}
          >
            산업 특성과 규제의 영향
          </motion.p>
          <motion.p
            className="text-md leading-relaxed text-gray-700"
            variants={itemVariants}
          >
            울진 원자력 산업은 높은 안전 기준과 제도적 요건으로 인해 외국인
            고용비중이 상대적으로 제한적입니다.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
