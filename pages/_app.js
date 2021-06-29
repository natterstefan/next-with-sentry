import App, { AppContext, AppProps } from 'next/app'

function MyApp({ Component, pageProps, err }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return <Component {...pageProps} err={err} />
}

// @see https://github.com/isaachinman/next-i18next/issues/615#issuecomment-575578375
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default MyApp