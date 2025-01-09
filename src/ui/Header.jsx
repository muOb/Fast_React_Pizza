import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 uppercase bg-yellow-400 border-b border-stone-200 sm:px-6">
      <Link to="/" className="tracking-widest">
        FAST REACT PIZZA CO.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
