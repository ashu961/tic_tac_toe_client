import App from 'next/app'
import {useEffect} from 'react';
import cookies from 'next-cookies';
import Axios from 'axios';
import Login from '../pages/login'
function MyApp({ Component, pageProps,user}) {
    // useEffect(()=>{
      
    // },[]);
    // console.log(user)
    let newProps={...pageProps,user}
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
    {
      user ? <Component {...newProps} /> : <Login/>
    }
      
    </>
    );
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    const token = cookies(appContext.ctx)['jwt'] || null;
    if(token){
      let {data}=await Axios.get('http://localhost:3001/auth/me',{
        headers: {
          Authorization: 'Bearer '+token
        }});
      return { ...appProps,user:data}
  }
    return { ...appProps}
  }
  
  export default MyApp