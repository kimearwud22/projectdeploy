// import '@/styles/globa/
import '@/styles/globals.css'
import './../public/assets/css/argon-dashboard.css'
import './../public/assets/css/nucleo-svg.css'
import './../public/assets/css/nucleo-icons.css'
import './../public/assets/css/styles-lading.css'
import '../styles/globals.css'
import 'font-awesome/css/font-awesome.min.css'

import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from 'react-toastify'

import "@uploadthing/react/styles.css";

import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return <>
  <SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
  </SessionProvider>
  <ToastContainer/>
  </>
}
