import Layout from '@/components/layout';
import ProductItem from '@/components/productitem';
import db from '@/utils/db';
import Product from '@/models/product';
import { Store } from '@/utils/store';
import { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  const AddToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get('/api/products/' + product._id);

    if (data.countInStock < quantity) {
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
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={AddToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
