import React, { useContext } from 'react';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((item) => item.slug === slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={'/'}>Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>
              <p className="text-sm">Brand: {product.brand}</p>
            </li>
            <li>
              <p className="text-sm">Category: {product.category}</p>
            </li>
            <li>
              <p className="text-sm">
                Rating: {''}
                {product.rating} of {product.numReviews} reviews
              </p>
            </li>
            <li>
              <p className="text-sm">Description: {product.description}</p>
            </li>
          </ul>
        </div>
        <div className="card p-5 h-auto">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>ksh{product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}
