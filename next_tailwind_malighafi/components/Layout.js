import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import { useState } from 'react';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + '- MG' : 'MaliGhafi'}</title>
        <meta name="description" content="online spares shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-full flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center ">
            <Link className="text-lg font-bold" href="/">
              MaliGhafi
            </Link>
            <div>
              <Link className="p-2" href="/cart">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/login">Login</Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p className="text-sm">© 2023 MaliGhafi</p>
        </footer>
      </div>
    </>
  );
}
