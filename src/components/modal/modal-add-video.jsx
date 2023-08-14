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
  content,
  isModalOpen,
  setIsModalOpen,
  handleFormInput,
  formik,
  isLoading,
}) => {
  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)} size="lg">
      <DialogHeader className="capitalize">
        <VideoCameraIcon className="mr-2 h-8 w-8 rounded-full bg-green-600 p-[6px] text-white" />
        {content}
      </DialogHeader>

      <DialogBody className="flex flex-col gap-2">
        <p className="font-medium text-gray-700">
          Field the form below to <span className="normal-case">{content}</span>
        </p>
        <div className="mt-3">
          <Input
            label="Title"
            name="title"
            onChange={handleFormInput}
            value={formik.values.title}
            className="rounded-md border border-gray-500 px-3 py-2"
            error={formik.errors.title && formik.touched.title && true}
          />
          <p
            className={`mt-1 text-end text-xs ${
              formik.errors.title && formik.touched.title
                ? "text-red-500"
                : "text-base"
            }`}
          >
            {formik.values.title?.length}/100
          </p>
          {formik.errors.title && formik.touched.title && (
            <p className="text-sm font-normal text-red-500">
              {formik.errors.title}
            </p>
          )}
        </div>
        <div className="mt-3">
          <Input
            label="Youtube URL"
            name="url"
            onChange={handleFormInput}
            value={formik.values.url}
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
            value={formik.values.thumbnailUrl}
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
