import type { Metadata } from "next";
import { Fira_Sans} from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/style/globals.css";
import { SettingsProvider } from "@/contexts/settings-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import Providers from "@/providers/Providers";

const firaSans = Fira_Sans({
  subsets: ['latin'], 
  weight: ['400', '500','600', '700','800','900'], 
  variable: '--font-fira', 
})



export const metadata: Metadata = {
  title: {
    default: "Findbasa",
    template: "%s - Findbasa home",
  },
  description:
    "Findbasa is your ultimate platform for discovering and sharing amazing content.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`antialiased ${firaSans.variable}  `}
        id="mainBodyPart"
      >
        <Providers>
          <SettingsProvider locale="en">
            <SidebarProvider>
              <Toaster
                toastOptions={{
                  style: {
                    boxShadow: "3px 3px 3px rgb(82 82 82)",
                    fontWeight:800
                  },
                }}
              />
              {children}
            </SidebarProvider>
          </SettingsProvider>
        </Providers>
      </body>
    </html>
  );
}
