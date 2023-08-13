import {
  Cog6ToothIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const SpeedDialDashboard = ({
  setIsModalAddVideo,
  onEditProfileClick,
  setIsDeleteAccountModalOpen,
}) => {
  return (
    <div className="fixed bottom-12 right-12">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <Cog6ToothIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <Tooltip content="Add new video" placement="left">
            <div
              onClick={() => {
                setIsModalAddVideo(true);
              }}
            >
              <SpeedDialAction className="border-gray-300">
                <PlusIcon className="h-5 w-5" />
              </SpeedDialAction>
            </div>
          </Tooltip>
          <Tooltip content="Edit profile" placement="left">
            <div onClick={onEditProfileClick}>
              <SpeedDialAction className="border-gray-300">
                <PencilSquareIcon className="h-5 w-5" />
              </SpeedDialAction>
            </div>
          </Tooltip>
          <Tooltip
            content="Delete this account"
            placement="left"
            className="bg-red-500"
          >
            <div
              onClick={() => {
                setIsDeleteAccountModalOpen(true);
              }}
            >
              <SpeedDialAction className="border-gray-300">
                <TrashIcon className="h-5 w-5 text-red-500" />
              </SpeedDialAction>
            </div>
          </Tooltip>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
};

export default SpeedDialDashboard;
