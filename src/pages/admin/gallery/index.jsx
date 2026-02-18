import Header from "../Component/Header";
import SideBarAdmin from "../Component/SideBar";
import React, { useEffect, useState } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Details from "@/pages/api/admin/Details";
import careerbg from "../../../../public/Career/careerbg.jpg";
import Modal from "../Component/Modal";
import Image from "../Component/Image";
import AdminLayout from "@/layout/AdminLayout";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

function Index() {
  const [listing, setLisitng] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagedataPreview, setImageDataPreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(false);
  const [folders, setFolders] = useState([
    "annual Day",
    "assembly",
    "seminars",
    "activities",
    "festivals",
    "recognition-and-awards",
    "school-rooms",
    "special-days",
    "summer-camp",
  ]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [url, setUrl] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]); // Holds images fetched by category

  const [index, setIndex] = useState(0);

  const getGallery = () => {
    setLoading(true);
    const main = new Details();
    main
      .getGallery()
      .then((r) => {
        setLoading(false);
        setLisitng(r?.data?.data); // Changed `setLisitng` to `setListing`
      })
      .catch((err) => {
        setLoading(false);
        setLisitng([]); // Changed `setLisitng` to `setListing`
        console.log("error", err);
      });
  };

  // Fetch images by category
  const getGallerybyCategory = (name) => {
    const main = new Details();
    main
      .getGallerybyCategory(name)
      .then((r) => {
        setLoading(false);
        setData(r?.data?.data); // Save fetched images in `data`
        setShowModal(true); // Only show modal after data is fetched
        setCurrentImageIndex(0); // Reset image index to 0
      })
      .catch((err) => {
        setData([]);
        console.log("error", err);
      });
  };

  useEffect(() => {
    getGallery(); // Fetch all gallery items on mount
  }, []);

  const [isOpen, setIsOpen] = useState(false);
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
  const handleDelete = async (item) => {
    try {
      const main = new Details();
      const record = new FormData();
      record.append("id", item?._id);
      const response = await main.galleryDelete(record);
      if (response?.data?.status) {
        toast.success(response.data.message);
        getGallerybyCategory(item?.caption);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      // alert(error?.response?.data?.message || "An error occurred");
      toast.error(error?.response?.data?.message || "An error occurred");
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
        setUrl(data.data.url);
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
    // const url = await uploadImage(selectedImage);
    // console.log("url",url);
    const record = new FormData();
    record.append("url", url);
    record.append("size", selectedImage.size);
    record.append("name", selectedImage.name);
    record.append("caption", selectedFolder);
    record.append("title", title);
    record.append("description", description);
    try {
      const main = new Details();
      const response = await main.GalleryAdd(record);
      if (response?.data?.status) {
        // toast.success(response.data.message);
        alert(response.data.message);
        handleClose();
      } else {
        // toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      alert(error?.response?.data?.message || "An error occurred");
      // toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryClick = (caption) => {
    getGallerybyCategory(caption);
  };
  return (
    <>
      <AdminLayout>
        <div className="md:flex flex-wrap bg-[#F5F6FB] listings-start">
          <SideBarAdmin />
          {showModal ? (
            <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
              <div className="bg-white rounded-[20px] mb-[30px]">
                <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                  <h3 className="flex gap-3 items-center capitalize text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">
                    <span
                      className="cursor-pointer"
                      onClick={() => setShowModal(false)}
                    >
                      <IoIosArrowRoundBack size={40} />
                    </span>
                    {data[0]?.caption}
                  </h3>
                </div>
              </div>
              <div className="bg-white rounded-[20px] mb-[30px]">
                <div className="py-3 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between listings-center border-b border-black border-opacity-10">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
                    {data &&
                      data.map((item, index) => (
                        <div
                          key={index}
                          className="relative w-full overflow-hidden cursor-pointer"
                        // onClick={() => handleGalleryClick(item?.caption)}
                        >
                          <Image
                            blurDataURL={`${item?.url || careerbg}?q=1`}
                            placeholder="blur"
                            width={387}
                            height={310}
                            src={item?.url || careerbg}
                            alt={item?.name}
                            className="object-cover"
                            loading="lazy"
                          />
                          <div className="galleryBg absolute bottom-0 left-0 h-full w-full z-0"></div>

                          {/* Trash icon */}
                          <div
                            className="absolute top-0 right-0 z-10 cursor-pointer bg-white"
                            onClick={() => handleDelete(item)}
                          >
                            <FaRegTrashCan size={22} color="#FF0000" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
              <Header title={"Gallery"} />
              <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                <div className="bg-white rounded-[20px] mb-[30px]">
                  <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                    <h3 className=" text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">
                      Gallery{" "}
                    </h3>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-3 xl:px-3.5  outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      Add New Gallery
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-[20px] mb-[30px]">
                  <div className="py-3 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between listings-center border-b border-black border-opacity-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
                      {listing &&
                        listing.map((item, index) => (
                          <div
                            key={index}
                            className="relative w-full overflow-hidden cursor-pointer"
                            onClick={() => handleGalleryClick(item?.caption)}
                          >
                            <Image
                              blurDataURL={`${item?.url || careerbg}?q=1`}
                              placeholder="blur"
                              width={387}
                              height={310}
                              src={item?.url || careerbg}
                              alt={item?.name}
                              className="object-cover"
                              loading="lazy"
                            />
                            <div className="galleryBg absolute bottom-0 left-0 h-full w-full z-0"></div>
                            <h3 className="capitalize absolute bottom-4 left-6 right-6 text-white z-10 merriweather-font font-normal text-xl lg:text-2xl">
                              {item?.caption ? item?.caption.replace("-", " ") : ""}
                            </h3>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isOpen && (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <div className="relative bg-white w-full rounded-[40px] lg:rounded-[50px] m-auto">
                <div className="  pt-6 pb-5 px-6">
                  <h2 className="text-lg lg:text-xl text-[#212121] font-semibold">
                    Add New Gallery
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {selectedImage ? (
                      <div className="relative">
                        <button
                          onClick={() => setSelectedImage(false)}
                          className="bg-red-500 px-3 text-[10px] text-white uppercase rounded-lg absolute top-2 right-2 py-2"
                        >
                          Remove
                        </button>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          className="min-h-[230px] w-full block rounded-xl mb-4"
                        />
                      </div>
                    ) : (
                      <div class="flex items-center justify-center w-full">
                        <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                          <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                              <img
                                class="has-mask h-36 object-center"
                                src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                alt="freepik image"
                              />
                            </div>
                            <p class="pointer-none text-gray-500 ">
                              <span class="text-sm">Drag and drop</span> files
                              here <br /> or{" "}
                              <span class="text-blue-600 hover:underline">
                                select a file
                              </span>{" "}
                              from your computer
                            </p>
                          </div>
                          <input
                            onChange={handleImageChange}
                            accept="image/*"
                            type="file"
                            class="hidden"
                          />
                        </label>
                      </div>
                    )}

                    <div>
                      <select
                        onChange={(e) => setSelectedFolder(e.target.value)}
                        className="mt-1 block w-full p-4  bg-gray-100 rounded-md shadow-sm  focus:border-[#0367F7] outline-0"
                      >
                        <option value="">Select Gallery Folder</option>
                        {folders &&
                          folders.map((f, i) => {
                            return (
                              <>
                                <option
                                  className="uppercase"
                                  value={f}
                                  key={`folder-${i}`}
                                >
                                  {f.replaceAll("-", " ")}
                                </option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-4 focus:border-[#0367F7] outline-0"
                      />
                    </div>
                    <div>
                      <textarea
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-4 focus:border-[#0367F7] outline-0"
                      />
                    </div>
                    <div className="flex justify-center">
                      {error ? (
                        <p className="mx-auto text-red-600 capitalize">
                          Error uploading image. Please try again.
                        </p>
                      ) : imageUploading ? (
                        <p className="mx-auto">Image Uploading in progress...</p>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          className="text-white button-animation text-sm font-normal rounded-xl w-full tracking-[-0.03em] p-3 border-0 min-w-[100px] rounded-md"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default Index;
