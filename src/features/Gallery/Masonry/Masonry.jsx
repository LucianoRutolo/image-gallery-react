import React, { useEffect, useRef, useState } from "react";
import { useMasonry } from "./useMasonry";

export const Masonry = ({
  children,
  columnsWidth = 0,
  minColumns,
  maxColumns = 4,
  heightSensitive = true,
  className,
  style = {},
}) => {
  const wrapperStyle = {
    display: "inline-flex",
    gap: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
    width: "100%",
    ...style,
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    gap: "inherit",
    flex: "1"
  };

  const wrapperRef = useRef(null);
  const childrenArray = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsWithHeight = childrenArray.map((child) => {
      const height =
        typeof child.props.height === "number" ? child.props.height : 0;
      return {
        element: child,
        height,
      };
    });

    setItems(itemsWithHeight);
  }, [childrenArray]);

  const { columns } = useMasonry(
    items,
    wrapperRef,
    columnsWidth,
    minColumns,
    maxColumns,
    heightSensitive
  );

  return (
    <div ref={wrapperRef} style={wrapperStyle} className={className}>
      {heightSensitive
        ? columns.map((column, index) => (
            <div style={columnStyle} key={index}>
              {column.map((item, idx) => (
                <React.Fragment key={idx}>{item}</React.Fragment>
              ))}
            </div>
          ))
        : columns.map((item, index) => (
            <div style={columnStyle} key={index}>
              {item}
            </div>
          ))}
    </div>
  );
};
