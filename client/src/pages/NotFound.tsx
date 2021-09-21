import React, { ReactElement } from "react";
import Animation from "../components/Animation";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound(): ReactElement {
  useDocumentTitle("Manonaya | Page not found");

  return (
    <div className="not-found screen-center">
      <Animation animation="not-found" width={500} loop={false} />
      <h1>Page not found</h1>
    </div>
  );
}
