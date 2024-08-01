// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Cart from './components/Cart'
import ProductCard from './components/ProductCard'
import { productions } from './productsJson'
import ProductsPage from './store/ProductsPage'

function App() {

  return (

    <ProductsPage >
      <div className="flex h-screen justify-around">

        <div className="grid grid-cols-3 overflow-auto gap-3 shadow-xl">
          {productions.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="overflow-hidden w-1/3">
          <Cart />
        </div>

      </div>
    </ProductsPage>

  )
  
}

export default App
