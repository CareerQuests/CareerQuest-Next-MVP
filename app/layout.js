import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Career Quest",
  description: "Find your path to a fulfilling career with Career Quest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/compass-regular.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/compass-regular.png" />
        <meta name="theme-color" content="#000000" />

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W5NP77JK87"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `  
                window.dataLayer = window.dataLayer || [];  
                function gtag(){dataLayer.push(arguments);}  
                gtag('js', new Date());  
                gtag('config', 'G-W5NP77JK87');  
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
