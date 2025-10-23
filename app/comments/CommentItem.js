"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modald from "./Modald";

const CommentItem = ({ data, left }) => {
  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("");

  const images = ["", "001.png", "002.png", "003.png", "004.png"];

  const formatToDateTime = (input) => {
    const date = typeof input === "string" ? new Date(input) : input;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const CommentLayout = ({ isLeft }) => (
    <div
      className="flex items-center py-2 cursor-pointer"
      onClick={() => setOpenModal(true)}
    >
      {isLeft && (
        <div className="w-[50px] min-w-[50px] aspect-square rounded-full overflow-hidden border-[1.5px] border-black relative">
          <Image
            src={`/emoji/${images[data.selectedCharacter]}`}
            alt="캐릭터"
            fill
            className="object-cover p-1.5 bg-white"
          />
        </div>
      )}

      <div className={`flex-1 ${isLeft ? "ml-2" : "mr-2"} text-left`}>
        <p className="leading-tight font-[Paperlogy-4Regular] text-[0.9rem] break-keep">
          <strong className="font-[Paperlogy-8ExtraBold] text-[1rem]">
            {data.name} |
          </strong>{" "}
          {data.comment}
        </p>
        <p className="text-[0.55rem] mt-[2px] ml-[2px] opacity-80">
          {formatToDateTime(data.created_at)}
        </p>
      </div>

      {!isLeft && (
        <div className="w-[50px] min-w-[50px] aspect-square rounded-full overflow-hidden border-[1.5px] border-black relative">
          <Image
            src={`/character/${images[data.selectedCharacter]}`}
            alt="캐릭터"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      <CommentLayout isLeft={left} />

      {openModal && (
        <Modald
          onClose={() => {
            setOpenModal(false);
            setPassword("");
          }}
          type="password"
          {...{ password, setPassword }}
          commentPw={data.password}
          id={data.id}
        />
      )}
    </>
  );
};

export default CommentItem;
