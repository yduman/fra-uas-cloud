function HomePage({ currentUser, products }) {
  const productCards = products.map((product) => (
    <div className="col-sm-3" key={product.id}>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <p>
        {currentUser
          ? `You are logged in as ${currentUser.email}`
          : "Welcome, please login for more features."}
      </p>
      <h1>Products</h1>
      <div className="row">
        {productCards.length ? (
          productCards
        ) : (
          <p className="ms-1">There are currently no products available.</p>
        )}
      </div>
    </div>
  );
}

HomePage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/products");
  return {
    products: data,
  };
};

export default HomePage;
