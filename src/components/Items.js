import React from "react";
import { useCart } from "react-use-cart";
import { Button } from "@material-tailwind/react";

function Items(props) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(props.item);
  };

  return (
    <div className="max-w-sm dg-white border border-grey-200 rounded-lg shadow">
      <img
        src={props.img}
        className="rounded-t-lg"
        style={{ height: "36.25rem" }}
        alt={props.title}
      />
      <div className="p-5">
        <h3 className="mb-2 text-l font-bold tracking-light text-grey-900">
          {props.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">Category: {props.category}</p>
        <div className="flex justify-between text-center">
          <p className="mt-1 font-normal text-md price text-grey-700">
            ราคา {props.price} บาท
          </p>
          <Button
            onClick={handleAddToCart}
            className="rounded py-1 px-1 w-20 bg-gray-600 text-white font-normal"
          >
            Add Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Items;
