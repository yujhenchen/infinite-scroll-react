import { useState, useEffect } from "react";
import { Info } from "./types";

function App() {
  const [items, setItems] = useState<Info[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState(null);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    setIsLoading(true);
    // setError(null);

    try {
      const response = await fetch(`https://catfact.ninja/facts?page=${page}`);
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.fact}</li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {/* {error && <p>Error {error.message}</p>} */}
    </div>
  );
}

export default App;
