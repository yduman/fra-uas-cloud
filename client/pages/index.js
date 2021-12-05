import httpClient from "../api/http-client";

function HomePage({ currentUser }) {
  return <h1>{currentUser ? "You are logged in!" : "You are logged out"}</h1>;
}

HomePage.getInitialProps = async (context) => {
  const { data } = await httpClient(context).get("/api/users/current");
  return data;
};

export default HomePage;
