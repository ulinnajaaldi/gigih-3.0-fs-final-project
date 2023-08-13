import SkeletonCardVideos from "./skeleton-card-videos";

const SkeletonDashboardPage = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center font-semibold">
          <div className="h-6 w-40 bg-gray-400"></div>
          <div className="h-6 w-60 bg-gray-400"></div>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(3)].map((_, i) => (
          <SkeletonCardVideos key={i} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonDashboardPage;
