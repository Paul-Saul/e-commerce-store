import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, index }) {
   const { addItem } = useShoppingCart();

   function onAddToCart(event) {
      event.preventDefault();
      const id = toast.loading('Adding 1 item...');
      addItem(product);
      toast.success(`${product.name} added`, {id});
   }

   return (
      <Link href={`/products/${product.id}`} className="border-2 rounded-md group overflow-hidden border-emerald-100">
         <div className="relative w-full h-64">
            <Image 
             property={index === 0}
             src={product.image}
             alt={product.name}
             fill sizes="100%"
             style={{
               objectFit: 'contain',
             }}
            />
         </div>
         <div className="p-6 bg-amber-50">
            <p className="font-semibold text-lg">{product.name}</p>
            <Rating />
            <div className="mt-4 flex items-center justify-between space-x-2">
               <div>
                  <p className="text-gray-500">Price</p>
                  <p className="text-lg font-semibold">{formatCurrencyString({
                     currency: product.currency,
                     value: product.price
                  })}
                  </p>
               </div>
               <button onClick={onAddToCart} className="border border-lime-500 py-1 px-3 bg-lime-500 hover:bg-lime-600 hover:border-lime-600 focus:ring-4 focus:ring-opacity-50 foucs:ring-lime-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg">Add to Cart</button>
            </div>
         </div>
      </Link>
   )
}