"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ArticleButton from "../story/ArticleButton";
// 현재 리스트는 변함 없음
const LIST = [
  {
    title: "싱가포르",
    subtitle: "Singapore",
    content_kr: "외국인은 필수, 그러나 안전장치는?",
    content_en: "Foreign Workers Are Essential, but What About Safeguards?",
    thumbnail: "/thumbnail1.png",
    video: "/singapore.mp4",
    url: "/story/singapore",
  },
  {
    title: "캐나다",
    subtitle: "Canada",
    content_kr: "포르투갈계 노동자 팀 문화",
    content_en: "Team Culture of Portuguese Workers",
    thumbnail: "/thumbnail2.png",
    video: "/canada.mp4",
    url: "/story/canada",
  },
  {
    title: "부산",
    subtitle: "Busan",
    content_kr: "외국인 주민, 지역 속으로",
    content_en: "Foreign Residents Becoming Part of the Community",
    thumbnail: "/thumbnail3.png",
    video: "/busan.mp4",
    url: "/story/busan",
  },
  {
    title: "울산/울진",
    subtitle: "Ulsan & Uljin",
    content_kr: "의존과 배제, 두 산업의 현실",
    content_en: "Reliance and Exclusion: The Reality of Two Industries",
    thumbnail: "/thumbnail4.png",
    video: "/ulsan.mp4",
    url: "/story/ulsan",
  },
];
// 🍏 Apple 스타일의 부드러운 Spring 트랜지션
const APPLE_SPRING_TRANSITION = {
  type: "spring",
  stiffness: 250,
  damping: 28,
  mass: 0.8,
};
// 텍스트/콘텐츠의 부드러운 등장/퇴장 애니메이션 variants
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};
export default function Section4() {
  const router = useRouter();
  const ref = useRef(null);
  const [visibleKey, setVisibleKey] = useState(0);
  const [selected, setSelected] = useState(null);
  // Intersection Observer로 카드 리스트 등장 애니메이션 관리
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleKey((prev) => prev + 1);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  // 상세 뷰가 열릴 때 스크롤 잠금/해제
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);
  return (
    <div
      ref={ref}
      className="relative pt-10 px-[5%] overflow-hidden lg:h-[90%]"
    >
      <div key={visibleKey} className="h-full">
        <div className="lg:flex justify-between w-full  mb-10 lg:mb-5">
          <h4 className="text-4xl font-extrabold">STORIES FROM THE FIELD</h4>
          <div>
            <p className="mt-4 lg:mt-0 text-sm text-right">
              {`각 현장의 목소리를 짧은 영상과 기사 카드로 소개합니다. `}
              <br className="hidden lg:block" />
              클릭해 더 깊은 이야기를 확인하세요.
            </p>

            <ArticleButton text="의견 남기기" url="/comments" nod />
          </div>
        </div>
        {/* 카드 리스트 컨테이너 - Depth 효과를 위해 motion으로 감싸줍니다. */}
        <motion.ul
          className="grid lg:grid-cols-4 gap-x-10 gap-y-10 perspective-[1200px] "
          // 상세 뷰가 열릴 때, 나머지 카드들이 뒤로 밀리는 듯한 효과(Depth) 추가
          animate={{
            scale: selected !== null ? 0.9 : 1,
            opacity: selected !== null ? 0.8 : 1,
            filter: selected !== null ? "blur(4px)" : "blur(0px)",
            pointerEvents: selected !== null ? "none" : "auto",
          }}
          transition={APPLE_SPRING_TRANSITION}
        >
          {LIST.map((item, index) => (
            <CardItem
              key={index}
              item={item}
              index={index}
              setSelected={setSelected}
              APPLE_SPRING_TRANSITION={APPLE_SPRING_TRANSITION}
            />
          ))}
        </motion.ul>
      </div>
      {/* 🌟 상세 보기 오버레이 🌟 */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            // 배경 클릭 시 닫기
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              layoutId={`card-container-${selected}`}
              // 🌟 반응형 컨테이너:
              // 모바일(기본): w-full, h-full, rounded-none, shadow-none (화면 전체)
              // 데스크톱(md: 이상): w-[85%], h-[80vh], max-w-6xl, rounded-2xl, shadow-2xl
              className="flex flex-col md:flex-row 
                   w-full h-full rounded-none shadow-none 
                   md:w-[65%] md:h-[80vh] md:max-w-6xl md:rounded-2xl md:shadow-2xl
                   overflow-hidden bg-black text-white cursor-default relative"
              transition={APPLE_SPRING_TRANSITION}
              // 오버레이 애니메이션은 유지
              initial={{ scale: 0.95, opacity: 0 }} // 모바일 scale 시작점을 0.95로 조정하여 자연스럽게
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Close Button: 위치는 고정, z-index 높게 */}
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={APPLE_SPRING_TRANSITION}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              {/* 🌟 비디오 영역: 모바일에서는 전체, 데스크톱에서는 1/2 */}
              <motion.div
                // 모바일(기본): w-full, h-full (텍스트가 오버레이 됨)
                // 데스크톱(md: 이상): w-1/2, h-full
                className="h-full aspect-[405/720]  relative"
              >
                <motion.video
                  key={LIST[selected].video}
                  src={LIST[selected].video}
                  autoPlay
                  muted
                  controls
                  loop
                  // playsInline
                  className="h-full aspect-[405/720] object-cover"
                  layoutId={`image-${selected}`}
                  transition={APPLE_SPRING_TRANSITION}
                />

                {/* 🌟 모바일 오버레이 텍스트: 데스크톱에서는 숨기고, 모바일에서만 표시 */}
                <motion.div
                  // 모바일(기본): absolute bottom-0, 텍스트 오버레이 스타일 적용
                  // 데스크톱(md: 이상): hidden (데스크톱 텍스트 영역을 사용)
                  className="md:hidden absolute bottom-0 w-full p-6 pb-12 flex flex-col bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white z-10"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ ...APPLE_SPRING_TRANSITION, delay: 0.15 }}
                >
                  <h2 className="text-3xl font-extrabold mb-2 leading-snug">
                    {LIST[selected].title}
                  </h2>
                  <h3 className="text-xl mb-4 text-gray-300">
                    {LIST[selected].subtitle}
                  </h3>
                  <p className="text-base line-clamp-2 leading-relaxed mb-4">
                    {LIST[selected].content_kr}
                  </p>
                  <motion.button
                    onClick={() => router.push(LIST[selected].url)}
                    className="self-start border border-white/50 px-6 py-2 cursor-pointer rounded-full hover:bg-white hover:text-black transition-all text-base font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={APPLE_SPRING_TRANSITION}
                  >
                    자세히 보기
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* 🌟 데스크톱 텍스트 영역: 모바일에서는 숨기고, 데스크톱에서만 표시 */}
              <motion.div
                // 모바일(기본): hidden
                // 데스크톱(md: 이상): w-1/2, p-10, flex
                className="hidden md:flex-1 md:p-10 md:flex flex-col justify-center"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ ...APPLE_SPRING_TRANSITION, delay: 0.15 }} // 카드 확장 후 텍스트 등장
              >
                <h2 className="text-5xl font-extrabold mb-4">
                  {LIST[selected].title}
                </h2>
                <h3 className="text-2xl mb-6 text-gray-300">
                  {LIST[selected].subtitle}
                </h3>
                <p className="text-lg mb-4 leading-relaxed">
                  {LIST[selected].content_kr}
                </p>
                <p className="text-md text-gray-400 leading-relaxed border-t border-white/20 pt-4 mt-4">
                  {LIST[selected].content_en}
                </p>
                <motion.button
                  onClick={() => router.push(LIST[selected].url)}
                  className="mt-10 self-start border border-white/50 px-8 py-2 cursor-pointer rounded-full hover:bg-white hover:text-black transition-all text-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={APPLE_SPRING_TRANSITION}
                >
                  자세히 보기
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 카드를 별도의 컴포넌트로 분리하여 가독성과 상태 관리를 개선합니다.
function CardItem({ item, index, setSelected, APPLE_SPRING_TRANSITION }) {
  const [isHovered, setIsHovered] = useState(false); // Parallax를 위한 호버 상태

  return (
    <motion.li
      key={index}
      className="cursor-pointer relative rounded-xl h-[65vh] shadow-2xl bg-white flex flex-col transition"
      // 🌟 개선된 등장 애니메이션 (3D 플립 인) 🌟
      initial={{
        opacity: 0,
        y: 100,
        rotateX: 45,
        scale: 0.9,
        transformOrigin: "bottom center",
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15, // 지연 시간 조정
      }}
      onClick={() => setSelected(index)}
      style={{ overflow: "hidden", perspective: 1200 }}
      // 🌟 기존의 3D 회전 마우스 무브/리브 핸들러 🌟
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * 40; // -6 ~ +6도
        const rotateX = -(y / rect.height - 0.5) * 20; // -4 ~ +4도
        e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      }}
      onMouseEnter={() => setIsHovered(true)} // 호버 상태 업데이트
      onMouseLeave={(e) => {
        setIsHovered(false); // 호버 상태 업데이트
        e.currentTarget.style.transform =
          "rotateX(0deg) rotateY(0deg) scale(1)";
      }}
    >
      <motion.img
        src={item.thumbnail}
        alt={item.title}
        className="flex-1 w-full object-cover rounded-t-xl overflow-hidden"
        // 🌟 Parallax 효과 - 이미지를 반대 방향으로 살짝 움직이게 🌟
        animate={{
          x: isHovered ? "-3%" : "0%",
          y: isHovered ? "3%" : "0%",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={APPLE_SPRING_TRANSITION}
      />
      <motion.div
        className="p-4 text-center"
        // 🌟 Parallax 효과 - 텍스트도 다른 방향으로 살짝 움직이게 🌟
        // animate={{
        //   x: isHovered ? "2%" : "0%",
        //   y: isHovered ? "-2%" : "0%",
        // }}
        // transition={APPLE_SPRING_TRANSITION}
      >
        <p className="font-bold text-xl">{item.title}</p>
        <p className="font-semibold text-gray-600">{item.subtitle}</p>
        <p className="mt-3 text-sm">{item.content_kr}</p>
        <p className="mt-3 text-sm">{item.content_en}</p>
      </motion.div>
    </motion.li>
  );
}
