import React from "react";

const SkeletonCardVideos = () => {
  return (
    <div className="relative h-[350px] w-full animate-pulse rounded-2xl  border-2 bg-gray-400">
      <div className="group absolute right-2 top-2 h-5 w-10 rounded-md bg-gray-300/60 text-white"></div>
      <div className="flex h-full flex-col items-end justify-end gap-2 p-3">
        <div className="h-10 w-full bg-gray-300/60"></div>
        <div className="h-5 w-full bg-gray-300/60"></div>
      </div>
    </div>
  );
};

export default SkeletonCardVideos;
