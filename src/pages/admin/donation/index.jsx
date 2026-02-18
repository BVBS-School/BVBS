import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";
import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import Modal from "../Component/Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loading from "../Component/Loading";
import NoData from "../Component/NoData";
import AdminLayout from "@/layout/AdminLayout";

function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    photo: "",
    description: "",
  });
  const [listing, setListing] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imagedataPreview, setImageDataPreview] = useState(null);
  const router = useRouter();
  const [deltedata, setDelete] = useState("");

  const handleDeleteClose = () => setIsDeleteOpen(false);
  const handleClose = () => setIsOpen(false);
  const donationgetData = async () => {
    setLoadingData(true);
    try {
      const main = new Details();
      const response = await main.donationget();
      setListing(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setListing([]);
    } finally {
      setLoadingData(false); // Stop loading after data fetching
    }
  };

  useEffect(() => {
    donationgetData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        setError(false)
      }
    } catch (error) {
      console.error('Error:', error);
      setImageUploading(false);
      setError(true);
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true); // Start loading for form submission
    try {
      const main = new Details();
      const record = new FormData();
      record.append('name', formData?.name);
      record.append('description', formData?.description);
      record.append('price', formData?.price);
      record.append('photo', imagedataPreview);
      const response = await main.donationadd(record);
      if (response?.data?.status) {
        toast.success(response.data.message);
        handleClose();
        donationgetData();
      } else {
        toast.error(response.data.message);
      }
      setFormData({
        name: "",
        price: "",
        photo: "",
        description: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.data?.message || "An error occurred");
    } finally {
      setLoadingSubmit(false); // Stop loading after form submission
    }
  };

  const handleopen = (item) => {
    setIsDeleteOpen(true);
    setDelete(item);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoadingDelete(true);
    const main = new Details();
    const response = main.donationdelete({ srNo: deltedata });
    response
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
          handleDeleteClose();
          donationgetData();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "An error occurred");
      })
      .finally(() => setLoadingDelete(false));
  };

  return (
    <>
      <AdminLayout>
        <div className="md:flex flex-wrap bg-[#F5F6FB] items-start">
          <SideBarAdmin />
          {/* right sidebar */}
          <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
            <Header title={"Manage Donation"} />
            {/* Overview */}
            <div className="px-4 py-2 lg:px-10 lg:py-2.5">
              <div className="bg-white rounded-[20px] mb-[30px]">
                <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
                  <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">
                    Donation
                  </h3>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-3 xl:px-3.5 outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Add New Donation
                  </button>
                </div>
                <div className="w-full p-6">
                  {loadingData ? ( // Show loading only for data fetching
                    <Loading />
                  ) : listing?.length === 0 ? ( // No data condition
                    <NoData />
                  ) : (
                    <div className="flex flex-wrap -mx-2.5">
                      {listing?.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-start w-full sm:w-6/12 lg:w-6/12 xl:w-3/12 px-2.5 mb-3 lg:mb-0"
                        >
                          <div className="w-full bg-[#f9f9f9] mb-4 relative">
                            <img
                              src={item?.photo}
                              alt={item?.heading}
                              className="mx-auto rounded block w-full object-cover h-[207px]"
                            />
                            <div className="absolute top-0 right-0">
                              <button
                                onClick={() => handleopen(item?.srNo)}
                                className="text-[#FF1B1B] h-[30px] w-[30px] bg-[#FF1B1B] bg-opacity-10 hover:bg-opacity-30 rounded inline-flex items-center justify-center"
                              >
                                <svg
                                  width="16"
                                  height="18"
                                  viewBox="0 0 16 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                                    fill="#FF1B1B"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <h3 className="lg:min-h-[64px] merriweather-font font-normal tracking-[-0.04em] text-xl lg:text-[24px] text-[#1E1E1E] mb-2 lg:mb-2.5">
                            {item?.name}
                          </h3>
                          <p className="text-[#EE834E] text-lg lg:text-xl tracking-[-0.04em] uppercase mb-4 lg:mb-5">
                            Amount: {item?.price}
                          </p>
                          <p className="text-[#666666] font-medium text-base gotham-font mb-1.5 tracking-[-0.04em] mb-5 md:mb-6 lg:mb-[30px] min-h-[107px]">
                            {item?.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Donation Modal */}
        {isOpen && (
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] h-auto m-auto">
              <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6 lg:pt-8 lg:pb-6 lg:px-10">
                <h2 className="text-xl lg:text-2xl  text-[#212121] tracking-[-0.04em] font-semibold mb-0">
                  Add New Donation{" "}
                </h2>
              </div>
              <div className="py-6 lg:py-8 ">
                <form onSubmit={handleSubmit}>
                  <div className=" max-h-full overflow-y-auto customscroll px-6 lg:px-10 ">
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Dontaion Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                        required
                      />
                    </div>
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Donation Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-11 lg:h-[54px]  appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Donation price
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={(e) => {
                          if (
                            /^[0-9]*$/.test(e.target.value)
                          ) {
                            handleChange(e);
                          }
                        }}
                        maxLength="10"
                        className="w-full h-11 lg:h-[54px]  appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="mb-3 lg:mb-[25px]">
                      <label className="font-medium text-sm lg:text-base tracking-[-0.03em] block text-[#8D929A] mb-1 lg:mb-2">
                        Dontaion Description
                      </label>
                      <textarea
                        rows={5}
                        cols={5}
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full h-11 lg:h-[54px]  appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                        placeholder="Enter description"
                      />
                    </div>
                    {error ? (
                      <p className="mx-auto text-red-600 capitalize">
                        Error uploading image. Please try again.
                      </p>
                    ) : imageUploading ? (
                      <p className="mx-auto">Image Uploading in progress...</p>
                    ) : (
                      <div className="flex justify-start">
                        <button
                          type="submit"
                          className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-4 outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                          {loadingSubmit ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteOpen && (
          <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
            <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] m-auto">
              <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6">
                <h2 className="text-xl lg:text-2xl text-[#212121] font-semibold">
                  Confirm Deletion
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <p>Are you sure you want to delete this donation?</p>
                <button
                  onClick={handleClick}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  disabled={loadingDelete}
                >
                  {loadingDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AdminLayout>
    </>
  );
}

export default Index;
