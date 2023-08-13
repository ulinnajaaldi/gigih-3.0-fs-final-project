import React, { useContext } from "react";
import {
  CardVideosUser,
  LayoutMain,
  ModalAddProduct,
  ModalAddVideo,
  ModalDelete,
  ModalEditProfile,
  SkeletonDashboardPage,
  SpeedDialDashboard,
} from "../../components";
import { AuthContext } from "../../contexts/auth-provider";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {
  useFetchUserDetails,
  useDeleteVideo,
  useDeleteUser,
  useEditProfile,
  useAddVideo,
  useAddProduct,
} from "../../features/users";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: userData, setData } = useContext(AuthContext);

  const id = userData?.data.id;

  const {
    data,
    isLoading,
    refetch: refetchUserDetails,
  } = useFetchUserDetails(id);

  const {
    isDeleteVideoModalOpen,
    setIsDeleteVideoModalOpen,
    videoIdToDelete,
    handleDeleteVideo,
    deleteVideo,
    deleteVideoLoading,
  } = useDeleteVideo({ refetchUserDetails });

  const {
    isDeleteAccountModalOpen,
    setIsDeleteAccountModalOpen,
    deleteAccount,
    deleteAccountLoading,
  } = useDeleteUser({ setData, navigate });

  const {
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    formikEditProfile,
    editProfileLoading,
    handleEditFormInput,
    onEditProfileClick,
  } = useEditProfile({ userData, setData, refetchUserDetails });

  const {
    isModalAddVideo,
    setIsModalAddVideo,
    formikAddVideo,
    addVideoLoading,
    handleAddVideoFormInput,
  } = useAddVideo({ refetchUserDetails });

  const {
    isModalAddProduct,
    setIsModalAddProduct,
    formikAddProduct,
    addProductLoading,
    handleAddProduct,
    handleAddProductFormInput,
  } = useAddProduct({ refetchUserDetails });

  return (
    <LayoutMain>
      <section className="relative mt-5 min-h-[80vh] w-full">
        {isLoading ? (
          <SkeletonDashboardPage />
        ) : (
          <>
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2 text-center font-semibold">
                <p className="text-xl">Hi, {data?.data?.fullname}</p>
                <p>{data?.data?.email}</p>
              </div>
            </div>
            <div className="mt-5">
              {data?.data?.videos.length === 0 ? (
                <div className="group mt-10 text-center">
                  <NoSymbolIcon className="mx-auto h-10 w-10 " />
                  <p>You don't have any videos yet</p>
                  <p>
                    Let's create new one,{" "}
                    <button
                      onClick={() => setIsModalAddVideo(true)}
                      className="text-blue-600"
                    >
                      here
                    </button>
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-semibold">Your videos</p>
                  <div className="mt-5 grid grid-cols-1 gap-3 transition-all sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {data?.data?.videos.map((data) => (
                      <CardVideosUser
                        key={data.id}
                        handleAddProduct={() => handleAddProduct(data.id)}
                        handleDeleteVideo={() => handleDeleteVideo(data.id)}
                        {...data}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <SpeedDialDashboard
              setIsModalAddVideo={setIsModalAddVideo}
              onEditProfileClick={onEditProfileClick}
              setIsDeleteAccountModalOpen={setIsDeleteAccountModalOpen}
            />

            <ModalDelete
              isModalOpen={isDeleteVideoModalOpen}
              setIsModalOpen={setIsDeleteVideoModalOpen}
              title="video"
              mutate={deleteVideo}
              videoIdToDelete={videoIdToDelete}
              isLoading={deleteVideoLoading}
            />

            <ModalDelete
              isModalOpen={isDeleteAccountModalOpen}
              setIsModalOpen={setIsDeleteAccountModalOpen}
              title="account"
              mutate={deleteAccount}
              isLoading={deleteAccountLoading}
            />

            <ModalEditProfile
              isModalOpen={isEditProfileModalOpen}
              setIsModalOpen={setIsEditProfileModalOpen}
              handleFormInput={handleEditFormInput}
              formik={formikEditProfile}
              isLoading={editProfileLoading}
            />

            <ModalAddVideo
              isModalOpen={isModalAddVideo}
              setIsModalOpen={setIsModalAddVideo}
              handleFormInput={handleAddVideoFormInput}
              formik={formikAddVideo}
              isLoading={addVideoLoading}
            />

            <ModalAddProduct
              isModalOpen={isModalAddProduct}
              setIsModalOpen={setIsModalAddProduct}
              handleFormInput={handleAddProductFormInput}
              formik={formikAddProduct}
              isLoading={addProductLoading}
            />
          </>
        )}
      </section>
    </LayoutMain>
  );
};

export default DashboardPage;
