import { VideoCameraIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
} from "@material-tailwind/react";

const ModalAddVideo = ({
  isModalOpen,
  setIsModalOpen,
  handleFormInput,
  formik,
  isLoading,
}) => {
  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)} size="lg">
      <DialogHeader>
        <VideoCameraIcon className="mr-2 h-8 w-8 rounded-full bg-green-600 p-[6px] text-white" />
        Add New Video
      </DialogHeader>

      <DialogBody className="flex flex-col gap-2">
        <p className="font-medium text-gray-700">
          Field the form below to add new video
        </p>
        <div className="mt-3">
          <Input
            label="Title"
            name="title"
            onChange={handleFormInput}
            className="rounded-md border border-gray-500 px-3 py-2"
            error={formik.errors.title && formik.touched.title && true}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {formik.errors.title}
            </p>
          )}
        </div>
        <div className="mt-3">
          <Input
            label="Youtube URL"
            name="url"
            onChange={handleFormInput}
            className="rounded-md border border-gray-500 px-3 py-2 "
            error={formik.errors.url && formik.touched.url && true}
          />
          {formik.errors.url && formik.touched.url && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {formik.errors.url}
            </p>
          )}
        </div>
        <div className="mt-3">
          <Input
            label="Thumbnail URL"
            name="thumbnailUrl"
            onChange={handleFormInput}
            className="rounded-md border border-gray-500 px-3 py-2 "
            error={
              formik.errors.thumbnailUrl && formik.touched.thumbnailUrl && true
            }
          />
          {formik.errors.thumbnailUrl && formik.touched.thumbnailUrl && (
            <p className="mt-2 text-sm font-normal text-red-500">
              {formik.errors.thumbnailUrl}
            </p>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          onClick={() => setIsModalOpen(false)}
          className="mr-1"
        >
          Cancel
        </Button>
        {isLoading ? (
          <Button color="green" disabled>
            <Spinner color="white" className="mx-3 h-4 w-4" />
          </Button>
        ) : (
          <Button
            color="green"
            onClick={formik.handleSubmit}
            className="text-white"
          >
            Confirm
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default ModalAddVideo;
