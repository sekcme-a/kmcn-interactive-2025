import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const appleEase = [0.25, 0.46, 0.45, 0.94];

export default function ArticleButton({
  url,
  text = "관련 기사 바로가기",
  nod = false,
  onClick,
}) {
  const router = useRouter();
  return (
    <motion.div
      onClick={() => {
        if (onClick) onClick();
        if (nod) router.push(url);
        else {
          window.open(
            url,
            "_blank" // 새 창 또는 새 탭
          );
        }
      }}
      className="py-2 mt-8 lg:mt-3 px-8 rounded-full text-white cursor-pointer text-sm font-semibold tracking-wide
              bg-gradient-to-r from-blue-500 to-purple-600 
              flex items-center justify-center space-x-2 w-full lg:w-auto shadow-lg"
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
      <span>{text}</span>
    </motion.div>
  );
}
