import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

const ModalDelete = ({
  isModalOpen,
  setIsModalOpen,
  title,
  mutate,
  videoIdToDelete,
  isLoading,
}) => {
  return (
    <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
      <DialogHeader>
        <TrashIcon className="mr-2 h-8 w-8 rounded-full bg-[#ea4335] p-[6px] text-white" />
        Delete {title}
      </DialogHeader>

      <DialogBody>
        <p className="font-medium text-gray-700">
          Are you sure you want to delete this {title}?
        </p>
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
          <Button color="red" disabled>
            <Spinner color="white" className="mx-3 h-4 w-4" />
          </Button>
        ) : (
          <Button
            color="red"
            onClick={() => {
              videoIdToDelete ? mutate(videoIdToDelete) : mutate();
              setIsModalOpen(false);
            }}
          >
            Delete
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default ModalDelete;
