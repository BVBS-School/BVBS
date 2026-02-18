import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Details from "../api/admin/Details";
import Image from "next/image";
export default function Slider() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [count, setCount] = useState(0);
  const getbanner = () => {
    setLoading(true);
    const main = new Details();
    main
      .gethomebanner()
      .then((r) => {
        setLoading(false);
        setLisitng([
          ...r?.data?.banners,
          ...r?.data?.banners,
          ...r?.data?.banners,
          ...r?.data?.banners,
          ...r?.data?.banners,
          ...r?.data?.banners,
        ]);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
        // setCount(count + 1);
        // if (count <= 2) {
        //   getbanner();
        // }
      });
  };

  const [Notification, setNotification] = useState([])

  const getNotificationdata = () => {
    setLoading(true);
    const main = new Details();
    main.Notification()
      .then((r) => {
        console.log(r)
        setLoading(false);
        setNotification(r?.data?.Notification);
      })
      .catch((err) => {
        setLoading(false);
        setNotification([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    getbanner();
    getNotificationdata();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="slide-content relative shimmer h-[250px] sm:h-[512px] md:h-[700px]"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          <div className="w-full max-h-[700px] bg-gray-400 shimmer object-cover" />
          <div className="absolute h-full flex items-center left-0 w-full top-1/2 -translate-y-1/2 sliderbg">
            <div className="mx-auto container sm:container md:container lg:max-w-[1204px] px-4">
              <h2 className="merriweather-font font-medium tracking-[-0.04em] text-center text-3xl md:text-4xl lg:text-5xl mb-3 shimmer max-w-[300px] h-[30px] mx-auto rounded-lg" />
              <p className="max-w-[759px] mx-auto font-medium tracking-[-0.04em] text-center text-sm md:text-base lg:text-xl shimmer h-[20px] rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap lg:sticky top-0 lg:top-20 z-[1]">
          <div className="w-full lg:w-8/12 sticky top-20 lg:relative lg:top-0 z-[1]">
            <div className="relative ">
              <div className="absolute h-full flex z-[2] items-center left-0 w-full top-1/2 -translate-y-1/2 sliderbg ">
                <div className="mx-auto container sm:container md:container lg:max-w-[1204px] px-4">
                  <h2 className="merriweather-font font-medium tracking-[-0.04em] text-center text-3xl text-white md:text-4xl lg:text-5xl mb-3">
                    Welcome to Bal Vishwa Bharti School
                  </h2>
                  <p className="max-w-[759px] mx-auto font-medium tracking-[-0.04em] text-white text-center text-sm md:text-base lg:text-xl">At Bal Vishwa Bharti School, we are committed to nurturing young minds through holistic education, fostering academic excellence, and instilling strong moral values to shape the leaders of tomorrow.
                  </p>
                </div>
              </div>
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                // pagination={{ clickable: true }}
                // loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
              >
                {listing &&
                  listing.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="slide-content relative"
                        style={{
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          maxHeight: "700px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        <Image
                          blurDataURL={`${slide.photo}?q=1`}
                          placeholder="blur"
                          src={slide.photo}
                          className="w-full max-h-[700px] object-cover"
                          alt={slide?.heading}
                          layout="responsive"
                          width="1000"
                          height="1000"
                          priority="true"
                        />

                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className="w-full lg:w-4/12 relative z-[5]">
            <div className="bg-[#ECE1C5] py-[30px] lg:py-[40px] px-[30px] lg:px-[50px] min-h-full lg:flex">
              <div className="bg-[#EE834E] flex-col lg:flex lg:flex-wrap  lg:absolute lg:top-[40px] lg:bottom-[40px] lg:left-[50px] lg:right-[50px] notice-bg rounded-lg lg:rounded-[20px]  ">
                <div className="border-b w-full border-white border-opacity-50 py-5 lg:py-6">
                  <h3 className="merriweather-font text-xl lg:text-2xl tracking-[-0.04em] text-center text-white">Circulars</h3>
                </div>
                <div className=" w-full max-h-[500px] lg:max-h-[calc(100%-82px)] custom-scroll-bar overflow-y-auto">
                  <ul>
                    {Notification?.map((item, index) => {
                      return (
                        <li className="[&:not(:last-child)]:border-b border-white border-opacity-50 p-4 lg:p-6" key={index}>
                          <h3 className="font-medium text-white text-base uppercase mb-2">{item?.text}</h3>
                          <p className="line-clamp-2  font-medium text-white text-base mb-3 tracking-[-0.04em] " >{item?.content}</p>
                          <button
                            onClick={() =>
                              window.open(
                                item?.viewLink,
                                "_blank",
                                "noopener,noreferrer"
                              )}
                            className="button-animation-white text-[#EE834E] hover:text-white border border-[#EE834E] hover:border-[#ECCD6E] text-base lg:text-lg rounded px-7 py-2 text-center tracking-[-0.04em]">View</button>
                        </li>
                      );
                    })}

                  </ul>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
      <div className="z-[1] relative bg-[#EE834E] py-[35px] md:py-[40px] lg:py-[62px]">
        <div className="mx-auto container sm:container md:container lg:max-w-[1204px] px-4">
          <div className="grid gap-5 lg:gap-5 grid-cols-3 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-5 lg:flex flex-wrap justify-between ">
            {/* Item 1 */}
            {/* <div className="flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
                520 students
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
                from Nursery to <br /> Grade XII
              </p>
            </div> */}
            {/* Item 2 */}
            <div className="flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
                100% Results
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
                achieved in Grade <br /> X and XII, RBSE 2024
              </p>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
                800
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
                people Assembly <br /> Hall Capacity
              </p>
            </div>
            {/* Item 4 */}
            <div className=" flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
                25:1
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
                student-teacher <br /> ratio
              </p>
            </div>
            {/* Item 5 */}
            <div className="hidden md:flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
                35+
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
                years <br /> in Education
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
