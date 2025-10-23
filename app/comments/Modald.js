"use client";

import { useState } from "react";
import { supabase } from "@/app/zz_components/supabase";
import { useRouter } from "next/navigation";

const Modald = ({ onClose, type, password, setPassword, commentPw, id }) => {
  const [deleteConfirmPage, setDeleteConfirmPage] = useState(false);
  const [wrongPw, setWrongPw] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const onConfirmClick = () => {
    if (commentPw === password) {
      setDeleteConfirmPage(true);
      setPassword("");
    } else {
      setWrongPw(true);
    }
  };

  const onDeleteClick = async () => {
    setDeleting(true);
    const { data } = await supabase
      .from("z_interactive_2025")
      .delete()
      .eq("id", id);
    setDeleting(false);
    alert("의견이 삭제되었습니다.");
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/50 bg-opacity-50 flex justify-center items-center z-[9999999999]">
      <div className="bg-white p-5 rounded-lg shadow-md text-center w-[300px] font-[Paperlogy-4Regular] leading-relaxed">
        {type === "password" && (
          <>
            {deleteConfirmPage ? (
              <>
                <p>댓글을 삭제하시겠습니까?</p>
                <button
                  onClick={onClose}
                  className="w-4/5 py-2 mt-4 rounded-lg bg-gray-300 text-black font-[Paperlogy-4Regular] hover:bg-gray-400 transition"
                >
                  취소
                </button>
                <button
                  disabled={deleting}
                  onClick={onDeleteClick}
                  className="w-4/5 py-2 mt-2 rounded-lg bg-black text-white font-[Paperlogy-4Regular] hover:bg-gray-800 transition disabled:bg-gray-400"
                >
                  삭제
                </button>
              </>
            ) : (
              <>
                <p>댓글을 삭제하시려면 비밀번호를 입력해주세요.</p>
                <input
                  value={password}
                  onChange={(e) => {
                    setWrongPw(false);
                    setPassword(e.target.value);
                  }}
                  className="mt-5 w-4/5 px-3 py-1.5 border border-black rounded-lg font-[Paperlogy-4Regular] outline-none focus:ring-2 focus:ring-black"
                />
                {wrongPw && (
                  <p className="text-xs text-red-500 mt-1">
                    비밀번호가 틀렸습니다.
                  </p>
                )}
                <button
                  onClick={onClose}
                  className="w-4/5 py-2 mt-4 rounded-lg bg-gray-300 text-black font-[Paperlogy-4Regular] hover:bg-gray-400 transition"
                >
                  취소
                </button>
                <button
                  onClick={onConfirmClick}
                  className="w-4/5 py-2 mt-2 rounded-lg bg-black text-white font-[Paperlogy-4Regular] hover:bg-gray-800 transition"
                >
                  확인
                </button>
              </>
            )}
          </>
        )}

        {type === "success" && (
          <>
            <p>{`성공적으로 의견이 업로드되었습니다.\n의견을 내주셔서 감사합니다.`}</p>
            <button
              onClick={onClose}
              className="mt-5 w-full py-2 rounded-lg bg-black text-white font-[Paperlogy-4Regular] hover:bg-gray-800 transition"
            >
              확 인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modald;
