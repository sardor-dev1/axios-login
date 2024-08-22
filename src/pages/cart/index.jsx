import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { removeItem, removeAll } from "../../store/CartSlice";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { NotFound } from "@pages";
import CartModal from "../../components/cart-modal";
import RemoveAll from "../../components/remove-all-cart";
import { useState } from "react";
import Counter from "../../components/counter";

const index = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [allOpen, setAllOpen] = useState(false);
  const handleAllClose = () => setAllOpen(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const counter = useSelector((store) => store.counter);

  const handleAllClick = () => {
    setAllOpen(true);
  };

  const handleClick = (id) => {
    setOpen(true);
    setId(id);
  };

  return (
    <>
      <div className="relative">
        <CartModal open={open} id={id} handleClose={handleClose} />
        <RemoveAll allOpen={allOpen} handleAllClose={handleAllClose} />
        <div className="cart pt-3 flex flex-col gap-[30px]">
          {cart.length == 0 ? (
            <NotFound />
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="relative max-[840px]:flex-col gap-5 max-[840px]:py-3 cart__card max-w-[800px] w-full rounded-[10px] px-6 bg-white text-black flex justify-between items-center"
              >
                <div className=" py-1 w-[150px]">
                  <img
                    className="object-contain w-full"
                    src={item.image_url}
                    alt=""
                  />
                </div>
                <div className="flex gap-2 flex-col justify-center items-center">
                  <h3 className="text-[28px]">{item.name}</h3>
                  <Counter />
                </div>
                <p className="text-red-500 text-[24px]">
                  {counter.count > 0
                    ? counter.count * Math.round(item.price)
                    : item.price}
                  <span className="text-orange-500">$</span>
                </p>
                <button
                  className="absolute top-4 duration-3 transition hover:scale-[1.2] right-5"
                  onClick={() => handleClick(item.id)}
                >
                  <Tooltip title="Delete">
                    <RemoveShoppingCartIcon />
                  </Tooltip>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 ? (
          <div className="flex justify-center py-3">
            <Button
              onClick={() => handleAllClick(true)}
              variant="contained"
              color="success"
            >
              Remove all
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default index;
