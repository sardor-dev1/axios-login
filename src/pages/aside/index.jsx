import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  saveColors,
  setLoading as setColorLoading,
  setError as setColorError,
} from "../../store/ColorSlice";

import {
  saveBrands,
  setLoading as setBrandLoading,
  setError as setBrandError,
} from "../../store/BrandSlice";

export default function index({
  selectedBrand,
  setSelectedBrand,
  setSelectedColor,
  selectedColor,
}) {
  const dispatch = useDispatch();
  const colors = useSelector((store) => store.colors);
  const brands = useSelector((store) => store.brands);

  const {
    loading: colorLoading,
    error: colorError,
    colors: colorsList,
  } = colors;
  
  const {
    loading: brandLoading,
    error: brandError,
    brands: brandsList,
  } = brands;

  useEffect(() => {

    async function fetchBrands() {
      dispatch(setBrandLoading(true));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );
        if (!response.ok) {
          throw new Error("Error fetching colors");
        }
        const fetchedBrands = await response.json();
        dispatch(saveBrands(fetchedBrands));
      } catch (error) {
        dispatch(setBrandError(error.message));
      } finally {
        dispatch(setBrandLoading(false));
      }
    }

    async function fetchColors() {
      dispatch(setColorLoading(true));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );

        if (!response.ok) {
          throw new Error("Error fetching colors");
        }

        const fetchedColors = await response.json();
        dispatch(saveColors(fetchedColors));
      } catch (error) {
        dispatch(setColorError(error.message));
      } finally {
        dispatch(setColorLoading(false));
      }
    }

    fetchBrands();
    fetchColors();
  }, [dispatch]);

  return (
    <div className="px-3">
      <div className="border-b-2 py-3">
        <h2 className="text-center font-semibold text-[18px]">Brands</h2>
        {brandLoading && <div>Colors Loading...</div>}
        {brandError && <div className="text-red-500">Brands Error...</div>}
        <ul className="flex flex-col gap-1">
          {brandsList?.map((brand) => (
            <li key={`${brand.id}`} className="list-none ">
              <input
                className="mr-1 cursor-pointer"
                type="radio"
                name={"brand"}
                id={brand}
                onChange={() => setSelectedBrand(brand)}
                checked={selectedBrand === brand}
              />
              <label className="cursor-pointer" htmlFor={brand}>{brand}</label>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-center py-2">
          <button
            className="py-1 px-2 border-black border-[1.5px] rounded-md border-solid"
            onClick={() => setSelectedBrand("")}
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-center font-semibold text-[18px]">Colors</h2>
        {colorLoading && <div>Colors Loading...</div>}
        {colorError && <div className="text-red-500">Colors Error...</div>}

        <ul className="">
          {colorsList.map((color) => {
            return (
              <li
                key={`${color.id}`}
                className="list-none float-start m-1 gap-[1rem]"
              >
                <button
                  onClick={() => setSelectedColor(color)}
                  className="border-solid h-[20px] w-[20px] border-[1px] border-black rounded-full bg-[#f5f5f5]"
                  style={{
                    backgroundColor: color,
                    outline: selectedColor === color ? "2px solid red" : "",
                  }}
                ></button>
              </li>
            );
          })}
        </ul>
        <div className="flex w-full px-2 justify-center">
          <button
            className="py-1 px-2 border-[1.5px] rounded-md border-black border-solid"
            onClick={() => setSelectedColor("")}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
