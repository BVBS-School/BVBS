import Image from "next/image";
import React, { useEffect, useState } from "react";
import PrincipalImg from "../../../public/About/Principal.png";
import Details from "../api/admin/Details";
import Loader from "@/Component/Loader";

export default function Principal() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const [count,setCount]=useState(0);
  const principle = () => {
    setLoading(true);
    const main = new Details();
    main
      .getprinciple()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.principal);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
        setCount(count+1);
        if(count<=2)
          {
            principle();
          }
      });
  };

  useEffect(() => {
    principle();
  }, []);
  return (
    <div className="bg-[#ECE1C5] py-[50px] md:py-[70px] lg:py-[100px]">
      <div className="container sm:container md:container lg:max-w-[1200px] px-4 lg:px-0 mx-auto">
        <h2 className="merriweather-font font-normal  text-2xl md:text-3xl lg:text-4xl mb-2 text-[#1E1E1E]  tracking-[-0.04em] mb-4 lg:mb-[37px] text-center ">
          Message from the Principal
        </h2>
        {Loading ? (
          <Loader/>
        ) : (
        <div className="flex flex-wrap -mx-2.5 items-center">
          <div className="w-full md:w-6/12 px-2.5 ">
            <div className="text-center">
              <Image
                blurDataURL={`${listing?.photo}?q=1`}
                placeholder="blur"
                className="max-w-full block mx-auto mb-3 md:mb-0"
                alt={listing?.name}
                src={listing?.photo}
                height={500}
                width={407}
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full md:w-6/12 px-2.5">
            <p className="text-[#666666] font-medium text-base lg:text-[20px] lg:leading-[30px] gotham-font mb-5 lg:mb-[28px] tracking-[-0.04em] ">
              <q>{listing?.text}</q>
            </p>
            <p className="libre-baskerville font-normal text-xl md:text-[26px]  mb-0 text-[#EE834E]  tracking-[-0.04em]">
              - {listing?.name}
            </p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
