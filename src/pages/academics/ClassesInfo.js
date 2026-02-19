import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";

export default function ClassesInfo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqItems = [
    {
      title: "1. Pre Primary (Nursery, LKG, UKG)",
      Subtitle: "Learners Aged: 3 - 6 years",
      content:
        "Learning is truly fun and exhilarating at Bal Vishwa Bharti School. We provide numerous opportunities for our young minds, aged 3 to 6, to explore, discover, and innovate. Our uniquely designed curriculum fosters a healthy, safe, and stimulating environment for each child's holistic development. Our enthusiastic learners acquire and develop a wide range of skills across all domains - physical and motor, language, cognitive, social, and emotional - enriching their imaginative, intellectual, and aesthetic abilities while enhancing their innate capabilities.",
      bgImages: [
        "/Academic/Pre1.JPG",
        "/Academic/Pre2.JPG",
        "/Academic/Pre3.jpg",
      ],
    },
    {
      title: "2. Primary (Grade I - Grade V) ",
      Subtitle: "Learners Aged 6  Years – Class I",
      content: `At BVBS, we believe that knowledge is actively constructed by the student, not passively absorbed from textbooks. In our primary classes, 'hands-on' learning is essential for developing lifelong competencies. Following the RBSE curriculum, we design activities that cater to children's interests—communication, inquiry, construction, and artistic expression. Aligned with our philosophy, "Let learning be a joy and teaching a pleasure," we enrich education through field trips, experiments, hobbies, and life skills, aiming to develop each child's potential and prepare them for a rapidly evolving world.`,
      bgImages: [
        "/Academic/primaryimg01.jpg",
        "/Academic/primaryimg02.jpg",
        "/Academic/primaryimg03.jpeg",
      ],
    },
    {
      title: "3. Secondary (Grade VI - Grade X)  ",
      Subtitle: "Learners Aged: 11 - 15 years",
      content: `At BVBS, we focus on shaping students during their Secondary School years, a crucial period of intellectual and emotional growth. Following the RBSE curriculum, our 'graded learning' and 'project work' approaches cater to each student's strengths and interests, while educational excursions and co-curricular activities enhance the learning experience. Leadership and teamwork are emphasised through the Student Council. The holistic programme encourages critical thinking and includes Socially Useful Productive Work (SUPW) and community service, alongside career guidance through the Mindler platform.`,
      bgImages: [
        "/Academic/Secondary1.jpg",
        "/Academic/Secondary2.JPG",
        "/Academic/Secondary3.jpg",
      ],
    },
    {
      title: "4. Senior Secondary (Grade XI - Grade XII)  ",
      Subtitle: "Learners Aged: 15 - 18 years",
      content: `At Bal Vishwa Bharti School, our Senior Secondary section goes beyond academics by offering a diverse range of co-curricular and extra-curricular activities that play a crucial role in shaping our students into well-rounded, confident individuals. Students can engage in a variety of pursuits, including sports, arts, dance, and debate, which not only foster creativity and self-expression but also promote teamwork, leadership, and time management skills. Additionally, our school encourages participation in cultural events, science fairs, and inter-school competitions, enabling students to gain exposure to diverse experiences and build their confidence.`,
      bgImages: [
        "/Academic/Senior1.JPG",
        "/Academic/Senior2.JPG",
        "/Academic/Senior3.JPG",
      ],
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };
  return (
    <>
      <div className="pb-[40px] md:pb-[80px] lg:pb-[90px]  bg-white" id="education">
        <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto ">
          <ul>
            {faqItems &&
              faqItems.map((item, index) => (
                <li
                  key={index}
                  className="[&:not(:last-child)]:mb-5 bg-[#ECE1C5] "
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full relative flex justify-between items-start text-[#1E1E1E]  text-left  merriweather-font pl-4 md:pl-8 lg:pl-12 py-4 lg:py-6 pr-[40px] md:pr-[50px] lg:pr-[60px] text-xl md:text-3xl lg:text-4xl font-normal focus:outline-none tracking-[-0.04em]"
                  >
                    {item.title}
                    {activeIndex === index ? (
                      <FaMinus className="text-[#1E1E1E] absolute top-[23px] lg:top-[36px] right-[20px] md:right-[30px] lg:right-[40px]" size={18} />
                    ) : (
                      <FaPlus className="text-[#1E1E1E] absolute top-[23px] lg:top-[36px] right-[20px] md:right-[30px] lg:right-[40px]" size={18} />
                    )}
                  </button>
                  {activeIndex === index && (
                    <div className="px-4 md:px-8 lg:px-12  py-4 lg:py-6  leading-[22px] border-t border-black border-opacity-10">
                      <h3 className="tracking-[-0.04em] merriweather-font text-black text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4">
                        {item?.Subtitle}
                      </h3>
                      <p className="text-[#666666] gotham-font text-base font-medium mb-5 md:mb-6 lg:mb-[30px]">
                        {item?.content}
                      </p>
                      <div className="flex flex-wrap -mx-3.5">
                        {/* Loop through bgImages array */}
                        {item?.bgImages &&
                          item?.bgImages.map((bgImage, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="w-full md:w-4/12 px-2.5 mb-3 md:mb-0"
                            >
                              <Image
                                blurDataURL={`${bgImage}?q=1`}
                                placeholder="blur"
                                className="block mx-auto mb-6 h-[233px] object-cover"
                                src={bgImage}
                                alt={`img-${imgIndex}`}
                                width={1000}
                                height={1000}
                                loading="lazy"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <div className="mt-6">
            <h4 className="text-[#EE834E] mb-1 lg:mb-1.5 merriweather-font font-normal tracking-[-0.04em] text-xl lg:text-2xl">
              School Timings: Monday to Saturday
            </h4>
            <ul className="text-[#666666] gotham-font font-sm lg:font-base tracking-[-0.04em] font-medium  list-disc pl-5 space-y-1">
              <li>Summer - 8:00am - 1:30pm </li>
              <li>Winter - 8:30am - 2:00pm</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
