import axios from "axios";
import { useState } from "react";

export default function useFetch({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  async function doFetch() {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Error</h4>
          <ul className="my-0">
            {error.response.data.errors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return { doFetch, errors };
}
