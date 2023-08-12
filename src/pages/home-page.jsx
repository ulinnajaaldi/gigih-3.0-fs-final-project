import { Tooltip } from "@material-tailwind/react";
import { LayoutMain } from "../components";
import { UserCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const datas = [
  {
    id: 1,
    title: "XIAOMI MENGGILAAA 🤣!! Unboxing Xiaomi 13 Pro!",
    url: "https://youtu.be/0p37gl4HrE0",
    thumbnailUrl:
      "https://i.ytimg.com/vi/0p37gl4HrE0/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCEzdsnekz3_y_9I8pj227ZBnScuw",
    userName: "GadgetIn",
  },
  {
    id: 2,
    title: "SANG MONSTER TIBAAA 😆😆!!! UNBOXING POCO F5 RESMI INDONESIA!",
    url: "https://youtu.be/Bot5gTQK_G0",
    thumbnailUrl:
      "https://i.ytimg.com/vi/Bot5gTQK_G0/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLDHXDQGkKTJMQGea2-NMKtbm88FoA",
    userName: "Sam Benwick",
  },
  {
    id: 3,
    title: "Puncak kecanggihan tablet Rp22.000.000!!! 🤯",
    url: "https://youtu.be/q32mn4ls6Co",
    thumbnailUrl:
      "https://i.ytimg.com/vi/q32mn4ls6Co/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLAwWlMGk2HZoGdjI5Qsy2F1ePWUOg",
    userName: "Aku Jeje",
  },
  {
    id: 4,
    title: "Desain kelas + kamera ganas + spek panas = Transsion NGELUNJAK 🔥",
    url: "https://youtu.be/Ks-vGIq9vQg",
    thumbnailUrl:
      "	https://i.ytimg.com/vi/Ks-vGIq9vQg/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCc3zC6G7MNWwoKpeoAUJMncJXxDw",
    userName: "Sam Benwick",
  },
  {
    id: 5,
    title: "Kalau Xiaomi bisa niru sistem HP ini, PASAR HP LANGSUNG KELAR.",
    url: "https://youtu.be/bnkQR2TOeTg",
    thumbnailUrl:
      "https://i.ytimg.com/vi/bnkQR2TOeTg/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCFD_L992CFNYnyxLLJz21dUW2DAg",
    userName: "Aku Jeje",
  },
];

const HomePage = () => {
  return (
    <LayoutMain>
      <section className="mt-5 grid grid-cols-5 gap-3">
        {datas.map((data) => {
          return (
            <div
              key={data.id}
              className="relative h-[350px] w-full cursor-pointer rounded-2xl border-2 border-green-500 transition-all hover:shadow-xl hover:drop-shadow-xl"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0)), url(${data.thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="group absolute right-2 top-2 rounded-md bg-green-500 p-1 text-white">
                <Tooltip
                  content={`4 promoted products`}
                  placement="bottom"
                  className="mt-1 bg-white text-black"
                >
                  <div className="flex items-center justify-center gap-1">
                    <ShoppingBagIcon className="h-4 w-4" />
                    <p className="text-xs">4</p>
                  </div>
                </Tooltip>
              </div>
              <div className="flex h-full items-end">
                <div className="flex flex-col gap-2 rounded-bl-2xl rounded-br-2xl bg-gradient-to-t from-gray-900 p-2 text-white">
                  <h1 className="line-clamp-2 font-semibold">{data.title}</h1>
                  <div className="flex items-center gap-1">
                    <UserCircleIcon className="h-4 w-4" />
                    <p className="text-xs font-medium">{data.userName}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </LayoutMain>
  );
};

export default HomePage;
