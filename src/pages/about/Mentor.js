import Image from "next/image";
import React from "react";
import MentorImg from "../../../public/About/Mentor.png";

export default function Mentor() {
  return (
    <div className="bg-white pb-[30px] md:pb-[40px] lg:pb-[50px]" id="mentor">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <h2 className="merriweather-font font-normal  text-2xl md:text-3xl lg:text-4xl mb-2 text-[#1E1E1E]  tracking-[-0.04em] mb-4 lg:mb-5 text-center ">
          Our Mentor
        </h2>
        <div className="text-center">
          <Image
            blurDataURL={`${MentorImg}?q=1`}
            placeholder="blur"
            className="block mx-auto mb-4 lg:mb-6 max-w-full"
            src={MentorImg}
            alt="Shri Gopal Sharma"
            width={317}
            height={396}
            loading="lazy"
          />
          <h4 className="merriweather-font font-normal text-xl md:text-2xl  mb-2 text-[#EE834E]  tracking-[-0.04em] mb-2 lg:mb-2.5 text-center">
            Shri Gopal Sharma
          </h4>
          <p className="text-[#1E1E1E] mb-4 md:mb-6 gotham-font tracking-[-0.04em] font-medium">
            (08/07/1938 - 24/01/1998)
          </p>
          <div className="text-[#EE834E] gotham-font font-medium italic  tracking-[-0.04em] mb-6">
            “EDUCATE A CHILD AND DISCOVER A PERSONALITY.”
          </div>
        </div>
        <div className="max-w-[965px] mx-auto">
          <p className="text-[#666666] font-medium text-base  gotham-font text-center mb-1.5 tracking-[-0.04em]">
            This was the dream nurtured by Shri Gopal Sharma and today this
            dream has materialised and is taking shape in the form of our
            school. He was born in Jaipur on 8th July, 1938 to an educationist
            father, Shri Chandra Bhan Sharma and a pious mother Smt. Durga Devi
            Sharma. After a humble beginning he rose to carve a niche in the
            society.
          </p>
          <p className="text-[#666666] font-medium text-base  gotham-font text-center mb-1.5 tracking-[-0.04em]">
            Qualities like fearlessness and honesty were deep-rooted in his mind
            from early childhood. After his initial schooling in Jaipur, he
            completed his formal education from Mumbai University. Editor,
            theatre personality, social worker and a successful business person,
            all rolled into one, he was a multi-faceted man with numerous
            talents.
          </p>
          <p className="text-[#666666] font-medium text-base  gotham-font text-center mb-1.5 tracking-[-0.04em]">
            A hard-working and resourceful person, he was determined to make a
            mark in the field of education. He firmly believed in the concept
            that quality education should be imparted to all and this resulted
            in the birth of Powai English School at Powai.
          </p>
          <p className="text-[#666666] font-medium text-base  gotham-font text-center mb-1.5 tracking-[-0.04em]">
            During his lifetime, Shri Gopal Sharma worked for the upliftment of
            the downtrodden. The long journey started by Shri Gopal Sharma in
            the field of education, is today spearheaded by his sons, Shri
            Prashant Sharma and Shri Dikshant Sharma.
          </p>
        </div>
      </div>
    </div>
  );
}
