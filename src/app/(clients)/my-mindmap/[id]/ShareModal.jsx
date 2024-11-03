"use client";

import React, { useEffect, useState } from 'react';
import Private from './Private';
import Public from './Public';
import { toast } from "react-toastify";
import { IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { handleSaveShare } from '@/app/utils/actions_share';

export default function ShareModal({ mindmap, setShowModal }) {
  const [shareType, setShareType] = useState("private");

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    })
  }, [setShowModal])

  useEffect(() => {
    if (mindmap.mode === "public") {
      setShareType("public");
    }
  }, []);

  return (
    <form
      action={async (formData) => {
        await handleSaveShare(formData, mindmap.id);
        toast.success("Đã lưu thành công");
      }}
    >
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-gray-900 opacity-75"
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div
              className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center share-option">
                  <div className="flex items-center mr-4 mb-4">
                    <input
                      id="radio1"
                      type="radio"
                      name="mode"
                      className="hidden"
                      checked={shareType === "private"}
                      onChange={() => setShareType("private")}
                      value="private"
                    />
                    <label
                      htmlFor="radio1"
                      className="flex items-center cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 inline-block mr-1 rounded-full border border-grey ${shareType === "private" ? "bg-blue-500" : "bg-white"
                          }`}
                      />
                      Riêng tư
                    </label>
                  </div>
                  <div className="flex items-center mr-4 mb-4">
                    <input
                      id="radio2"
                      type="radio"
                      name="mode"
                      className="hidden"
                      checked={shareType === "public"}
                      onChange={() => setShareType("public")}
                      value="public"
                    />
                    <label
                      htmlFor="radio2"
                      className="flex items-center cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 inline-block mr-1 rounded-full border border-grey ${shareType === "public" ? "bg-blue-500" : "bg-white"
                          }`}
                      />
                      Công khai
                    </label>
                  </div>
                </div>
                {shareType === "private" ? (
                  <Private {...mindmap} />
                ) : (
                  <Public {...mindmap} />
                )}
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <IoMdClose /> Đóng
                  </div>
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaPlus /> Lưu lại
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
