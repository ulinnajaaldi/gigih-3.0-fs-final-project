import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { convertToRupiah } from "../../lib/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CardProductsUser = ({
  product,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  return (
    <div className="group relative">
      <Card className="border border-black">
        <CardHeader floated={false} className="mx-3 mt-3 h-40">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </CardHeader>
        <CardBody className="p-3">
          <Typography color="gray" className="font-medium">
            {convertToRupiah(product.price)}
          </Typography>
          <p className="line-clamp-3 text-base font-medium">{product.title}</p>
        </CardBody>
      </Card>
      <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Tooltip content="Edit Product" placement="left">
          <IconButton
            onClick={handleEditProduct}
            color="amber"
            className="rounded-full"
          >
            <PencilIcon className="h-5 w-5" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete Product" placement="left">
          <IconButton
            onClick={handleDeleteProduct}
            color="red"
            className="rounded-full"
          >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default CardProductsUser;
