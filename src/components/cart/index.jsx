import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
export default function index() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  return (
    <div className="text-black">
      <button onClick={() => navigate("/cart")} className="relative">
        {cart.length > 0 ? (
          <span className="absolute text-[14px] top-[-15px] right-[-17px] px-[7px] py-[2px] rounded-full bg-red-600 text-white">
            {cart.length}
          </span>
        ) : null}
        <span className="">
          <Tooltip title="Cart" placement="left">
            <AddShoppingCartOutlinedIcon />
          </Tooltip>
        </span>
      </button>
    </div>
  );
}
