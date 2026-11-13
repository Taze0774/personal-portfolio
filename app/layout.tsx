import type { Metadata, Viewport } from "next";
import { Barlow, Oswald } from "next/font/google";
import Intro from "@/components/Intro";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteDescription =
  "Personal developer portfolio of Julian Paul Alzate – Fourth-year BS Information Technology student at STI College Fairview specializing in software development, web systems, and databases.";

export const metadata: Metadata = {
  title: "Julian Paul Alzate | Developer Portfolio",
  description: siteDescription,
  authors: [{ name: "Julian Paul Alzate" }],
  creator: "Julian Paul Alzate",
  keywords: [
    "Julian Paul Alzate",
    "Julian Paul",
    "Developer Portfolio",
    "BSIT STI College Fairview",
    "Software Developer",
    "Next.js",
    "Django",
    "Philippines",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Julian Paul Alzate Portfolio",
    title: "Julian Paul Alzate | Developer Portfolio",
    description: siteDescription,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0C0F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${oswald.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-canvas text-fg font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("intro-seen")==="1"){document.documentElement.dataset.intro="seen"}}catch(e){}',
          }}
        />
        <Intro />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
