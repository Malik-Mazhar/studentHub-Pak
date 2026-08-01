import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "../components/authProvider";
import ReduxProvider from "./ReduxProvider";
import SessionProvider from '../components/providers/SessionProviders'
import { ThemeProvider } from "../components/providers/theme-provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        
        <ReduxProvider>
          <AuthProvider>
            <SessionProvider>
              <ThemeProvider>
                {children}
            </ThemeProvider>
           </SessionProvider>
         </AuthProvider>
        <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}




