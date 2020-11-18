import React, { useState } from "react";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const Tabs = ({ children, tabs }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="tabs__container">
      <div className="tabs__header">
        {tabs.map((t, i) => (
          <div
            className={`tabs__tab ${index === i && "tabs__tab-selected"}`}
            onClick={() => setIndex(i)}
            key={i}
          >
            {t}
          </div>
        ))}
      </div>
      {children.map((child, i) => (
        <div
          key={i}
          className={`tabs__content ${index === i && "tabs__content-selected"}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
