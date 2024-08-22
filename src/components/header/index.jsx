import { useState } from "react";
import "./style.scss";
import Cart from "../cart/index";
import SearchIcon from "@mui/icons-material/Search";
import AccountMenu from "../account";

const index = ({ setSortBy, sortBy, searchBy, setSearchBy }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const searchOpen = () => {
    setSearchVisible((prev) => !prev);
  };
  return (
    <header className="w-full text-black">
      <nav className="flex justify-between items-center">
        <div className="flex gap-5">
          <div className="text-black rounded-sm">
            <select
              className="rounded-md p-1 outline-none cursor-pointer border-[1.5px] border-solid border-gray-500 "
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">none</option>
              <option value="cheap">cheap</option>
              <option value="expensive">expensive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center pr-1 gap-8">
          <div>
            <Cart />
          </div>
          <div className="relative">
            <button
              className="block min-[730px]:hidden"
              onClick={() => searchOpen()}
            >
              <SearchIcon />
            </button>
            <input
              onChange={(event) => setSearchBy(event.target.value)}
              value={searchBy}
              type="text"
              placeholder="Search..."
              className={`border-solid border-gray-400 rounded-md outline-none text-black border-[1.5px] px-2 py-1 ${
                searchVisible
                  ? "flex absolute top-8 right-0"
                  : "hidden min-[730px]:block"
              }`}
            />
          </div>
          <AccountMenu />
        </div>
      </nav>
    </header>
  );
};

export default index;
