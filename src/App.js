// import React, { useState } from "react";
import Nav from "./components/Headers/nav";
import Items from "./components/Items";
import data from "./components/data";

function App() {
  return (
    <div>
      <Nav />
      <div id="content" className="container mx-auto mt-16 lg:mt-0">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-8 gap-5">
          {data.productData.map((item, index) => {
            return (
              <Items
                img={item.img}
                title={item.title}
                price={item.price}
                item={item}
                category={item.category}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
