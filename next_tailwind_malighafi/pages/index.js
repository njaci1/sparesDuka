import ProductItem from '../components/ProductItem';
import axios from 'axios';
import Layout from '../components/Layout';
// import data from '../utils/data';
import Product from '../models/Product';
import db from '../utils/db';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added to cart');
    router.push('/cart');
  };

  return (
    <Layout>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link legacyBehavior href={`/product/${product.slug}`} passHref>
              <a className="flex">
                <Image
                  src={product.banner}
                  alt={product.name}
                  width={1500}
                  height={400}
                ></Image>
              </a>
            </Link>
          </div>
        ))}
      </Carousel>
      <h1 className="h2 my-4 text-2xl">Latest Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
