import React, { useState } from "react";
import Modal from '../Component/Modal';
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import Details from "@/pages/api/admin/Details";

export default function AddResult({ item, resultgetData }) {
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(item?.photo || null);
    const [imagedataPreview, setImageDataPreview] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        rollNo: item?.rollNo || "",
        name: item?.name || "",
        photo: item?.photo || "",
        grade: item?.grade || "",
        stream: item?.stream || "",
        percentage: item?.percentage || "",
    });

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
        const IMGBB_API_KEY = "91cd4460b2a3bdf4a4f231f6609af30b";
        const formdata = new FormData();
        formdata.append("image", file);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formdata,
                }
            );
            const data = await response.json();
            if (!response.ok || !data.success) {
                setImageUploading(false);
                setError(true);
                return;
            }
            if (data?.data?.url) {
                setImageDataPreview(data.data.url);
                setFormData((prevData) => ({
                    ...prevData,
                    photo: data.data.url,
                }));
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
        record.append("rollNo", formData.rollNo);
        record.append("name", formData.name);
        record.append("photo", formData.photo);
        record.append("grade", formData.grade);
        record.append("stream", formData.stream);
        record.append("percentage", formData.percentage);
        record.append("imagehash", item?.imagehash);
        record.append("_id", item?._id);
        try {
            const main = new Details();
            const response =
                item?._id ? (await main.ResultEdit(record)) : (await main.ResultAdd(record));
            if (response?.data?.status) {
                toast.success(response.data.message);
                handleClose(); // Close any modal or form after success
                resultgetData(); // Refresh or fetch updated result data
            } else {
                toast.error(response.data.message);
            }
            setImageDataPreview("");
            setImagePreview("");
            setFormData({
                qualification: "",
                experience: "",
                description: "",
                designation: "",
            });
        } catch (error) {
            console.log("error", error)
            toast.error(error?.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {item?._id ?
                <div
                    onClick={() => setIsOpen(true)}
                    className=" h-[30px] w-[30px] bg-[#46494D] cursor-pointer text-white button-animation bg-opacity-10 hover:bg-opacity-30 rounded inline-flex items-center justify-center">
                    <BiEdit size={18} />
                </div>
                :
                <button onClick={() => setIsOpen(true)} className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-3 xl:px-3.5  outline-none focus:outline-none ease-linear transition-all duration-150">
                    Add New Result
                </button>
            }
            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] m-auto">
                        <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6">
                            <h2 className="text-xl lg:text-2xl text-[#212121] font-semibold">
                                {item?._id ? "Edit Result" : "Add New Result"}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#212121]">
                                        Student Avatar
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#212121]">
                                        Show Avatar
                                    </label>
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mt-2 w-48 h-48 object-cover text-center"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#212121]">
                                        Grade
                                    </label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        id="class"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Class
                                        </option>
                                        <option value="X">X</option>
                                        <option value="XII">XII</option>
                                    </select>
                                </div>
                                {formData?.grade === "XII" ? (
                                    <div>
                                        <label className="block text-sm font-medium text-[#212121]">
                                            Stream
                                        </label>
                                        <select
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                            name="stream"
                                            value={formData.stream}
                                            onChange={handleChange}
                                            id="class"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Stream
                                            </option>
                                            <option value="arts">Arts</option>
                                            <option value="commerce">Commerce</option>
                                            <option value="science">Science</option>
                                        </select>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-[#212121]">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#212121]">
                                        Roll No.
                                    </label>
                                    <input
                                        type="number"
                                        name="rollNo"
                                        value={formData.rollNo}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#212121]">
                                        Percentage
                                    </label>
                                    <input
                                        type="number"
                                        name="percentage"
                                        value={formData.percentage}
                                        step="0.01"
                                        onChange={(event) => {
                                            const value = Number(event.target.value);
                                            if (Number(value) >= 0 && Number(value) <= 100) {
                                                handleChange(event);
                                            }
                                        }}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                        min={0}
                                        max={100}
                                        required
                                    />
                                </div>

                                <div className="flex justify-end">
                                    {error ? (
                                        <p className="mx-auto text-red-600 capitalize">
                                            Error uploading image. Please try again.
                                        </p>
                                    ) : imageUploading ? (
                                        <p className="mx-auto">Image Uploading in progress...</p>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="text-white button-animation text-sm font-normal tracking-[-0.03em] py-2 px-4 border-0 min-w-[100px] rounded-md"
                                            disabled={imageUploading}
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}