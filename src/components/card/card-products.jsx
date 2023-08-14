import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { convertToRupiah } from "../../lib/utils";

const CardProducts = ({ product }) => {
  return (
    <a href={product.link} target="_blank" rel="noreferrer">
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
    </a>
  );
};

export default CardProducts;
