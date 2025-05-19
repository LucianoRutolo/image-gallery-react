import { useEffect, useState } from "react";

export const Image = ({ src, alt, href, height, className, style = {} }, key) => {
  const containerStyle = {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    ...style,
  };

  const anchorStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div className={className} key={key} style={containerStyle}>
      <a href={href} target="_blank" style={anchorStyle} />
      <img src={src} alt={alt} style={imageStyle} />
    </div>
  );
};
