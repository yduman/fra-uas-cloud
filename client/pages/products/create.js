import { useState } from "react";
import { useRouter } from "next/router";
import useFetch from "../../hooks/useFetch";

export default function CreateProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doFetch, errors } = useFetch({
    url: "/api/products",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => router.push("/"),
  });

  function handleBlur() {
    const priceVal = parseFloat(price);
    if (isNaN(priceVal)) {
      return;
    }
    setPrice(priceVal.toFixed(2));
  }

  function handleSubmit(event) {
    event.preventDefault();
    doFetch();
  }

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label>Price</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            onBlur={handleBlur}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary mt-3">Create</button>
      </form>
    </div>
  );
}
