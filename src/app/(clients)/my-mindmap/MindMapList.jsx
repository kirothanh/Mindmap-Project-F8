import { getMindmapList } from '@/services/mindmapService.js'
import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import { FaEdit } from 'react-icons/fa';
import DeleteButton from './Items/DeleteButton';

export default async function MindMapList() {
  const mindmapList = await getMindmapList();
  return (
    <>
      <div className="py-4">
        <div className="flex items-center py-2">
          <span className="w-1/6 text-center">
            <input type="checkbox" />
          </span>
          <span className="w-1/2">
            <span className="text-xs uppercase text-gray-600 font-bold">
              Tên
            </span>
          </span>
          <span className="w-1/4">
            <span className="text-xs uppercase text-gray-600 font-bold">
              Tạo lúc
            </span>
          </span>
          <span className="w-1/4">
            <span className="text-xs uppercase text-gray-600 font-bold">
              Hành động
            </span>
          </span>
        </div>
      </div>
      {mindmapList?.map(({ id, name, description, createdAt }) => (
        <div
          key={id}
          className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg"
        >
          <div className="w-1/6 text-center">
            <input type="checkbox" />
          </div>
          <div className="w-1/2">
            <div className="flex items-center">
              <div className="ml-4">
                <span className="capitalize block text-gray-800">
                  <Link href={`/my-mindmap/${id}`}>
                    {name ? name : "Mindmap không có tên"}
                  </Link>
                </span>
                <span className="text-sm block text-gray-600">
                  {description ? description : "Chưa có mô tả"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <span className="text-gray-600 text-sm">
              {moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </span>
          </div>
          <div className="w-1/4">
            <div className="flex items-center ">
              <Link href={`/my-mindmap/${id}`}>
                <span className="text-gray-600 text-sm px-2">
                  <FaEdit />
                </span>
              </Link>
              <DeleteButton id={id} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
