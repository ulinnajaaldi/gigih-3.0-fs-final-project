import { useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CardProducts,
  CommentList,
  LayoutMain,
  SkeletonVideoDetailsPage,
} from "../components";
import { Button, Spinner, Textarea } from "@material-tailwind/react";
import { AuthContext } from "../contexts/auth-provider";
import Ably from "ably";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  useCommentForm,
  useFetchComments,
  useFetchVideoDetails,
} from "../features/videos";

const VideoDetailsPage = () => {
  const { id } = useParams();

  const ably = new Ably.Realtime({
    key: import.meta.env.VITE_ABLY_API_KEY,
  });
  const channel = ably.channels.get("comments");

  const commentContainerRef = useRef(null);
  const commentValueRef = useRef(null);
  const { data } = useContext(AuthContext);

  const { data: getVideosDetails, isLoading: videosDetailsLoading } =
    useFetchVideoDetails({ id });

  const { data: getAllCommets, refetch: refetchAllComments } = useFetchComments(
    { id },
  );

  const { formik, addCommentLoading, handleCommentInput } = useCommentForm({
    id,
    data,
    channel,
    refetchAllComments,
    commentValueRef,
  });

  useEffect(() => {
    channel.subscribe("new comment", (data) => {
      refetchAllComments();
    });
  }, []);

  useEffect(() => {
    if (commentContainerRef.current) {
      commentContainerRef.current.scrollTop =
        commentContainerRef.current.scrollHeight;
    }
  }, [getAllCommets]);

  return (
    <LayoutMain>
      {videosDetailsLoading ? (
        <SkeletonVideoDetailsPage />
      ) : (
        <section className="mb-5">
          <div className="mt-10 flex flex-col items-start justify-between gap-5 md:flex-row lg:gap-8 xl:gap-10">
            <div className="flex h-[514px] max-h-[514px] w-full flex-auto flex-col gap-2 sm:w-full md:flex-1">
              <h1 className="flex-1 text-2xl font-bold">
                {getVideosDetails?.data.title}
              </h1>

              <iframe
                className="h-full w-full rounded-md "
                src={getVideosDetails?.data.url + "?modestbranding=1&rel=0"}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <Link
                to={`/user/${getVideosDetails?.data?.userId}`}
                className="group inline-flex items-center gap-1 font-semibold text-gray-700 hover:underline"
              >
                <UserCircleIcon className="h-5 w-5" />
                {getVideosDetails?.data?.userName}
              </Link>
            </div>

            <div className="w-full md:w-auto">
              <div
                ref={commentContainerRef}
                className={`hide-scrollbar relative w-full overflow-y-auto rounded-t-md bg-gray-300 md:w-[230px] lg:w-[300px] ${
                  data === null ? "h-[472px]" : "h-[342px]"
                } `}
              >
                <p className="sticky left-0 right-0 top-0 w-full rounded-t-md border-b border-b-gray-400 bg-transparent p-3 backdrop-blur-md">
                  Live Comments
                </p>
                <div className="flex flex-col gap-2 p-3">
                  {getAllCommets?.data?.map((comment) => (
                    <CommentList key={comment.id} comment={comment} />
                  ))}
                  {getAllCommets?.data?.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No comments yet, be the first to comment
                    </p>
                  )}
                </div>
              </div>
              {data === null ? (
                <div className="flex w-full items-center justify-center rounded-b-md border-t border-t-gray-400 bg-gray-300 p-3 backdrop-blur-md">
                  <p className="text-sm text-gray-500">
                    Please login to post a comment
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex w-full flex-col items-center rounded-b-md border-t border-t-gray-400 bg-gray-300 p-3 backdrop-blur-md"
                >
                  <Textarea
                    variant="outlined"
                    label="Your Comment"
                    name="comment"
                    onChange={handleCommentInput}
                    ref={commentValueRef}
                  />
                  <div className="flex w-full justify-between ">
                    <p
                      className={` text-start text-xs ${
                        formik.errors.comment && formik.touched.comment
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      {formik.values.comment.length}/200
                    </p>
                    {addCommentLoading ? (
                      <Button
                        disabled
                        type="submit"
                        className="flex w-36 justify-center"
                      >
                        <Spinner className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        disabled={
                          formik.values.comment.length === 0 ||
                          formik.errors.comment
                        }
                        type="submit"
                      >
                        Post Comment
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
          {getVideosDetails?.data?.products?.length === 0 ? null : (
            <div className="mt-5">
              <h2 className="mb-2 text-xl font-bold">Products</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {getVideosDetails?.data?.products?.map((product) => (
                  <CardProducts key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </LayoutMain>
  );
};

export default VideoDetailsPage;
