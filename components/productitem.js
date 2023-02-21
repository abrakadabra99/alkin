import Link from 'next/link';
import React, { useContext } from 'react';
import Image from 'next/image';
import { Store } from '@/utils/store';
import { useRouter } from 'next/router';

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const AddToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of Stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    router.push('/cart');
  };
  return (
    <div className="card">
      <Link href={'/product/' + product.slug}>
        <Image
          className="rounded shadow"
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={'/product/' + product.slug}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={AddToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
