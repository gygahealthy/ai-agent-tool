import type { AppProps } from "next/app";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from "react";
import { initializeWorkers } from "@/utils/workerManager";
import "@/styles/globals.css";
import { useRouter } from 'next/router'
import * as gtag from '@/lib/gtag'
import { SpeedInsights } from "@vercel/speed-insights/next"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fff",
    },
  },
});

function AppContent({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    initializeWorkers();
  }, []);

  return (
    <ThemeProvider>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent {...props} />
        <SpeedInsights />
      </MUIThemeProvider>
    </ThemeProvider>
  );
}
