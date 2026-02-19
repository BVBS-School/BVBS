import React, { useEffect, useState } from "react";
import Details from "../api/admin/Details";
import Image from "next/image";
import Loader from "@/Component/Loader";

export default function Directors() {
  const [listing, setLisitng] = useState("");
  const [Loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const director = () => {
    setLoading(true);
    const main = new Details();
    main
      .getdirector()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.director);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
        setCount(count + 1);
        if (count <= 2) {
          director();
        }
      });
  };

  useEffect(() => {
    director();
  }, []);
  // const profiles = [
  //   {
  //     name: "Prashant Sharma",
  //     image: "/About/Director1.jpg",
  //     quote: "Throughout its history, the Gopal Sharma Group of Schools has changed tremendously not only in the number of students it teaches but also in the quality of teaching and other extracurricular activities. I aim to provide the best high-quality education with a friendly and supportive environment to give shape to a promising and confident young breed of future citizens."
  //   },
  //   {
  //     name: "Dikshant Sharma",
  //     image: "/About/Director2.jpeg",
  //     quote: "The world's future rests upon the quality of its youth, so it has always been our endeavour to raise children of quality and purpose, to make them the kind of citizens the world needs today. We emphasise on building values, nurturing talents and developing strong academics among students. We not only teach students, we empower them."
  //   },
  //   {
  //     name: "Himanshu Sharma",
  //     image: "/About/Director3.jpeg",
  //     quote: "I believe the right educational environment is crucial for a child's development. Inspired by my late grandfather Shri Gopal Sharma's vision, we've created schools in Mumbai and Jaipur with ample natural light and play spaces. My father, Mr. Prashant Sharma, and uncle, Mr. Dikshant Sharma, continue this legacy."
  //   },
  //   {
  //     name: "Yugank Sharma",
  //     image: "/About/Director4.jpeg",
  //     quote: "Our School caters to students hailing from diverse Socio-Economic backgrounds. We believe that education cannot be merely reduced to cramming of syllabus but the evolution of a child in a holistic manner. As an educational institution, it becomes imperative for us to see that children are given opportunities to exhibit and nurture their talents."
  //   }
  // ];
  return (
    <div
      className="bg-white pb-[50px] md:pb-[70px] lg:pb-[100px]"
      id="directors"
    >
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <h2 className="merriweather-font font-normal  text-2xl md:text-3xl lg:text-4xl mb-2 text-[#1E1E1E]  tracking-[-0.04em] mb-4 lg:mb-5 text-center ">
          Directors Desk
        </h2>
        {Loading ? (
          <Loader/>
        ) : (
          <div className="mx-auto lg:px-4 py-8 grid lg:grid-cols-2 gap-3.5 lg:gap-5">
            {listing &&
              listing.map((profile, index) => (
                <div
                  className="flex border border-gray-100 !shadow-sm director-box bg-[#ECE1C5]"
                  key={index}
                >
                  <div className="w-full sm:w-1/3 md:w-1/2 bg-white">
                    <Image
                      blurDataURL={`${profile.photo}?q=1`}
                      placeholder="blur"
                      className="max-h-[350px] sm:max-h-full object-top max-w-full h-full object-cover !w-full"
                      src={profile.photo}
                      height={379}
                      width={285}
                      alt={profile.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 md:w-1/2 flex flex-col px-3.5 lg:px-[14px] py-3.5 lg:py-[26px]">
                    <h2 className="merriweather-font font-normal text-xl md:text-2xl  mb-2 text-[#1E1E1E]  tracking-[-0.04em] mb-2 lg:mb-2.5">
                      {profile.name}
                    </h2>
                    <p className="text-[#666666] font-medium text-base gotham-font mb-0 tracking-[-0.04em]">
                      <q>{profile.text}</q>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
