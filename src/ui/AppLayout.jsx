import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoaderPage from "./LoaderPage";

function AppLayout() {
  //useNavigation() used to see whether the application is currently idle,or loading or submitting and this inf for entire page route
  //so if one of these pages here is loadign then the navigation state will become loading no matter which of these pages is actually being loaded
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid  grid-rows-[auto_1fr_auto] h-screen">
      {isLoading && <LoaderPage />}
      <Header />
      <div className="overflow-scroll">
        <main className="max-w-3xl mx-auto ">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
