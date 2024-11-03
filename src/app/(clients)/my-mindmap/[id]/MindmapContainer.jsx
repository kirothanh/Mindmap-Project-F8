"use client"
import { IoIosSave } from "react-icons/io";
import { FaShareSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mindmap from "./Mindmap";
import ShareModal from "./ShareModal";

const mindmapApi = `${process.env.HOST_URL}/api/mindmap`;

export default function MindmapContainer({ mindmap, editable }) {
  const [mindmapInput, setMindMapInput] = useState({
    name: "",
    description: ""
  })
  const [showModal, setShowModal] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)

  const handleSave = async () => {
    if (editable) {
      let { name = "Mindmap không có tên", description = "Chưa có mô tả" } = mindmapInput
      if (!name) {
        name = "Mindmap không có tên"
      }
      if (!description) {
        description = "Chưa có mô tả"
      }
      let mapData = [];
      if (window.sessionStorage.getItem("mapdata")) {
        mapData = JSON.parse(window.sessionStorage.getItem("mapdata"))
      }
      setUpdateStatus(true);
      const response = await fetch(mindmapApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          id: mindmap.id,
          map: mapData,
        })
      })
      setUpdateStatus(false);
      if (response.ok) {
        toast.success("Đã lưu thành công");
      }
    } else {
      toast.error("Bạn không có quyền sửa")
    }
  }

  useEffect(() => {
    setMindMapInput({
      name: mindmap.name ?? "Mindmap không có tên",
      description: mindmap.description ?? "Chưa có mô tả",
    });
  }, [mindmap]);

  useEffect(() => {
    document.title = mindmap?.seo?.title
      ? mindmap?.seo?.title
      : mindmapInput.name;
  }, [mindmapInput]);

  return (
    <>
      <div className="py-5 mx-auto">
        <div className="text-start">
          <div className="mx-auto mt-3 px-2">
            <div className="flex flex-wrap">
              <div className="w-4/5">
                <h1
                  className="text-2xl md:text-4xl font-medium my-2 outline-0"
                  contentEditable={editable}
                  spellCheck={false}
                  suppressContentEditableWarning={true}
                  onInput={(e) => {
                    setMindMapInput({
                      ...mindmapInput,
                      name: e.target.innerText,
                    });
                  }}
                >
                  {mindmap.name ? mindmap.name : "Mindmap không có tên"}
                </h1>
                <p
                  className="outline-0"
                  contentEditable={editable}
                  spellCheck={false}
                  suppressContentEditableWarning={true}
                  onInput={(e) => {
                    setMindMapInput({
                      ...mindmapInput,
                      description: e.target.innerText,
                    });
                  }}
                >
                  {mindmap.description ? mindmap.description : "Chưa có mô tả"}
                </p>{" "}
              </div>
              <div className="w-1/5">
                {editable && (
                  <div className="flex justify-end items-center">
                    <button
                      className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
                      target="_blank"
                      rel="noopener"
                      onClick={handleSave}
                      disabled={updateStatus}
                    >
                      <IoIosSave />
                      <span className="ml-2">Lưu thay đổi</span>
                    </button>
                    <button
                      className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700"
                      target="_blank"
                      rel="noopener"
                    >
                      <FaShareSquare />
                      <span className="ml-2" onClick={() => setShowModal(true)}>
                        Chia sẻ
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mindmap {...mindmap} />
      {
        showModal && <ShareModal mindmap={mindmap} setShowModal={setShowModal} />
      }
      <ToastContainer />
    </>
  )
}
