import { useParams } from "react-router-dom";
import {
  CardVideos,
  LayoutMain,
  ScrollToTopButton,
  SkeletonUserDetailsPage,
} from "../components";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { useFetchUserDetails } from "../features/users";

const UserDetailsPage = () => {
  const { id } = useParams();

  const { data: getUserDetails, isLoading: userDetailsLoading } =
    useFetchUserDetails(id);

  return (
    <LayoutMain>
      <section className="relative mt-5 min-h-[80vh] w-full">
        {userDetailsLoading ? (
          <SkeletonUserDetailsPage />
        ) : (
          <div className="mt-5">
            {getUserDetails?.data?.videos.length === 0 ? (
              <div className="group mt-10 text-center">
                <NoSymbolIcon className="mx-auto h-10 w-10 " />
                <p className="text-xl font-semibold">
                  {getUserDetails?.data.fullname} don't have any videos yet
                </p>
              </div>
            ) : (
              <>
                <p className="text-xl font-semibold">
                  {getUserDetails?.data.fullname} videos
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3 transition-all sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {getUserDetails?.data?.videos.map((data) => (
                    <CardVideos key={data.id} {...data} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <ScrollToTopButton />
      </section>
    </LayoutMain>
  );
};

export default UserDetailsPage;
