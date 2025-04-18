import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
                    rel='stylesheet'
                ></link>
                <link rel='icon' href='/favicon.ico' />
                {/* <script
                    src='https://www.google.com/recaptcha/enterprise.js?render=6Lf8CfcqAAAAAPrDuO7-pMM-FfWnAXvyVzzqkFwi'
                    async
                    defer
                ></script> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
