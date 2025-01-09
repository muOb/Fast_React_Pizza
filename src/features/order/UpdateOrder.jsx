import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    //fetcher.Form we can use to update some data
    //without causing a navigation just submit the form and the nalso revalidate the page.

    //the Form inside CreateOrder.jsx actually creates a new navigation so
    //the idea with this one is to navigate away from the page

    //with fetcher.Form we can use input.

    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary"> Make Priority</Button>
    </fetcher.Form>
  );
}

//with Form like CreateOrder.jsx or fetcher.Form used action
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data); //params.orderId from url
  return null;
}
export default UpdateOrder;
