import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const appleEase = [0.25, 0.46, 0.45, 0.94];

export default function FieldsButton() {
  const router = useRouter();
  return (
    <motion.div
      onClick={() => router.back()}
      // onClick={() => router.push("/fields")}
      className="py-2 mt-2 px-8 rounded-full text-white cursor-pointer text-sm font-semibold tracking-wide
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
  );
}
