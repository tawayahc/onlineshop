import React, { useEffect } from "react";
import { useState } from "react";
import FilterCollapse from "./FilterCollapse";
import axios from "axios";

function FilterSidebar() {
  const fakeData = {
    category:["โทรศัพท์", "หูฟัง", "คีย์บอร์ด", "เสื้อยืด"],
    brands:["Apple", "Samsung", "Xiaomi", "Huawei"],
    review:[1,2,3,4,5]
  }
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="flex flex-col md:w-32 lg:w-72 ">
        <div className="border rounded-lg p-4">
          <FilterCollapse
            title="ประเภทสินค้า"
            type="category"
            onFilterChange={(type, values) => console.log(type, values)}
            data = {categories}
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
