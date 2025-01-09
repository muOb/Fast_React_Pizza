import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu, { loader as menuLoader } from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder, {
  action as CreateOrderAction,
} from "./features/order/CreateOrder.jsx";
import { action as updateOrderAction } from "./features/order/UpdateOrder.jsx";
import Order, { loader as orderLoader } from "./features/order/Order.jsx";
import Error from "./ui/Error.jsx";
import AppLayout from "./ui/AppLayout.jsx";
//old way still work even on modern react router but then
//we can't use it to load data or to submit data using forms
const router = createBrowserRouter([
  {
    //layout route they don't have a path
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        // fething data in 3 steps
        //1.create a loader.
        //2.provide the loader. (loader)
        //3.provide the data to the page. (useLoaderData())
        element: <Menu />,
        //provided loader function from Menu componint to Menu route
        loader: menuLoader,
        errorElement: <Error />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
