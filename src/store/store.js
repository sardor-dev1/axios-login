import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductsSlice";
import colorSlice from "./ColorSlice";
import brandsSlice from "./BrandSlice";
import ProductSingleSlice from "./ProductSingleSlice";
import CartSlice from "./CartSlice";
import CounterSlice from "./CounterSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    colors: colorSlice,
    brands: brandsSlice,
    productSingle: ProductSingleSlice,
    cart: CartSlice,
    counter: CounterSlice,
    user: userSlice,
  },
});
