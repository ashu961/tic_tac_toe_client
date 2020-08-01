import App from 'next/app'
import {useEffect} from 'react';
import cookies from 'next-cookies';
function MyApp({ Component, pageProps, ctx }) {
    // useEffect(()=>{

    // },[]);
    return( 
        <>
        <style jsx global>{`
        html,
        body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
    `}</style>
    <Component {...pageProps} />
    </>
    );
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
//   MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);
//     const token = cookies(appContext.ctx)['ttts'] || null;
//     return { ...appProps}
//   }
  
  export default MyApp