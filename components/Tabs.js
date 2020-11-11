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
          >
            {t}
          </div>
        ))}
      </div>
      <div className="tabs__content">{children[index]}</div>
    </div>
  );
};

export default Tabs;
