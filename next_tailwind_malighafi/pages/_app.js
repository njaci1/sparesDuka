import { useRouter } from 'next/router';
import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import { SessionProvider, useSession } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {/* deferLoading={true} prevents the PayPal script from 
      loading until the first time a PayPal button is rendered. 
      This is useful if you want to conditionally render PayPal buttons on your page. */}
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}
export default MyApp;
