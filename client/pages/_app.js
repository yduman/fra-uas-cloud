import "bootstrap/dist/css/bootstrap.css";
import httpClient from "../api/http-client";
import AppBar from "../components/AppBar";

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <div>
      <AppBar currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const context = appContext.ctx;
  const { data } = await httpClient(context).get("/api/users/current");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(context);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
