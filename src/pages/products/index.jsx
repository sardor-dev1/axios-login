import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, saveProducts } from "../../store/ProductsSlice";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { addItem } from "../../store/CartSlice";

import "./index.scss";

export default function Index() {
  const { sortBy, selectedBrand, selectedColor, searchBy } = useOutletContext();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.products);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  function handleAdd(product) {
    dispatch(addItem(product));
  }

  useEffect(() => {
    async function fetchProducts() {
      dispatch(setLoading(true));
      let query = `https://headphones-server.onrender.com/products`;

      let params = [];

      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const products = await response.json();
        dispatch(saveProducts(products));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor, sortBy]);

  const sortedProducts = [...products].sort((p1, p2) => {
    if (sortBy === "cheep") {
      return p1.price - p2.price;
    }
    if (sortBy === "expensive") {
      return p2.price - p1.price;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    if (
      searchBy &&
      !product.name.toLowerCase().includes(searchBy.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {loading && <p>Loading products...</p>}
      {filteredProducts.map((p) => (
        <div
          className="card w-96 bg-base-100 shadow-xl"
          key={p.id}
          onClick={() => navigate(`product/${p.id}`)}
        >
          <figure className="cursor-pointer">
            <img
              src={p.image_url}
              alt={p.name}
              className="object-contain h-60 w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{p.name}</h2>
            <p>{p.description}</p>
            <p>Price: {p.price}</p>
            <p>Brand: {p.brand_name}</p>
            <div className="flex gap-2">
              {p.color_options.map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border border-black"
                  style={{ background: color }}
                ></div>
              ))}
            </div>
            <div className="card-actions justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(p);
                }}
                className={`btn btn-sm ${
                  Array.isArray(cart) && cart.find((item) => item.id === p.id)
                    ? "btn-disabled"
                    : "btn-outline btn-success"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
