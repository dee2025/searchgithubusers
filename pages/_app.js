import "/styles/globals.css";
 
import { ThemeProvider } from "@material-tailwind/react";
 
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
