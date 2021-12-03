import '../styles/globals.css';
import Layout from '../components/Layout';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocalizationProvider>
  );
}

export default MyApp;
