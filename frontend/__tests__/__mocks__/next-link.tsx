import React from "react";

const NextLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default NextLink;
