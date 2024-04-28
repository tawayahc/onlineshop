import React from "react";
import { useState } from "react";
import FilterCollapse from "./FilterCollapse";

function FilterSidebar() {
  const fakeData = {
    category:["โทรศัพท์", "หูฟัง", "คีย์บอร์ด", "เสื้อยืด"],
    brands:["Apple", "Samsung", "Xiaomi", "Huawei"],
    review:[1,2,3,4,5]
  }
  return (
    <div>
      <div className="flex flex-col md:w-32 lg:w-72 ">
        <div className="border rounded-lg p-4">
          <FilterCollapse
            title="ประเภทสินค้า"
            type="category"
            onFilterChange={(type, values) => console.log(type, values)}
            data = {fakeData.category}
          />
          <FilterCollapse
            title="แบรนด์"
            type="brands"
            onFilterChange={(type, values) => console.log(type, values)}
            data = {fakeData.brands}
          />
          <FilterCollapse
            title="รีวิว"
            type="review"
            onFilterChange={(type, values) => console.log(type, values)}
            data = {fakeData.review}
          />
          <FilterCollapse
            title="ราคา"
            type="price"
            onFilterChange={(type, values) => console.log(type, values)}

          />
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
