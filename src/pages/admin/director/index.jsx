import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";

import LoadingData from "../Component/Loading";
import NoData from "../Component/NoData";

import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../Component/Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AdminLayout from "@/layout/AdminLayout";
function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [listing, setLisitng] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    text: "",
    photo: "",
    id: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagedataPreview, setImageDataPreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
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
    const IMGBB_API_KEY = "91cd4460b2a3bdf4a4f231f6609af30b";
    const formdata = new FormData();
    formdata.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formdata }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        setImageUploading(false);
        setError(true);
        return;
      }
      if (data?.data?.url) {
        setImageDataPreview(data.data.url);
        setImageUploading(false);
        setError(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setImageUploading(false);
      setError(true);
    }
  };

  const handlesenddata = (item) => {
    setIsOpen(true);
    setFormdata({
      name: item.name || "",
      text: item.text || "",
      photo: item.photo || "",
      id: item?._id,
    });
    setImagePreview(item.photo);
  };

  const fetchdirectorData = () => {
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
      });
  };

  useEffect(() => {
    fetchdirectorData();
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
      data.append("name", formdata.name);
      data.append("text", formdata.text);
      data.append("photo", imagedataPreview);
      data.append("id", formdata.id);
      const res = await main.editdirector(data);
      if (res?.data?.status) {
        toast.success(res.data.message);
        handleClose();
        fetchdirectorData(); // Refresh data
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
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
            <Header title={"Manage Director"} />
            {/* Overview */}
            <div className="px-4 py-2 lg:px-10 lg:py-2.5">
              {/*  */}
              <div className="bg-white rounded-[20px] mb-[30px]">
                <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                  <h3 className=" text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">
                    Director{" "}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  {Loading ? (
                    <LoadingData />
                  ) : listing?.length < 0 ? (
                    // <Nodata />
                    <>No Data</>
                  ) : (
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                            S. No.
                          </th>
                          <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                            Image
                          </th>
                          <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                            Name
                          </th>
                          <th className="px-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                            Description
                          </th>
                          <th className="pr-4 md:pr-6 lg:pr-10 pl-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em] text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listing?.map((item, index) => (
                          <tr
                            key={item.id}
                            className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100"
                          >
                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                              {index + 1}
                            </td>
                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                              <Image
                                width={200}
                                height={200}
                                src={item?.photo}
                                alt={item?.name}
                              />
                            </td>
                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                              {item?.name}
                            </td>
                            <td className="px-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                              {item?.text}
                            </td>
                            <td className="px-3 py-4 text-[15px] font-medium text-[#46494D] text-center tracking-[-0.03em] space-x-2">
                              <div className="flex space-x-2 justify-center">
                                <button
                                  onClick={() => handlesenddata(item)}
                                  className="text-[#0367F7] h-[30px] w-[30px] bg-[#0367F7] bg-opacity-10 hover:bg-opacity-30 rounded inline-flex items-center justify-center"
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
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] h-auto m-auto">
              <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6 lg:pt-8 lg:pb-6 lg:px-10">
                <h2 className="text-xl lg:text-2xl  text-[#212121] tracking-[-0.04em] font-semibold mb-0">
                  Edit Director{" "}
                </h2>
              </div>
              <div className="py-6 lg:py-8 ">
                <form>
                  <div className=" max-h-full overflow-y-auto customscroll px-6 lg:px-10 ">
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                      />
                    </div>
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Upload Image
                      </label>
                      <img
                        src={imagePreview ? imagePreview : formdata?.photo}
                        alt={formdata?.name}
                        className="w-48 h-48 object-cover rounded-md"
                      />
                    </div>

                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        name
                      </label>
                      <input
                        name="name"
                        value={formdata?.name}
                        onChange={handleChange}
                        type="text"
                        className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                      />
                      {/* <p message={errors?.name} className="!text-red-600" /> */}
                    </div>

                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Desciption
                      </label>
                      <textarea
                        name="text"
                        value={formdata?.text}
                        onChange={handleChange}
                        rows={5}
                        cols={5}
                        className="w-full font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                      ></textarea>
                      {/* <p message={errors?.name} className="!text-red-600" /> */}
                    </div>
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
                        {Loading ? "Submitting.." : "Submit"}
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

export default Index;
