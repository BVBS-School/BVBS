import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useEffect, useState } from "react";
import Details from "../api/admin/Details";
import Loader from "@/Component/Loader";

export default function Sports() {
  const slides = [
    { bgImage: "/Facilities/Sports1.png" },
    { bgImage: "/Facilities/Sports2.JPG" },
    { bgImage: "/Facilities/Sports3.JPG" },
  ];
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  // const [count,setCount]=useState(0);
  const principle = () => {
    setLoading(true);
    const main = new Details();
    main
      .sportsGet()
      .then((r) => {
        setLoading(false);
        setLisitng([...r?.data?.sport, ...r?.data?.sport,...r?.data?.sport,...r?.data?.sport,...r?.data?.sport,]);
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
    <div className="bg-white pb-[40px] md:pb-[80px] lg:pb-[100px]" id="sports">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
      {Loading ? (
              <Loader />
            ) : (
        <div className="flex flex-wrap items-center bg-[#EE834E]">
          <div className="h-full w-full lg:w-5/12 text-white px-[40px] py-[50px]">
            <div className="">
              <h3 className="merriweather-font font-normal text-base lg:text-xl xl:leading-[25px] mb-6 lg:mb-10 tracking-[-0.04em] text-left">{`"Sports is not just about winning; it's about the passion, the teamwork, the perseverance, and the growth that happens both on and off the field."`}</h3>
              <h4 className="capitalize merriweather-font font-normal text-xl lg:text-2xl xl:leading-[25px] mb-2.5 lg:m-3.5 tracking-[-0.04em] text-left">
                List of sports
              </h4>
              <ul className="list-disc list-inside tracking-[-0.04em] text-base lg:text-lg font-medium pl-4">
                <li>Arm wrestling</li>
                <li>Yoga</li>
                <li>Chess</li>
                <li>Kho-Kho</li>
                <li>Kabaddi</li>
                <li>Handball</li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-7/12 relative custom-swiper-navigation">
            <Swiper
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={true} // Enable navigation
              modules={[Autoplay, Pagination, Navigation]}
            >
              {listing &&
                listing.map((item, index) => (
                  <SwiperSlide
                    className=" lg:!h-[470px]"
                    key={index}
                  >
                    <Image
                      blurDataURL={`${item?.image}?q=1`}
                      placeholder="blur"
                      src={item?.image}
                      alt="Sports"
                      objectFit="cover"
                      className="object-cover w-full min-h-[340px] max-h-[340px] lg:max-h-full lg:!h-[470px]"
                      height={1000}
                      width={1000}
                      loading="lazy"
                    />
                    
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
