import React, { useRef, useState } from "react";
import Image from "next/image";
import InquiryformBanner from "../../../public/Contacts/InquiryformBanner.png";
import ReCAPTCHA from "react-google-recaptcha";
import Details from "../api/admin/Details";
import toast from "react-hot-toast";

function EnquirySec() {
  const recaptcha = useRef(null);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = recaptcha.current.getValue(); // Get the captcha token
    if (!token) {
      toast.error("Please complete the CAPTCHA.");
      return; // Stop form submission if CAPTCHA is not completed
    }
    setLoading(true);
    const main = new Details();
    try {
      const res = await main.inquiryAdd(formdata);
      if (res?.data) {
        toast.success(res.data.message);
        setFormdata({
          name: "",
          email: "",
          message: "",
          contact: "",
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-[50px] md:pb-[70px] lg:pb-[100px]">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <div className="flex flex-wrap items-stretch -mx-3 grid-cols-4">
          <div className="w-full lg:w-6/12 px-3 mb-6 lg:mb-0">
            <img
              src={InquiryformBanner.src || InquiryformBanner}
              alt="img"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          <div className="w-full lg:w-6/12 px-3">
            <div className="bg-[#ECE1C5]">
              <div className="px-4 lg:px-[30px] py-4 lg:py-[24px] border-b border-black border-opacity-10">
                <h2 className="merriweather-font font-normal text-2xl md:text-3xl lg:text-4xl mb-1 text-[#1E1E1E] tracking-[-0.04em]">
                  Make An Inquiry
                </h2>
                <p className="text-black font-medium text-base tracking-[-0.04em] mb-0">
                  Explore partnership opportunities or space rental with BVBS
                  School. Complete the enquiry form to connect with us and
                  discuss your needs.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="px-4 lg:px-[30px] py-4 lg:py-[24px]">
                <div className="mb-4 lg:mb-5">
                  <label className="inline-block text-base text-[#1E1E1E] tracking-[-0.04em] opacity-80 mb-2 lg:mb-2.5 uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    className="border border-black border-opacity-10 px-3.5 py-2 w-full h-11 lg:h-14 appearance-none h-11 lg:h-[54px] text-[#1E1E1E] tracking-[-0.04em] leading-tight focus:outline-none"
                  />
                </div>
                <div className="mb-4 lg:mb-5">
                  <label className="inline-block text-base text-[#1E1E1E] tracking-[-0.04em] opacity-80 mb-2 lg:mb-2.5 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formdata.email}
                    onChange={handleChange}
                    className="border border-black border-opacity-10 px-3.5 py-2 w-full h-11 lg:h-14 appearance-none h-11 lg:h-[54px] text-[#1E1E1E] tracking-[-0.04em] leading-tight focus:outline-none"
                  />
                </div>
                <div className="mb-4 lg:mb-5">
                  <label className="inline-block text-base text-[#1E1E1E] tracking-[-0.04em] opacity-80 mb-2 lg:mb-2.5 uppercase">
                    Contact no
                  </label>
                  <input
                    type="text"
                    required
                    name="contact"
                    value={formdata.contact}
                    onChange={(e) => {
                      if (
                        e.target.value.length <= 10 &&
                        /^[0-9]*$/.test(e.target.value)
                      ) {
                        handleChange(e);
                      }
                    }}
                    maxLength="10"
                    className="border border-black border-opacity-10 px-3.5 py-2 w-full h-11 lg:h-14 appearance-none h-11 lg:h-[54px] text-[#1E1E1E] tracking-[-0.04em] leading-tight focus:outline-none"
                  />
                </div>
                <div className="mb-4 lg:mb-5">
                  <label className="inline-block text-base text-[#1E1E1E] tracking-[-0.04em] opacity-80 mb-2 lg:mb-2.5 uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formdata.message}
                    onChange={handleChange}
                    className="border border-black border-opacity-10 px-3.5 py-2 w-full h-11 lg:h-14 appearance-none h-32 lg:h-[157px] text-[#1E1E1E] tracking-[-0.04em] leading-tight focus:outline-none"
                  ></textarea>
                </div>
                <div className="flex flex-wrap -mx-4">
                  <div className="px-4  items-center w-full lg:w-7/12">
                    <ReCAPTCHA className="g-recaptcha"
                      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                      ref={recaptcha}
                    />
                  </div>
                  <div className="px-4 items-center w-full lg:w-5/12 lg:text-right">
                    <button
                      type="submit"
                      className="button-animation rounded px-8 lg:px-12 py-2 lg:py-3.5 text-white text-base lg:text-lg font-normal tracking-[-0.04em]"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EnquirySec;
