import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";

const ModalEditProfile = ({
  isModalOpen,
  setIsModalOpen,
  handleFormInput,
  formik,
  isLoading,
}) => {
  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
      <DialogHeader>
        <PencilIcon className="mr-2 h-8 w-8 rounded-full bg-amber-600 p-[6px] text-white" />
        Edit Profile
      </DialogHeader>

      <DialogBody className="flex flex-col gap-2">
        <p className="font-medium text-gray-700">
          Change the form below to edit your profile
        </p>
        <div className="flex flex-col text-gray-800">
          <label className="text-sm ">Fullname</label>
          <input
            type="text"
            name="fullname"
            onChange={handleFormInput}
            value={formik.values.fullname}
            className="rounded-md border border-gray-500 px-3 py-2"
          />
        </div>
        <div className="flex flex-col text-gray-800">
          <label className="text-sm ">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleFormInput}
            value={formik.values.email}
            className="rounded-md border border-gray-500 px-3 py-2 "
          />
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
          <Button color="amber" disabled>
            <Spinner color="white" className="mx-3 h-4 w-4" />
          </Button>
        ) : (
          <Button
            color="amber"
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

export default ModalEditProfile;
