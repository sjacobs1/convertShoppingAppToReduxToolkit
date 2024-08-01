import { useContext } from "react";
import { Product } from "../products";
import { DispatchContext, ProductAction } from "../store/ProductsPage";

const ProductCard = ({ product }: { product: Product }) => {
  // const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext);

  const handleAddToCart = () => {
    if (dispatch) {
      dispatch({
        type: "addToCart",
        productId: product.id,
        quantity: 1,
      } as ProductAction);
    }

    // console.log(`${product.title} added to cart`)
  };

  return (
    <div className="card card-compact bg-slate-100 w-72 h-96 shadow-xl">
      <figure>
        <img className="w-60 h-90" src={product.image} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <div className="card-actions justify-end">
          {product.price}
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
