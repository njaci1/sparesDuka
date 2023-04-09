import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // console.log(session);

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
      <ToastContainer position="bottom-center" limit={1} />
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

              {status === 'loading' ? (
                'Loading..'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link className="p-2" href="/login">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4 justify-center items-center">
          {children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p className="text-sm">© 2023 MaliGhafi</p>
        </footer>
      </div>
    </>
  );
}
