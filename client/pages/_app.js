import "bootstrap/dist/css/bootstrap.css";
import httpClient from "../api/http-client";
import AppBar from "../components/AppBar";

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <div>
      <AppBar currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const context = appContext.ctx;
  const client = httpClient(context);
  const { data } = await client.get("/api/users/current");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(context, client, data.currentUser);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
