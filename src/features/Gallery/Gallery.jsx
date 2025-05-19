import { useEffect } from "react";
import { usePixabay } from "../../contexts/PixabayContext";
import { Masonry } from "./Masonry";
import { Image } from "./Image";
import "./Gallery.css"

export const Gallery = () => {
  const { pixabayData, isLoading, errors, loadMore } = usePixabay();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
    if (distanceFromBottom <= 600 && !isLoading) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore, isLoading]);

  return (
    <section className="gallery">
      <Masonry columnsWidth={240} minColumns={2} maxColumns={4} style={{gap: "18px"}}>
        {isLoading && pixabayData.length == 0 ? (
          <p></p>
        ) : errors && pixabayData.length == 0 ? (
          <p>Error: {errors}</p>
        ) : (
          pixabayData?.map((item, index) => (
            <Image
              key={index}
              src={item.webformatURL}
              alt={item.tags}
              href={item.pageURL}
              height={item.webformatHeight}
              className="image"
              style={{ borderRadius: "14px"}}
            />
          ))
        )}
      </Masonry>
    </section>
  );
};
