import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";
import Nodata from "../Component/Nodata";
import LoadingData from "../Component/Loading";
import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import Modal from "../Component/Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import NoData from "../Component/NoData";
import Delete from "./Delete";
import AdminLayout from "@/layout/AdminLayout";
import Calendar from "./Calendar";
function Banner() {
  const [isOpen, setIsOpen] = useState(false);
  const [listing, setLisitng] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imagedataPreview, setImageDataPreview] = useState(null);
  const [formdata, setFormdata] = useState({
    photo: "",
    heading: "",
    paragraph: "",
    text: "",
  });
  // const[count,setCount]=useState(0);
  const handleClose = () => {
    setIsOpen(false);
  };
  console.log("formData", formdata);

  const BannerGetData = () => {
    setLoading(true);
    const main = new Details();
    main
      .BannerGet()
      .then((r) => {
        console.log("r", r);
        setLoading(false);
        setLisitng(r?.data?.banners);
      })
      .catch((err) => {
        setLoading(false);
        // if(count<=2)
        //   {
        //     setCount(count+1);
        //     BannerGetData();
        //   }
        setLisitng([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    BannerGetData();
  }, []);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 4) {
        alert("File size exceeds 4 MB. Please upload a smaller image.");
        return;
      }
    }
    if (file) {
      setImageUploading(true);
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      uploadImage(file); // Pass the file directly here
    }
  };

  const uploadImage = async (file) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID fa9cff918a9554a");

    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("type", "image");
    formdata.append("title", "Simple upload");
    formdata.append("description", "This is a simple image upload in Imgur");

    try {
      const response = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      });
      if (!response.ok) {
        console.log("Error in ok line");
        setImageUploading(false);
        setError(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //   console.log("response?.data",response);
      //   if (response?.data?.success !== true) {
      //     console.log("Error in success line");
      //     setImageUploading(false);
      //     setError(true);
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      if (data?.data?.link) {
        setImageDataPreview(data.data.link);
        if (data?.data?.link) {
          setImageDataPreview(data.data.link);
          setFormdata((prevData) => ({
            ...prevData,
            photo: data.data.link,
          }));
        }
        setImageUploading(false);
        setError(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setImageUploading(false);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const record = new FormData();
    record.append("heading", formdata?.heading);
    record.append("text", formdata?.text);
    record.append("photo", imagedataPreview);
    const main = new Details();
    try {
      const res = await main.BannerAdd(record);
      if (res?.data) {
        toast.success(res.data.message);
        handleClose();
        BannerGetData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="md:flex flex-wrap  bg-[#F5F6FB] items-start">
          <SideBarAdmin />
          {/* right sidebar  */}
          <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
            <Header title={"Manage  Banner"} />
            {/* Overview */}
            <div className="px-4 py-2 lg:px-10 lg:py-2.5">
              {/*  */}
              <div className="bg-white rounded-[20px] mb-[30px]">
                <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                  <h3 className=" text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">
                    Banner{" "}
                  </h3>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-3 xl:px-3.5  outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Add New Banner
                  </button>
                </div>
                <div className="w-full p-6">
                  {Loading ? (
                    <LoadingData />
                  ) : listing?.length < 0 ? (
                    // <Nodata />
                    <NoData />
                  ) : (
                    <div className="flex flex-wrap -mx-2.5 ">
                      {listing?.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-start w-full sm:w-6/12 lg:w-6/12 xl:w-3/12 px-2.5 mb-3 lg:mb-0"
                        >
                          <div className="w-full bg-[#f9f9f9] mb-4 relative">
                            <img
                              src={item?.photo}
                              alt={item?.heading}
                              className="mx-auto rounded block w-full object-cover h-[207px]"
                            />
                            <div className="absolute top-0 right-0">
                              <Delete
                                className="!rounded-full"
                                srNo={item?.srNo}
                                BannerGetData={BannerGetData}
                              />
                            </div>
                          </div>

                          {/* <h3 className="lg:min-h-[64px] merriweather-font font-normal tracking-[-0.04em] text-xl lg:text-[24px] text-[#1E1E1E] mb-2 lg:mb-2.5">
                            {item?.heading}
                          </h3>
                          <p className="text-[#666666] font-medium text-base gotham-font mb-1.5 tracking-[-0.04em] mb-5 md:mb-6 lg:mb-[30px]  min-h-[107px]">
                            {item?.text}
                          </p> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Calendar />
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] h-auto m-auto">
              <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6 lg:pt-8 lg:pb-6 lg:px-10">
                <h2 className="text-xl lg:text-2xl  text-[#212121] tracking-[-0.04em] font-semibold mb-0">
                  Banner{" "}
                </h2>
              </div>
              <div className="py-6 lg:py-8 ">
                <form>
                  <div className=" max-h-full overflow-y-auto customscroll px-6 lg:px-10 ">
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Banner Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                        required
                      />
                      {/* <p message={errors?.name} className="!text-red-600" /> */}
                    </div>
                    {/* <div className="mb-3 lg:mb-[25px]">
                                        <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">Banner Heading</label>
                                        <input
                                            name="heading"
                                            value={formdata?.heading}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"

                                        />


                                    </div>
                                    <div className="mb-3 lg:mb-[25px]">
                                        <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">Banner paragraph</label>
                                        <textarea
                                            rows={4}
                                            cols={4}
                                            name="text"
                                            value={formdata?.text}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"

                                        />


                                    </div> */}
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-end pt-3 px-6 lg:px-10 ">
                    {error ? (
                      <p className="mx-auto text-red-600 capitalize">
                        Error uploading image. Please try again.
                      </p>
                    ) : imageUploading ? (
                      <p className="mx-auto">Image Uploading in progress...</p>
                    ) : (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full text-white button-animation hover:button-animation hover:bg-white text-[17px] font-medium tracking-[-0.04em] h-11 lg:h-[54px] py-2.5 px-12 border border-button-animation rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
                      >
                        {Loading ? "Processing.." : "Banner"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </AdminLayout>
    </>
  );
}

export default Banner;
