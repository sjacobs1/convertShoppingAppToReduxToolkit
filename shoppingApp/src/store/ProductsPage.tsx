import { createContext, Dispatch, ReactNode, useReducer } from "react";
// import ProductCard from "../components/ProductCard";
import { Product } from "../products";
import { productions } from "../productsJson";

export interface ProductsState {
    products: Product[];
    cart: {productId: number; quantity: number}[]
  }


const initialState: ProductsState = {
    products: productions,
    cart: []
}

export type ProductAction =
 | { type: "addToCart", productId: number, quantity: number }
 | { type: "plusQuantity", productId: number, quantity: number }
 | { type: "minusQuantity", productId: number, quantity: number }

const productsStoreReducer = (state: ProductsState, action: ProductAction ): ProductsState => {

    let existingItem;

    switch (action.type) {

        case "addToCart":
            existingItem = state.cart.find(item => item.productId === action.productId);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.productId === action.productId ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, {
                        productId: action.productId, 
                        quantity: 1,
                    }],
                };
            }
        
        case "plusQuantity":
        return {
            ...state,
            cart: state.cart.map(item => item.productId === action.productId ? { ...item, quantity: item.quantity + 1 } : item),
        };

        case "minusQuantity":
            return {
                ...state,
                cart: state.cart.map(item => item.productId === action.productId ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0),
        };
        

    }

    return state
}

export const StateContext = createContext<ProductsState>({} as ProductsState)
export const DispatchContext = createContext<Dispatch<ProductAction> | undefined>(undefined)

const ProductsPage = ({children}: {children: ReactNode}) => { //rename const, providing state

    const [productState, dispatch] = useReducer(productsStoreReducer, initialState)

    return (

        <StateContext.Provider value={productState}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )

}

export default ProductsPage

  
