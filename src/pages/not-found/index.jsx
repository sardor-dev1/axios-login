import React from "react";
import CartImg from "../../assets/cart.png";
import { useNavigate } from "react-router-dom";

const index = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div className="flex flex-col pt-6 items-center justify-center">
        <img className="w-[150px]" src={CartImg} alt="" />
        <h3 className="text-[20px] font-semibold">
          There are currently no products in your cart
        </h3>
        <p className="text-[14px]">
          Start with the collections on the home page or find the product you
          need by searching
        </p>
        <button
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default index;
