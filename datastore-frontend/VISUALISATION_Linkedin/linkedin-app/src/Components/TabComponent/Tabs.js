import React, { useState } from "react";
import TabNavItem from "./TabNavItem.js";
import TabContent from "./TabContent.js";

import LeafletComponent from "../MapComponents/LeafletComponent/LeafletComponent.js";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("leaflet");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="ESIB" id="leaflet" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>

      <div className="outlet">
        <TabContent id="leaflet" activeTab={activeTab}>
          <LeafletComponent></LeafletComponent>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;