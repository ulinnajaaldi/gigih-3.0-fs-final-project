const SkeletonDashboardEditPage = () => {
  return (
    <section className="mb-5 animate-pulse">
      <div className="mt-10 flex flex-col items-start justify-between gap-5 md:flex-row lg:gap-8 xl:gap-10">
        <div className="flex h-[514px] max-h-[514px] w-full flex-auto flex-col gap-2 sm:w-full md:flex-1">
          <div className="h-10 w-96 bg-gray-400"></div>

          <div className="h-full w-full rounded-md bg-gray-400"></div>
        </div>
        <div className="flex w-full flex-row gap-3 md:w-auto md:flex-col">
          <div className="h-14 w-14 rounded-md bg-gray-400"></div>
          <div className="h-14 w-14 rounded-md bg-gray-400"></div>
          <div className="h-14 w-14 rounded-md bg-gray-400"></div>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-3 h-8 w-40 bg-gray-400"></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <div className="h-64 w-full rounded-md bg-gray-400"></div>
          <div className="h-64 w-full rounded-md bg-gray-400"></div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonDashboardEditPage;
