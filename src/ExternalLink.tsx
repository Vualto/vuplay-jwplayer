import React from "react";

export default function ExternalLink({ href, children }) {
  return (
    <a href={href} target="blank">
      {children}
    </a>
  );
}
