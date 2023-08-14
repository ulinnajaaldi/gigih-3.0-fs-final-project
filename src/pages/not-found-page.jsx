import React from "react";
import { LayoutMain } from "../components";

const NotFoundPage = () => {
  return (
    <LayoutMain>
      <section className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-bold">Page not found</p>
        </div>
      </section>
    </LayoutMain>
  );
};

export default NotFoundPage;
