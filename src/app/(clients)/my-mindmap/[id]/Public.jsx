import React from 'react'

export default function Public({ name, description, seo }) {
  const shareUrl = window.location.href;
  const imageUrl = `${window.location.origin}/img/so-do-tu-duy.jpg`;

  return (
    <>
      <div className="group relative">
        <label
          htmlFor="share-input"
          className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
        >
          Liên kết chia sẻ
        </label>
        <input
          id="share-input"
          type="url"
          className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          defaultValue={shareUrl}
          onFocus={(e) => e.target.select()}
          readOnly
        />
      </div>

      <div className="group relative mt-3">
        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
          Tiêu đề
        </label>
        <input
          type="text"
          className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          defaultValue={seo?.title ?? name}
          name="title"
        />
      </div>
      <div className="group relative mt-3">
        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
          Mô tả
        </label>
        <textarea
          type="text"
          className="peer h-20 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          defaultValue={seo?.description ?? description}
          name="description"
        />
      </div>
      <div className="group relative mt-3">
        <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
          Ảnh chia sẻ
        </label>
        <input
          type="url"
          className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          defaultValue={seo?.image ?? imageUrl}
          name="image"
        />
      </div>
    </>
  )
}
