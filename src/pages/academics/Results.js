import Image from "next/image";
import React, { useEffect, useState } from "react";
import Details from "../api/admin/Details";
import Loader from "@/Component/Loader";
const ProfileCard = ({ percentage, name, imagesrc }) => {
  return (
    <div className="text-center list px-4 mb-5 xl:mb-0">
      <Image
       blurDataURL={`${imagesrc}?q=1`}
                      placeholder="blur"
        className="max-w-full mx-auto rounded-full h-[120px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[210px] lg:w-[210px] object-cover object-top block mb-6 md:mb-8 lg:mb-10"
        src={imagesrc}
        alt={name}
        width={210}
        height={210}
        loading="lazy"
      />
      <h3 className="text-[#EE834E] merriweather-font font-normal tracking-[-0.04em] text-center mb-1 text-lg md:text-xl lg:text-2xl">
        {percentage}%
      </h3>
      <p className="text-[#1E1E1E] text-sm md:text-base font-medium uppercase tracking-[-0.04em]">
        {name}
      </p>
    </div>
  );
};

export default function Results() {
  const [selected, setSelected] = useState("arts"); 

  const handleSelect = (category) => {
    setSelected(category);
  };
  const [result, SetResult] = useState([]);
  const [Loading, setLoading] = useState(false);

  const XIIdata = {
    science: [
      {
        percentage: "96.33%",
        name: "Science Student 1",
        imagesrc: "/Academic/Student.png",
      },
      {
        percentage: "95.67%",
        name: "Science Student 2",
        imagesrc: "/Academic/Student.png",
      },
    ],
    commerce: [
      {
        percentage: "96.33%",
        name: "Commerce Student 1",
        imagesrc: "/Academic/Student.png",
      },
      {
        percentage: "95.67%",
        name: "Commerce Student 2",
        imagesrc: "/Academic/Student.png",
      },
    ],
    Arts: [
      {
        percentage: "96.33%",
        name: "Arts Student 1",
        imagesrc: "/Academic/Student.png",
      },
      {
        percentage: "95.67%",
        name: "Arts Student 2",
        imagesrc: "/Academic/Student.png",
      },
    ],
  };
  const resultmanage = async () => {
    setLoading(true);
    const main = new Details();
    const response = main.ResultGet();
    try {
      const res = await response;
      SetResult(res?.data?.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resultmanage();
  }, []);
  return (
    <div className="pb-[40px] md:pb-[80px] lg:pb-[100px] bg-white">
      <div
        className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto"
        id="results"
      >
        <h2 className="merriweather-font font-normal capitalize text-2xl md:text-3xl lg:text-4xl mb-6 lg:mb-[36px] text-[#1E1E1E]  tracking-[-0.04em] text-center">
          100% results
        </h2>
        <h3 className="tracking-[-0.04em] merriweather-font text-[#1E1E1E] text-lg md:text-xl lg:text-2xl mb-6 lg:mb-[36px] text-center">
          Grade X
        </h3>
        {Loading ? (
              <Loader />
            ) : (
        <div className="flex flex-wrap result-box text-center justify-center  ">
          {result &&
            result
              .filter((item) => item.grade === "X")
              .map((item, index) => (
                <ProfileCard
                  key={index}
                  percentage={item.percentage}
                  name={item.name}
                  imagesrc={item.photo}
                />
              ))}
        </div>
        )}
        <div className="pt-12 mt-12 border-t border-black border-opacity-10">
          <h3 className="tracking-[-0.04em] merriweather-font text-[#1E1E1E] text-lg md:text-xl lg:text-2xl mb-4 text-center">
            Grade XII
          </h3>
          <div className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 mb-8 justify-center">
            <button
              className={`md:min-w-[104px] lg:min-w-[164px] px-4 py-2 border font-medium tracking-[-0.04em] rounded-lg md:rounded-xl text-sm sm:text-base ${
                selected === "arts"
                  ? "bg-[#EE834E] border-[#EE834E] text-white"
                  : "border-[#9A9A9A] text-[#9A9A9A]"
              }`}
              onClick={() => handleSelect("arts")}
            >
              ARTS
            </button>
            <button
              className={`md:min-w-[104px] lg:min-w-[164px] px-4 py-2 border font-medium tracking-[-0.04em] rounded-lg md:rounded-xl text-sm sm:text-base ${
                selected === "commerce"
                  ? "bg-[#EE834E] border-[#EE834E] text-white"
                  : "border-[#9A9A9A] text-[#9A9A9A]"
              }`}
              onClick={() => handleSelect("commerce")}
            >
              COMMERCE
            </button>
            <button
              className={`md:min-w-[104px] lg:min-w-[164px] px-4 py-2 border font-medium tracking-[-0.04em] rounded-lg md:rounded-xl text-sm sm:text-base ${
                selected === "science"
                  ? "bg-[#EE834E] border-[#EE834E] text-white"
                  : "border-[#9A9A9A] text-[#9A9A9A]"
              }`}
              onClick={() => handleSelect("science")}
            >
              SCIENCE
            </button>
          </div>
          {/* {XIIdata && XIIdata[selected] && ( */}
          {Loading ? (
              <Loader />
            ) : (
          <div className="flex flex-wrap result-box text-center justify-center  ">
            {result &&
              result
                .filter(
                  (item) => item.grade === "XII" && item.stream === selected
                )
                .map((item, index) => (
                  <ProfileCard
                    key={index}
                    percentage={item.percentage}
                    name={item.name}
                    imagesrc={item.photo}
                  />
                ))}
          </div>
          )}
          {/* // )} */}
        </div>
      </div>
    </div>
  );
}
