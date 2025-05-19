import { useState, useEffect, useCallback } from "react";

export const useMasonry = (
  items,
  wrapperRef = null,
  width,
  minCols,
  maxCols,
  heightSensitive = false
) => {
  const [columns, setColumns] = useState([]);
  const [columnsCount, setColumnsCount] = useState(4);
  const [columnsWidth, setColumnsWidth] = useState(width);
  const [containerWidth, setContainerWidth] = useState(
    wrapperRef?.current ? wrapperRef.current.offsetWidth : 1200
  );
  const [columnsCountLimit, setColumnsCountLimit] = useState({
    min: 1,
    max: 5,
  });

  const distributeItems = () => {
    const newColumns = Array.from({ length: columnsCount }, () => []);
    items.forEach(({ element }, index) => {
      newColumns[index % columnsCount].push(element);
    });
    setColumns(newColumns);
  };

  const distributeItemsByHeight = () => {
    const cols = Array.from({ length: columnsCount }, () => []);
    const heights = Array(columnsCount).fill(0);
    items.forEach(({ element, height }) => {
      const minIndex = heights.indexOf(Math.min(...heights));
      cols[minIndex].push(element);
      heights[minIndex] += height;
    });
    setColumns(cols);
  };

  const calculateColumnsCount = useCallback(() => {
    if (columnsWidth <= 0 || containerWidth <= 0) return;
    const posibleColumns = Math.floor(containerWidth / columnsWidth);
    setColumnsCount(
      Math.min(
        columnsCountLimit.max,
        Math.max(columnsCountLimit.min, posibleColumns)
      )
    );
  }, [columnsWidth, containerWidth, columnsCountLimit]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (wrapperRef?.current) {
        setContainerWidth(wrapperRef.current.offsetWidth);
      }
    };

    updateContainerWidth();

    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [wrapperRef]);

  useEffect(() => {
    if (heightSensitive) {
      distributeItemsByHeight();
    } else {
      distributeItems();
    }
  }, [items, columnsCount]);

  useEffect(() => {
    calculateColumnsCount();
  }, [columnsWidth, containerWidth]);

  useEffect(() => {
    setColumnsWidth(width);
  }, [width]);

  useEffect(() => {
    const min = Math.max(minCols ?? 1, 1);
    const max = Math.max(maxCols ?? min, min);
    setColumnsCountLimit({ min, max });
  }, [minCols, maxCols]);

  useEffect(() => {
    calculateColumnsCount();
  });

  return {
    columns,
  };
};
