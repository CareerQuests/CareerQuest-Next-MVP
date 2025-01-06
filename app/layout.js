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
  metadataBase: new URL("https://careerquest.adhilakbar.in"),
  title: {
    default: "Career Quest - AI-Powered Career Guidance Platform",
    template: "%s | Career Quest",
  },
  description:
    "Find your perfect career path with Career Quest's AI-powered guidance. Get personalized career assessments, industry insights, and professional development plans.",
  keywords: [
    "career guidance",
    "AI career matching",
    "professional development",
    "career assessment",
    "job matching",
    "career planning",
    "career counseling",
    "career development",
    "job search",
    "career path",
  ],
  authors: [{ name: "Career Quest Team" }],
  creator: "Career Quest",
  publisher: "Career Quest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://careerquest.adhilakbar.in",
    title: "Career Quest - AI-Powered Career Guidance Platform",
    description:
      "Find your perfect career path with Career Quest's AI-powered guidance. Get personalized career assessments, industry insights, and professional development plans.",
    siteName: "Career Quest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Career Quest - Your AI Career Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Quest - AI-Powered Career Guidance Platform",
    description:
      "Find your perfect career path with Career Quest's AI-powered guidance. Get personalized career assessments, industry insights, and professional development plans.",
    images: ["/twitter-image.png"],
    creator: "@careerquest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code", // Add your Google verification code
  //   yandex: "your-yandex-verification-code", // Add if needed
  //   bing: "your-bing-verification-code", // Add if needed
  // },
  alternates: {
    canonical: "https://careerquest.adhilakbar.in",
    languages: {
      "en-US": "https://careerquest.adhilakbar.in",
      // Add more language versions if available
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          rel="icon"
          href="/compass-regular.png"
          type="image/png"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/compass-regular.png"
          type="image/png"
          sizes="any"
        />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to important third-party domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Social media verification */}
        <meta
          name="facebook-domain-verification"
          content="your-facebook-verification-code"
        />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Career Quest",
              description: "AI-Powered Career Guidance Platform",
              url: "https://careerquest.adhilakbar.in",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://careerquest.adhilakbar.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W5NP77JK87"
        />
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
