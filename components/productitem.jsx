import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ProductItem({ product }) {
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
        <p>{product.price}</p>
        <button className="primary-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
