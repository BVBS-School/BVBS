import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Details from "../api/admin/Details";
import Image from "next/image";
import Link from 'next/link';

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

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Slider (75%) */}
        <div className="w-full lg:w-[75%] relative">
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
                <div className="mx-auto container px-4">
                  <h2 className="merriweather-font font-medium tracking-[-0.04em] text-center text-3xl md:text-4xl lg:text-5xl mb-3 shimmer max-w-[300px] h-[30px] mx-auto rounded-lg" />
                  <p className="max-w-[759px] mx-auto font-medium tracking-[-0.04em] text-center text-sm md:text-base lg:text-xl shimmer h-[20px] rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky top-0 lg:top-5 z-[-1]">
              <div className="absolute h-full flex z-[2] items-center left-0 w-full top-1/2 -translate-y-1/2 sliderbg ">
                <div className="mx-auto container px-4">
                  <h2 className="merriweather-font font-medium tracking-[-0.04em] text-center text-3xl text-white md:text-4xl lg:text-5xl mb-3">
                    Welcome to Bal Vishwa Bharti School
                  </h2>
                  <p className="max-w-[759px] mx-auto font-medium tracking-[-0.04em] text-white text-center text-sm md:text-base lg:text-xl">
                    At Bal Vishwa Bharti School, we are committed to nurturing young minds through holistic education, fostering academic excellence, and instilling strong moral values to shape the leaders of tomorrow.
                  </p>
                </div>
              </div>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
              >
                {listing &&
                  listing.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          blurDataURL={`${slide.photo}?q=1`}
                          placeholder="blur"
                          src={slide.photo}
                          alt={slide?.heading || "School Banner"}
                          layout="fill"
                          objectFit="cover"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* Right Side: Circulars (25%) */}
        <div className="w-full lg:w-[25%] bg-[#EE834E] text-white p-6 relative overflow-hidden">
          {/* Background Texture/Design Elements mimicking screenshot */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-5 rounded-full"></div>

          <h3 className="text-2xl font-serif text-center mb-8 relative z-10 border-b border-white/20 pb-4">
            Circulars
          </h3>

          <div className="space-y-6 relative z-10">
            {/* Item 1 */}
            <div className="border-b border-white/20 pb-6 last:border-0">
              <h4 className="font-bold text-lg uppercase mb-2">ADMISSION OPEN FOR 2025-26</h4>
              <p className="text-sm mb-4 opacity-90">Limited seats are available – Enroll your child today.</p>
              <Link href="/admissions" className="inline-block bg-white text-[#EE834E] font-bold py-2 px-6 rounded shadow hover:bg-gray-100 transition-colors">
                View
              </Link>
            </div>

            {/* Item 2 */}
            <div className="border-b border-white/20 pb-6 last:border-0">
              <h4 className="font-bold text-lg uppercase mb-2">ANNUAL RESULT DAY 2024-25</h4>
              <p className="text-sm mb-4 opacity-90">The result will be declared on 29th March, 2025 between 12:00 noon to 03:00 pm.</p>
              <Link href="/academics#results" className="inline-block bg-white text-[#EE834E] font-bold py-2 px-6 rounded shadow hover:bg-gray-100 transition-colors">
                View
              </Link>
            </div>

            {/* Item 3 */}
            <div className="pb-6">
              <h4 className="font-bold text-lg uppercase mb-2">THE SCHOOL RE-OPENS 2025-26</h4>
              <p className="text-sm mb-4 opacity-90">The school will be reopen on 2nd April, 2025 (Wednesday) between 11:45 am to 03:50 pm.</p>
              <Link href="/academics#calendar" className="inline-block bg-white text-[#EE834E] font-bold py-2 px-6 rounded shadow hover:bg-gray-100 transition-colors">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section (Bottom) */}
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
