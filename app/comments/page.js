"use client";

import { useRouter } from "next/navigation";
import ArticleButton from "../story/ArticleButton";
import Header from "../zz_components/Header";
import Comment from "./Comment";

export default function Comments() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 lg:flex items-center mx-[5%] gap-x-10 pb-10">
        <div className="flex-1">
          <Comment />
        </div>

        <div className="flex-1 mt-16 lg:mt-0">
          <h1 className="text-5xl font-bold">
            SHARE YOUR
            <br /> THOUGHTS
          </h1>
          <h2 className="text-4xl mt-5 font-bold">의견 남기기</h2>

          <div className="flex justify-end mt-10">
            <ArticleButton
              url="/"
              nod
              text="처음으로 돌아가기"
              onClick={() => {
                localStorage.removeItem("home-scroll"); // 이전 예시에서 쓰던 키와 동일하게
                router.push("/");
              }}
            />
          </div>

          <div className="mt-10">
            <img src="kpf_logo.png" alt="kpf" className="w-64" />
            <p className="mt-3">
              본 기획물은 정보광고 수수료로 조성된 언론진흥기금의 지원을
              받았습니다.
            </p>
            <p>
              This feature was produced with support from the Press Promotion
              Fund, financed by government advertising fees.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-2 text-lg">
            {/* 프로필 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
              />
            </svg>
            <span>강성혁, 소혜련, 김관섭 기자</span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-lg">
            {/* 이메일 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75l-9.75 7.5-9.75-7.5m19.5 10.5V6.75a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25z"
              />
            </svg>
            <span>sdjebo@naver.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
