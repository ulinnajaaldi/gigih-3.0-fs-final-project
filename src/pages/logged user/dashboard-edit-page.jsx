import { useNavigate, useParams } from "react-router-dom";
import {
  CardProductsUser,
  LayoutMain,
  ModalAddProduct as ModalProduct,
  ModalAddVideo as ModalEditVideo,
  ModalDelete,
  SkeletonDashboardEditPage,
} from "../../components";
import { IconButton, Tooltip } from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useFetchVideoDetails } from "../../features/videos";
import {
  useEditVideo,
  useAddProduct,
  useEditProduct,
  useDeleteProduct,
} from "../../features/users";

const DashboardEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: getVideosDetails,
    isLoading: videosDetailsLoading,
    refetch: refetchVideosDetails,
  } = useFetchVideoDetails({ id });

  const {
    isModalEditVideo,
    setIsModalEditVideo,
    formikEditVideo,
    editVideoLoading,
    handleEditVideoFormInput,
  } = useEditVideo({ refetchVideosDetails, getVideosDetails, id });

  const {
    isModalAddProduct,
    setIsModalAddProduct,
    formikAddProduct,
    addProductLoading,
    handleAddProduct,
    handleAddProductFormInput,
  } = useAddProduct({ refetchUserDetails: refetchVideosDetails });

  const {
    isModalEditProduct,
    setIsModalEditProduct,
    handleEditProduct,
    formikEditProduct,
    handleEditProductFormInput,
    editProductLoading,
  } = useEditProduct({ refetchVideosDetails });

  const {
    isModalDeleteProduct,
    setIsModalDeleteProduct,
    handleDeleteProduct,
    deleteProduct,
    deleteProductLoading,
    productId,
  } = useDeleteProduct({ refetchVideosDetails });

  return (
    <LayoutMain>
      {videosDetailsLoading ? (
        <SkeletonDashboardEditPage />
      ) : (
        <section className="mb-5">
          <div className="mt-10 flex flex-col items-start justify-between gap-5 md:flex-row lg:gap-8 xl:gap-10">
            <div className="flex h-[514px] max-h-[514px] w-full flex-auto flex-col gap-2 sm:w-full md:flex-1">
              <h1 className="flex-1 text-2xl font-bold">
                {getVideosDetails?.data?.title}
              </h1>

              <iframe
                className="h-full w-full rounded-md "
                src={getVideosDetails?.data?.url + "?modestbranding=1&rel=0"}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="flex w-full flex-row gap-3 md:w-auto md:flex-col">
              <Tooltip content="Back to Dashboard" placement="left">
                <IconButton
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  size="lg"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Edit Video" placement="left">
                <IconButton
                  onClick={() => {
                    setIsModalEditVideo(true);
                  }}
                  color="amber"
                  size="lg"
                >
                  <PencilIcon className="h-6 w-6" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Add Product" placement="left">
                <IconButton
                  onClick={() => {
                    handleAddProduct(id);
                    setIsModalAddProduct(true);
                  }}
                  color="green"
                  size="lg"
                >
                  <PlusIcon className="h-6 w-6" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {getVideosDetails?.data?.products?.length === 0 ? (
            <div className="group mt-5 text-center">
              <p>You don't have any products yet.</p>
              <p>
                Let's create new one,{" "}
                <button
                  onClick={() => {
                    setIsModalAddProduct(true);
                  }}
                  className="text-blue-600"
                >
                  here
                </button>
              </p>
            </div>
          ) : (
            <div className="mt-5">
              <h2 className="mb-2 text-xl font-bold">Products</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {getVideosDetails?.data?.products?.map((product) => (
                  <CardProductsUser
                    key={product.id}
                    product={product}
                    handleEditProduct={() => {
                      handleEditProduct(product.id);
                    }}
                    handleDeleteProduct={() => {
                      handleDeleteProduct(product.id);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <ModalEditVideo
            content="edit video"
            isModalOpen={isModalEditVideo}
            setIsModalOpen={setIsModalEditVideo}
            handleFormInput={handleEditVideoFormInput}
            formik={formikEditVideo}
            isLoading={editVideoLoading}
          />

          <ModalProduct
            content="add new product"
            isModalOpen={isModalAddProduct}
            setIsModalOpen={setIsModalAddProduct}
            handleFormInput={handleAddProductFormInput}
            formik={formikAddProduct}
            isLoading={addProductLoading}
          />

          <ModalProduct
            content="edit product"
            isModalOpen={isModalEditProduct}
            setIsModalOpen={setIsModalEditProduct}
            handleFormInput={handleEditProductFormInput}
            formik={formikEditProduct}
            isLoading={editProductLoading}
          />

          <ModalDelete
            isModalOpen={isModalDeleteProduct}
            setIsModalOpen={setIsModalDeleteProduct}
            title="product"
            mutate={deleteProduct}
            videoIdToDelete={productId}
            isLoading={deleteProductLoading}
          />
        </section>
      )}
    </LayoutMain>
  );
};

export default DashboardEditPage;
