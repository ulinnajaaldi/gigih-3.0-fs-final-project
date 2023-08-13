import { Tooltip } from "@material-tailwind/react";
import {
  PencilIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CardVideosUser = ({
  id,
  thumbnailUrl,
  totalProducts,
  title,
  userName,
  handleDeleteVideo,
  handleAddProduct,
}) => {
  return (
    <div
      className="group relative h-[350px] w-full  rounded-2xl border-2 border-green-500 transition-all hover:shadow-xl hover:drop-shadow-xl"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0)), url(${thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Tooltip
        content={`${totalProducts} promoted products`}
        placement="left"
        className=" bg-white text-black"
      >
        <div className="group absolute right-2 top-2 rounded-md bg-green-500 p-1 text-white">
          <div className="flex items-center justify-center gap-1">
            <ShoppingBagIcon className="h-4 w-4" />
            <p className="text-xs">{totalProducts}</p>
          </div>
        </div>
      </Tooltip>
      <div className="flex h-full items-end">
        <Link
          to={`/video/${id}`}
          className="flex w-full flex-col gap-1 rounded-bl-2xl rounded-br-2xl bg-gradient-to-t from-gray-900 p-2 text-white"
        >
          <h1 className="line-clamp-2 font-semibold">{title}</h1>
          {userName && (
            <div className="flex items-center">
              <UserCircleIcon className="h-4 w-4" />
              <p className="p-1 text-xs font-medium">{userName}</p>
            </div>
          )}
        </Link>
      </div>
      <Tooltip
        content="Add new product"
        placement="left"
        className="bg-white text-black"
      >
        <button
          onClick={handleAddProduct}
          className="absolute right-2 top-10 rounded-md bg-green-500 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </Tooltip>
      <Tooltip
        content="Edit video & products"
        placement="left"
        className="bg-white text-black"
      >
        <Link
          to={`/edit-video/${id}`}
          className="absolute right-2 top-20 rounded-md bg-amber-600 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <PencilIcon className="h-5 w-5" />
        </Link>
      </Tooltip>
      <Tooltip
        content="Delete video"
        placement="left"
        className="bg-white text-black"
      >
        <button
          onClick={handleDeleteVideo}
          className="absolute right-2 top-[120px]  rounded-md bg-red-600 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </Tooltip>
    </div>
  );
};

export default CardVideosUser;
