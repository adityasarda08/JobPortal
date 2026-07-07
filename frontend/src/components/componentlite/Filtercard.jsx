import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobslice";

const filterdata = [
  {
    filtertype: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Banglore",
      "Hyderabad",
      "Chennai",
      "Pune",
      "Kochi",
      "Nagpur",
      "Jaipur",
      "Ahmedabad",
      "Remote",
    ],
  },
  {
    filtertype: "Technolgy",
    array: [
      "React",
      "frontend",
      "backend",
      "Full Stack",
      "node",
      "mongodb",
      "mongoose",
      "express",
      "javascript",
      "data scientist",
    ],
  },
  {
    filtertype: "Experience",
    array: ["0-2 years", "2-5 years", "5-10 years", "10-15  years"],
  },
  {
    filtertype: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k-300k"],
  },
];

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Filtercard = () => {
  const [selectedvalue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedvalue));
  }, [selectedvalue, dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Filters Jobs
        <hr />
        <RadioGroup value={selectedvalue} onValueChange={handleChange}>
          {filterdata.map((data, index) => (
            <div key={data.filtertype}>
              <h2 className="font-semibold text-lg text-gray-800 mt-4 mb-2">
                {data.filtertype}
              </h2>
              {data.array.map((item, indx) => {
                const itemid = `q${index}-${indx}`;
                return (
                  <div key={item} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={item} id={itemid} />
                    <label htmlFor={itemid} className="text-sm text-gray-700">
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </h1>
    </div>
  );
};

export default Filtercard;
