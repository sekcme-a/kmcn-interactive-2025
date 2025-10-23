"use client";

import CommentItem from "./CommentItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/app/zz_components/supabase";
import Modald from "./Modald";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("z_interactive_2025")
        .select("*")
        .order("created_at", { ascending: false });
      setComments(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const onSendClick = async () => {
    setUploading(true);
    if (name.length > 10) alert("이름은 10글자 이내여야합니다.");
    else if (password.length > 20) alert("비밀번호는 20글자 이내여야 합니다.");
    else if (comment.length > 200) alert("의견은 200글자 이내여야 합니다.");
    else {
      const { error } = await supabase.from("z_interactive_2025").insert({
        name,
        password,
        comment,
        selectedCharacter,
      });
      if (error) alert("알수없는 오류로 의견을 남기실 수 없습니다.");
      else {
        setOpenSuccessModal(true);
        setComments((prev) => [
          {
            name,
            password,
            comment,
            selectedCharacter,
            created_at: new Date(),
          },
          ...prev,
        ]);
        setName("");
        setPassword("");
        setSelectedCharacter(1);
        setComment("");
      }
    }
    setUploading(false);
  };

  return (
    <div>
      {/* comments */}
      <div className="h-[40vh] overflow-y-scroll px-[10px] mt-5 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 rounded-lg">
        {loading && (
          <p className="text-center text-sm font-[Paperlogy-4Regular] mt-8">
            의견을 받아오는 중입니다..
          </p>
        )}
        {comments.map((item, index) => (
          <div key={index}>
            <CommentItem data={item} left={index % 2 === 0} />
          </div>
        ))}
      </div>

      {/* separator */}
      <div className="flex items-center w-full mt-[50px]">
        <p className="font-[Paperlogy-8ExtraBold] text-base">의견 남기기</p>
        <div className="flex-1 ml-5 h-px bg-black"></div>
      </div>

      {/* character selection */}
      <div className="flex my-5">
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCharacter(item)}
            className={`relative w-[50px] aspect-square rounded-full overflow-hidden border border-black mr-2 cursor-pointer duration-500 ${
              item === selectedCharacter
                ? "border-blue-800 border-[3px]"
                : "hover:bg-gray-200 bg-white"
            }`}
          >
            <Image
              src={`/emoji/00${item}.png`}
              alt="캐릭터"
              fill
              className="object-cover p-1.5 bg-white"
            />
          </div>
        ))}
      </div>

      {/* name input */}
      <div className="flex items-center bg-gray-200 rounded-lg mb-2 px-3 py-1.5">
        <p className="mr-2 text-sm w-[100px] font-[Paperlogy-8ExtraBold]">
          이름 (닉네임)
        </p>
        <input
          className="flex-1 bg-transparent outline-none border-none text-[0.9rem] font-[Paperlogy-4Regular]"
          value={name}
          onChange={(e) => {
            if (e.target.value.length < 10) setName(e.target.value);
          }}
        />
      </div>

      {/* password input */}
      <div className="flex items-center bg-gray-200 rounded-lg mb-[2px] px-3 py-1.5">
        <p className="mr-2 text-sm w-[100px] font-[Paperlogy-8ExtraBold]">
          비밀번호
        </p>
        <input
          type="password"
          className="flex-1 bg-transparent outline-none border-none text-[0.9rem] font-[Paperlogy-4Regular]"
          value={password}
          onChange={(e) => {
            if (e.target.value.length < 20) setPassword(e.target.value);
          }}
        />
      </div>
      <p className="text-[0.7rem] mb-[10px] ml-[10px]">
        *자신이 작성한 의견을 삭제할 때 사용됩니다.
      </p>

      {/* comment input */}
      <div className="flex items-center bg-gray-200 rounded-lg px-3 py-1.5 mb-3">
        <p className="mr-2 text-sm w-[100px] font-[Paperlogy-8ExtraBold]">
          의견 입력
        </p>
        <textarea
          className="flex-1 bg-transparent outline-none border-none resize-none text-[0.9rem] font-[Paperlogy-4Regular] h-40"
          value={comment}
          onChange={(e) => {
            if (e.target.value.length < 200) setComment(e.target.value);
          }}
        />
      </div>

      {/* send button */}
      <div
        className={`px-3 py-2 rounded-lg mt-5 text-white cursor-pointer ${
          uploading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
        onClick={onSendClick}
      >
        <p className="text-center text-base font-[Paperlogy-8ExtraBold]">
          의견 남기기
        </p>
      </div>

      {openSuccessModal && (
        <Modald onClose={() => setOpenSuccessModal(false)} type="success" />
      )}
    </div>
  );
};

export default Comment;
