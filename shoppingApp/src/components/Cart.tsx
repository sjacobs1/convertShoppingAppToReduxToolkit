import { useContext } from "react";
import {
  DispatchContext,
  ProductAction,
  StateContext,
} from "../store/ProductsPage";

const Cart = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const addedItems = state?.cart.map((addedItem) => {
    const product = state.products.find(
      (product) => product.id === addedItem.productId
    );
    return {
      ...addedItem,
      name: product?.title,
      price: product?.price ?? 0,
      totalItemPrice: (product?.price ?? 0) * addedItem.quantity,
    };
  });

  const handleIncreaseQuantity = (productId: number) => {
    if (dispatch) {
      dispatch({
        type: "plusQuantity",
        productId: productId,
      } as ProductAction);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    if (dispatch) {
      dispatch({
        type: "minusQuantity",
        productId: productId,
      } as ProductAction);
    }
  };

  //reduce function on array prototype on mdn docs if you want, yea
  let cartTotal = 0;
  if (addedItems) {
    for (const item of addedItems) {
      cartTotal += item.totalItemPrice;
    }
  }

  return (
    <div className="card shadow-xl flex flex-col gap-2 bg-gray-100">
      {/* <h1 className="text-xl">Cart</h1> */}
      <ul className="flex flex-col gap-2">
        <li className="bg-base-200 grid grid-cols-4 gap-4 p-4 font-bold">
          <div className="flex items-center">
            <h2>Item</h2>
          </div>
          <div className="flex items-center justify-center">
            <h2>Quantity</h2>
          </div>
          <div className="flex items-center justify-end">
            <h2>Item Price</h2>
          </div>
          <div className="flex items-center justify-end">
            <h2>Item Total</h2>
          </div>
        </li>
        {addedItems.map((item) => (
          <li className="grid grid-cols-4 gap-4 p-4" key={item.productId}>
            <div className="flex items-center">
              <p>{item.name}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleDecreaseQuantity(item.productId)}
                className="btn btn-neutral"
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => handleIncreaseQuantity(item.productId)}
                className="btn btn-neutral"
              >
                +
              </button>
            </div>
            <div className="flex items-center justify-end">
              <p>${item.price}</p>
            </div>
            <div className="flex items-center justify-end">
              <p>${item.totalItemPrice}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="divider"></div>
      <div className="flex justify-end p-4 text-black">
        Cart Total: ${cartTotal}
      </div>
    </div>
  );
};

export default Cart;
