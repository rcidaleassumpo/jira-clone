import "../styles/index.css";
import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../utils/theme";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchInput from "../components/Input/SearchInput";

export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Grid container justify="space-between">
              <Box className="flex items-center" alignItems="center">
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h5">Jira Clone</Typography>
              </Box>
              <Box className="flex" alignItems="center">
                <div className="bg-white rounded w-56 flex">
                  <SearchInput size="small"></SearchInput>
                </div>
                <Button color="inherit">Login</Button>
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
