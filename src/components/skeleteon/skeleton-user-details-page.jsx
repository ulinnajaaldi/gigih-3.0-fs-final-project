import SkeletonCardVideos from "./skeleton-card-videos";

const SkeletonUserDetailsPage = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-60 bg-gray-400"></div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(3)].map((_, i) => (
          <SkeletonCardVideos key={i} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonUserDetailsPage;
