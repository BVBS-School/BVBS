import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";
import LoadingData from "../Component/Loading";
import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import Modal from "../Component/Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import NoData from "../Component/NoData";
import Link from "next/link";
import Image from "next/image";

function ComingSchool() {
  const [isOpen, setIsOpen] = useState(false);
  const [listing, setLisitng] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    text1: "",
    text2: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagedataPreview, setImageDataPreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(false);

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
        setImageUploading(false);
        setError(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // if (!response?.data?.success) {
      //   setImageUploading(false);
      //   setError(true);
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      const data = await response.json();
      if (data?.data?.link) {
        setImageDataPreview(data.data.link);
        setImageUploading(false);
        setError(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setImageUploading(false);
      setError(true);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setFormdata({
      text1: "",
      text2: "",
    });
    setImagePreview(null);
    setSelectedImage(null);
  };

  const handleopen = (listing) => {
    setIsOpen(true);
    setFormdata({
      text1: listing.text1 || "",
      text2: listing.text2 || "",
    });
    setImagePreview(listing.image);
  };
  const CommingSoonGetData = () => {
    setLoading(true);
    const main = new Details();
    main
      .comingsoonsGet()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    CommingSoonGetData();
  }, []);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const main = new Details();
      const data = new FormData();
      data.append("text1", formdata.text1);
      data.append("text2", formdata.text2);
      data.append("photo", imagedataPreview);
      const res = await main.comingsoonEdit(data);
      if (res?.data?.status) {
        toast.success(res.data.message);
        handleClose();
        CommingSoonGetData(); // Refresh data
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleShow = async (currentStatus) => {
    setLoading(true);
    const main = new Details();
    try {
      const newStatus = !currentStatus;
      const res = await main.comingsoonshow({ show: newStatus });
      if (res?.data) {
        toast.success("Status updated successfully");
        CommingSoonGetData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-4 py-2 lg:px-10 lg:py-2.5">
        <div className="bg-white rounded-[20px] mb-[30px]">
          <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between listings-center border-b border-black  border-opacity-10">
            <h3 className=" text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">
              Coming Soon{" "}
            </h3>
          </div>

          {listing?.show === true && (
            <div className="relative">
              <Image
                blurDataURL={`${listing?.image}?q=1`}
                placeholder="blur"
                className="w-full object-cover"
                height={300}
                width={300}
                src={listing?.image}
                alt="img"
                loading="lazy"
              ></Image>
              <div className="absolute h-full flex items-center left-0 w-full top-1/2 -translate-y-1/2 bg-black bg-opacity-30 ">
                <div className="mx-auto container sm:container md:container lg:max-w-[1204px] px-4 text-center">
                  <h2 className="capitalize merriweather-font font-normal text-xl sm:text-2xl md:text-4xl lg:text-[60px] mb-0 text-[#ECE1C5] tracking-[-0.04em] ">
                    {listing?.text1}
                    {/* <h2 className="uppercase text-[50px] sm:text-[60px]  md:text-[100px]  lg:text-[141px] text-[#E6E6E6] merriweather-font font-normal tracking-[-0.04em]">Coming Soon</h2> */}
                    <span className="capitilaze text-white block mt-3 ">
                      {listing?.text2}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          )}
          <div className="w-full p-6">
            {Loading ? (
              <LoadingData />
            ) : listing?.length < 0 ? (
              <NoData />
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                      Image
                    </th>
                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                      Text1
                    </th>

                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                      Text2{" "}
                    </th>
                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                      Show
                    </th>
                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                      <Image
                        src={listing.image}
                        alt="coming soon image"
                        width={300}
                        height={300}
                      />
                    </td>

                    <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                      {listing.text1}
                    </td>
                    <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                      {listing.text2}
                    </td>

                    <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                      <button
                        onClick={() => handleToggleShow(listing.show)}
                        className={`px-3 py-1 rounded ${listing.show
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          }`}
                      >
                        {listing.show ? "True" : "False"}
                      </button>
                    </td>
                    <td className="px-3 py-4 text-[15px] font-medium text-[#46494D] text-center tracking-[-0.03em] space-x-2">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => handleopen(listing)}
                          className="text-[#0367F7] h-[30px] w-[30px] bg-[#0367F7] bg-opacity-10 hover:bg-opacity-30 rounded inline-flex listings-center justify-center"
                        >
                          <svg
                            className="inline"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 14.5349L8.413 14.5199L18.045 4.97988C18.423 4.60188 18.631 4.09988 18.631 3.56588C18.631 3.03188 18.423 2.52988 18.045 2.15188L16.459 0.565875C15.703 -0.190125 14.384 -0.186125 13.634 0.562875L4 10.1049V14.5349ZM15.045 1.97988L16.634 3.56288L15.037 5.14488L13.451 3.55988L15.045 1.97988ZM6 10.9389L12.03 4.96588L13.616 6.55188L7.587 12.5229L6 12.5279V10.9389Z"
                              fill="#0367F7"
                            />
                            <path
                              d="M2 18.5219H16C17.103 18.5219 18 17.6249 18 16.5219V7.85388L16 9.85388V16.5219H5.158C5.132 16.5219 5.105 16.5319 5.079 16.5319C5.046 16.5319 5.013 16.5229 4.979 16.5219H2V2.52188H8.847L10.847 0.521875H2C0.897 0.521875 0 1.41888 0 2.52188V16.5219C0 17.6249 0.897 18.5219 2 18.5219Z"
                              fill="#0367F7"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] h-auto m-auto">
              <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6 lg:pt-8 lg:pb-6 lg:px-10">
                <h2 className="text-xl lg:text-2xl text-[#212121] tracking-[-0.04em] font-semibold mb-0">
                  Comming Soon
                </h2>
              </div>
              <div className="py-6 lg:py-8">
                <form onSubmit={handleSubmit}>
                  <div className="max-h-full overflow-y-auto customscroll px-6 lg:px-10">
                    {/* Form fields */}
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Image:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mt-2 w-48 h-48 object-cover text-center"
                        />
                      )}
                    </div>
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Text1
                      </label>
                      <input
                        name="text1"
                        value={formdata?.text1}
                        onChange={handleChange}
                        type="text"
                        className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                      />
                    </div>
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Text2
                      </label>
                      <input
                        name="text2"
                        value={formdata?.text2}
                        onChange={handleChange}
                        type="text"
                        className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="px-6 lg:px-10 mb-3 lg:mb-8">
                    {error ? (
                      <p className="mx-auto text-red-600 capitalize">
                        Error uploading image. Please try again.
                      </p>
                    ) : imageUploading ? (
                      <p className="mx-auto">Image Uploading in progress...</p>
                    ) : (
                      <button
                        type="submit"
                        className="w-full text-white button-animation hover:button-animation hover:bg-white text-[17px] font-medium tracking-[-0.04em] h-11 lg:h-[54px] py-2.5 px-12 border border-button-animation rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
                      >
                        {Loading ? "Loading.." : "Submit"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default ComingSchool;
