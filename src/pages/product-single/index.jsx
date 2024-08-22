import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {
  saveProduct,
  setLoading,
  setError,
} from "../../store/ProductSingleSlice";

const index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((store) => store.productSingle.product);

  useEffect(() => {
    async function fetchProduct() {
      dispatch(setLoading(true));
      let product = `https://headphones-server.onrender.com/products/${id}`;

      try {
        const response = await fetch(product);
        const products = await response.json();
        dispatch(saveProduct(products));
      } catch (error) {
        dispatch(setError(error.massage));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProduct();
  }, []);

  return (
    <>
      <button
        className="mb-5 px-3 py-1 border-solid border-[1.5px] border-black rounded-md"
        onClick={() => navigate("/")}
      >
        « Back
      </button>
      <div className="flex flex-col min-[950px]:flex-row justify-center items-center gap-[30px]">
        <div>
          <img src={product.image_url} alt={product.name} />
        </div>
        <div>
          <h2 className="py-2 text-[24px] font-semibold">{product.name}</h2>
          <p className=" text-[18px] font-semibold">
            <span>{product.brand_name}</span>
          </p>
          <p className="py-2">
            Price: <span className="text-red-500">{product.price}$</span>
          </p>

          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              value={product.ratings_stars} 
              precision={0.5}
              readOnly
            />
          </Stack>

          <p className="py-2">
            Rating counts:{" "}
            <span className="text-[24px] font-serif text-orange-500">
              {product.rating_counts}
            </span>
          </p>
          <ul className="flex gap-2">
            {product?.color_options?.map((color, index) => (
              <li
                key={index}
                style={{ background: color }}
                className="w-[20px] h-[20px] rounded-full border-[1px] border-solid border-black"
              ></li>
            ))}
          </ul>
          <p className="w-full max-w-[400px]">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default index;
