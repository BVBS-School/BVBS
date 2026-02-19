import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Details from "../api/admin/Details";
import Loader from "@/Component/Loader";

export default function SisterSchools() {
  const images = [
    {
      link: "https://www.gsmsschool.com/",
      imgsrc: "/About/School1.png",
    },
    {
      link: "https://www.pehschool.com/",
      imgsrc: "/About/School2.png",
    },
    {
      link: "https://www.gsbbpreschool.com/",
      imgsrc: "/About/School3.png",
    },
    {
      link: "https://gsisschool.com/",
      imgsrc: "/About/School4.png",
    },
    {
      link: "https://cscollege.co.in/",
      imgsrc: "/About/School5.png",
    },
  ];
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  // const [count,setCount]=useState(0);
  const principle = () => {
    setLoading(true);
    const main = new Details();
    main
      .sisterschoolsGet()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
        // setCount(count+1);
        // if(count<=2)
        //   {
        //     principle();
        //   }
      });
  };

  useEffect(() => {
    principle();
  }, []);
  return (
    <div className="bg-white py-[30px] md:py-[40px] lg:py-[50px]" id="sisterSchools">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <div
          className="bg-[#ECE1C5] pt-[24px] md:pt-[32px] lg:pt-[40px] pb-[20px] md:py-[28px] lg:pb-[28px] px-5 lg:px-10">
          <h2 className="merriweather-font font-normal  text-2xl md:text-3xl lg:text-4xl mb-6 lg:mb-[30px] text-[#1E1E1E]  tracking-[-0.04em] mb-2 capitalize text-center">
            sister schools and colleges in Powai, Mumbai
          </h2>
          {Loading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap -mx-2 lg:-mx-5 justify-center">
              {listing &&
                listing.map((item, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-6/12 lg:w-4/12 px-2 lg:px-8 mb-4 lg:mb-10"
                  >
                    <a target="blank" href={item?.link} className="bg-white flex items-center justify-center h-[212px] p-5">
                      <Image
                        blurDataURL={`${item?.image}?q=1`}
                        placeholder="blur"
                        src={item?.image}
                        className="w-auto max-h-[140px]"
                        height={1000}
                        width={1000}
                        alt="BVBS sister schools"
                        loading="lazy"
                      />
                    </a>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
