import '../styles/globals.css';
import Layout from '../components/Layout';
import {LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import Script from 'next/script';

function MyApp({Component, pageProps}) {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Layout>
                <Component {...pageProps} />
                <Script
                    id="hotjar-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:2752004,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
                    }}
                />
            </Layout>
        </LocalizationProvider>
    );
}

export default MyApp;
