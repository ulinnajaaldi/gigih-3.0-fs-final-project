import { Tooltip } from "@material-tailwind/react";
import { ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CardVideos = ({ id, thumbnailUrl, totalProducts, title, userName }) => {
  return (
    <Link
      to={`/video/${id}`}
      className="relative h-[350px] w-full cursor-pointer rounded-2xl border-2 border-green-500 transition-all hover:shadow-xl hover:drop-shadow-xl"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0)), url(${thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Tooltip
        content={`${totalProducts} promoted products`}
        placement="bottom"
        className="bg-white text-black"
      >
        <div className="group absolute right-2 top-2 rounded-md bg-green-500 p-1 text-white">
          <div className="flex items-center justify-center gap-1">
            <ShoppingBagIcon className="h-4 w-4" />
            <p className="text-xs">{totalProducts}</p>
          </div>
        </div>
      </Tooltip>
      <div className="flex h-full items-end">
        <div className="flex w-full flex-col gap-1 rounded-bl-2xl rounded-br-2xl bg-gradient-to-t from-gray-900 p-2 text-white">
          <h1 className="line-clamp-2 font-semibold">{title}</h1>
          {userName && (
            <div className="flex items-center">
              <UserCircleIcon className="h-4 w-4" />
              <p className="p-1 text-xs font-medium">{userName}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardVideos;
