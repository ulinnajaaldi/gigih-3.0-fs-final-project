import { Suspense, lazy } from "react";
import { LayoutMain, ScrollToTopButton } from "../components";
import { SkeletonCardVideos } from "../components";
import { useFormik } from "formik";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { debounce } from "../lib/utils";
import { useFetchVideos } from "../features/videos/useFetchVideos";

const CardVideos = lazy(() => import("../components/card/card-videos"));

const HomePage = () => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });

  const handleSearch = debounce((e) => {
    formik.setFieldValue("search", e.target.value);
  }, 500);

  const { data, isLoading } = useFetchVideos(formik.values.search);

  return (
    <LayoutMain>
      <section className="mt-5">
        <div className=" flex items-center justify-center">
          <div className="relative w-[400px] ">
            <input
              type="text"
              placeholder="Search videos here..."
              name="search"
              onChange={handleSearch}
              className="w-full rounded-full border-2 border-green-500 py-2 pl-9 pr-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <SkeletonCardVideos key={i} />
              ))}
            </>
          ) : (
            <Suspense fallback={<SkeletonCardVideos />}>
              {data?.data.data.map((data) => (
                <CardVideos key={data.id} {...data} />
              ))}
            </Suspense>
          )}
        </div>
        {data?.data.data.length === 0 && (
          <div className="group mt-5 text-center">
            <InformationCircleIcon className="mx-auto h-10 w-10 text-blue-500" />
            <p className="font-semibold">Ooups, no videos found!</p>
          </div>
        )}
        <ScrollToTopButton />
      </section>
    </LayoutMain>
  );
};

export default HomePage;
