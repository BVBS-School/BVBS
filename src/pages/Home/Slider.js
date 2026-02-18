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
  const [count, setCount] = useState(0);
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
        setCount(count + 1);
        if (count <= 2) {
          getbanner();
        }
      });
  };

  useEffect(() => {
    getbanner();
  }, []);

  const data = [
    {
      text1: "520 students",
      text2: ["from Nursery to ", <br key="1" />, "Grade XII"],
    },
    {
      text1: "100% Results",
      text2: ["achieved in Grade", <br key="2" />, " X and XII, RBSE 2024"],
    },
    {
      text1: "800",
      text2: ["people Assembly", <br key="3" />, "Hall Capacity"],
    },
    {
      text1: "25:1",
      text2: ["student-teacher", <br key="4" />, "ratio"],
    },
    {
      text1: "35+",
      text2: ["years", <br key="5" />, "in Education"],
    },
  ];

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
        <div className="sticky top-0 lg:top-5 z-[-1]">
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
      )}
      <div className="z-[1] relative bg-[#EE834E] py-[35px] md:py-[40px] lg:py-[62px]">
        <div className="mx-auto container sm:container md:container lg:max-w-[1204px] px-4">
          <div className="grid gap-5 lg:gap-5 grid-cols-3 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-5 lg:flex flex-wrap justify-between ">
            {/* Item 1 */}
            <div className="flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
                520 students
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
                from Nursery to <br /> Grade XII
              </p>
            </div>
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
            <div className="hidden md:flex flex-col text-white lg:min-w-[100px]">
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl merriweather-font tracking-[-0.04em] md:mb-2">
              25:1
              </h3>
              <p className="uppercase font-medium tracking-[-0.04em] text-sm md:text-base">
              student-teacher <br/> ratio
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
