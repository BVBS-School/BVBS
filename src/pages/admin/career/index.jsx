import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";
import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import Modal from "../Component/Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loading from "../Component/Loading";
import NoData from "../Component/NoData";
import Link from "next/link";
import AdminLayout from "@/layout/AdminLayout";

function Index() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDeleteClose = () => {
        setIsDeleteOpen(false);
    };


    const handleClose = () => {
        setIsOpen(false);
    };
    const [formData, setFormData] = useState({
        qualification: '',
        experience: '',
        description: '',
        designation: ''
    });
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const vacancygetData = async () => {
        setLoading(true);
        try {
            const main = new Details();
            const response = await main.careerget();
            console.log(response)
            setListing(response?.data.data || []);
        } catch (err) {
            console.error("Error fetching data:", err);
            setListing([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        vacancygetData();
    }, []);




    return (
        <>
            <AdminLayout>
                <div className="md:flex flex-wrap bg-[#F5F6FB] items-start">
                    <SideBarAdmin />
                    <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
                        <Header title={"Manage Career"} />
                        <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                            <div className="bg-white rounded-[20px] mb-[30px]">
                                <div className="py-3 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
                                    <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">Career</h3>

                                </div>
                                <div className="overflow-x-auto">
                                    {loading ? (
                                        <div className="text-center mt-4">
                                            <Loading />
                                        </div>) : (listing.length < 0 ? (
                                            <NoData />
                                        ) : (
                                            <table className="min-w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">S. No.</th>
                                                        <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">Name & Email</th>
                                                        <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">Position</th>
                                                        <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">About</th>
                                                        <th className="pr-4 md:pr-6 lg:pr-10 pl-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">experience</th>
                                                        <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">resume</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listing.map((item, index) => (
                                                        <tr key={item.id} className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                                                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D]">{index + 1}</td>
                                                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D]">{item.name} {item?.surname} {item.email}</td>
                                                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D]">{item.position === "other" ? `Other - ${item.other_position}` : item.position}
                                                            </td>

                                                            <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">{item.about}</td>
                                                            <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">{item.experience}</td>
                                                            <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                                <Link
                                                                    href={item?.resume}
                                                                    target="_blank"
                                                                    className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-3 xl:px-3.5  outline-none focus:outline-none ease-linear transition-all duration-150">
                                                                    Resume
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] m-auto">

                            <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6">
                                <h2 className="text-xl lg:text-2xl text-[#212121] font-semibold">Add New Vacancy</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#212121]">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#212121]">Qualification</label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#212121]">Experience</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#212121]">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-[#0367F7] outline-0"
                                            rows="3"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="text-white button-animation text-sm font-normal tracking-[-0.03em] py-2 px-4 border-0 min-w-[100px] rounded-md"
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal>
                )}
                {isDeleteOpen && (

                    <Modal isOpen={isDeleteOpen} onClose={handleDeleteClose} >
                        <div className="relative bg-white w-full rounded-[30px] lg:rounded-[40px] m-auto">

                            <div className="border-b border-black border-opacity-10 pt-6 pb-5 px-6 lg:pt-8 lg:pb-6 lg:px-10">
                                <h2 className="text-xl lg:text-2xl text-[#212121] tracking-[-0.04em] font-semibold mb-0">
                                    Delete
                                </h2>
                            </div>

                            <div className="py-6 lg:py-8">
                                <div className="max-h-[60vh] overflow-y-auto customscroll px-6 lg:px-10">
                                    <p>Are you sure you want to delete this Services. </p>
                                </div>

                                <div className="flex justify-end px-6 lg:px-10 py-4 space-x-4">
                                    <button
                                        onClick={handleDeleteClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleClick}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                    >
                                        {loading ? "Processing..." : "Delete"}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </AdminLayout>
        </>
    );
}

export default Index;
