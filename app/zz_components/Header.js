"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div
      className="flex justify-between w-full items-center 
        py-4 border-b-[2px] border-black px-4 md:px-[5%]"
    >
      <div className="w-36 aspect-[4/1] relative">
        <Image
          src="/logo.png"
          fill
          className="object-contain cursor-pointer"
          alt="Logo"
          onClick={() => router.push("/")}
        />
      </div>
      <p className="font-semibold text-lg">2025</p>
    </div>
  );
}
