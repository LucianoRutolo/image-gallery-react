import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../shared/hooks/useFetch";

export const PixabayContext = createContext();

export const PixabayProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_PIXABAY_KEY;
  const [pixabayData, setPixabayData] = useState([]);
  const [query, setQuery] = useState("wallpaper");
  const [orientation, setOrientation] = useState("default");
  const [page, setPage] = useState(1);

  const q =
    query.split(" ").length !== 0 ? `&q=${query.split(" ").join("+")}` : "";
  const url = `https://pixabay.com/api/?key=${apiKey}${q}${
    orientation ? `&orientation=${orientation}` : ""
  }&safesearch=true&page=${page}`;
  const { data, isLoading, errors } = useFetch(url);

  useEffect(() => {
    if (!data.hits || data.hits.length === 0) return;
    setPixabayData((prevData) => {
      const newData = data.hits.filter(
        (newImage) =>
          !prevData.some((existingImage) => existingImage.id === newImage.id)
      );
      return [...prevData, ...newData];
    });
  }, [data]);

  const loadMore = () => setPage((currPage) => currPage + 1);

  const startFetching = (search) => {
    setPixabayData([]);
    setQuery(search);
    setPage(1);
  };

  return (
    <PixabayContext.Provider
      value={{ pixabayData, isLoading, errors, loadMore, startFetching }}
    >
      {children}
    </PixabayContext.Provider>
  );
};

export const usePixabay = () => {
  return useContext(PixabayContext);
};
