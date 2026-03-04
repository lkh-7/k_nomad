import React from "react";

const NextImage = ({
  src,
  alt,
  width,
  height,
  ...props
}: {
  src: string | { src: string };
  alt: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}) => {
  const srcStr = typeof src === "string" ? src : src?.src ?? "";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={srcStr} alt={alt} width={width} height={height} {...props} />;
};

export default NextImage;
