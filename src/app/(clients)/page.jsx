import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-indigo-100 py-6 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">
            Học tập hiệu quả với bản đồ tư duy
          </h1>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-6">
            Sử dụng miễn phí
          </button>
          <div className="mt-4">
            <img src="/img/so-do-tu-duy.jpg" alt="Sơ đồ tư duy" />
          </div>
        </div>
        <div className="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">
          <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
            <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3" />
            <h5 className="text-xl font-medium uppercase mb-4">Dễ sử dụng</h5>
            <p className="text-gray-600">
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable
            </p>
          </div>
          <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
            <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3" />
            <h5 className="text-xl font-medium uppercase mb-4">
              Không giới hạn
            </h5>
            <p className="text-gray-600">
              FWR blocks are the cleanest pieces of HTML blocks, which are built
              with utmost care to quality and usability.
            </p>
          </div>
          <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
            <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3" />
            <h5 className="text-xl font-medium uppercase mb-4">
              Quản lý và chia sẻ
            </h5>
            <p className="text-gray-600">
              FWR blocks is a perfect tool for designers, developers and
              agencies looking to create stunning websites in no time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
