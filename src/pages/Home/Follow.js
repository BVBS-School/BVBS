import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import axios from "axios";

export default function Follow() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    try {
      const tokenValidityIncrease = axios.get(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`
      );
    } catch (error) {
      console.log("Failed to start render server");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/v21.0/${process.env.NEXT_PUBLIC_INSTAGRAM_ID}/media?fields=id,caption,comments_count,like_count,media_url,video_url,media_type,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`
        );
        const data = await response.json();
        setPosts([...data?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-[#36C9B4] py-[50px] md:py-[70px] lg:py-[100px] z-[1] relative">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <h2 className="merriweather-font font-normal  text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-8 text-black text-center tracking-[-0.04em] capitalize">
          Follow us on Instagram and stay updated
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {posts &&
            posts
              .filter((item) => item?.media_type === "IMAGE" || item?.media_type === "CAROUSEL_ALBUM")
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={item?.permalink}
                    target="blank"
                    className="relative group"
                  >
                    {/* Image */}
                    <img
                      src={item?.media_url}
                      alt="Instagram post"
                      className="w-full h-[300px] sm:h-[270px]"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-sm text-start px-2 break-words overflow-hidden">
                        {item?.caption?.split(" ").slice(0, 10).join(" ")}
                        {item?.caption?.split(" ").length > 10 && " ..."}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
