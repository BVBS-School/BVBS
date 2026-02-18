import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";
import LoadingData from "../Component/Loading";
import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import Modal from "../Component/Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import NoData from "../Component/NoData";
import Delete from "./Delete";
import Link from "next/link";
import AdminLayout from "@/layout/AdminLayout";
import AddSyllabus from "./AddSyllabus";
import { CiViewBoard } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
function Index() {
    const [isOpen, setIsOpen] = useState(false);
    const [listing, setLisitng] = useState([])
    const [Loading, setLoading] = useState(false)
    const [formdata, setFormdata] = useState({
        "text": "",
        "link": "",
    });

    const handleClose = () => {
        setIsOpen(false);
    };

    const getsyllabusdata = () => {
        setLoading(true);
        const main = new Details();
        main.Sysllabas()
            .then((r) => {
                console.log(r)
                setLoading(false);
                setLisitng(r?.data?.syllabus
                );
            })
            .catch((err) => {
                setLoading(false);
                setLisitng([]);
                console.log("error", err);
            });
    };

    useEffect(() => {
        getsyllabusdata();
    }, []);


    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const main = new Details();
        try {
            const res = await main.SysllabasAdd(formdata);
            if (res?.data) {
                toast.success(res.data.message);
                handleClose();
                getsyllabusdata();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("An error occurred while updating.");
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <AdminLayout>
            <div className="md:flex flex-wrap  bg-[#F5F6FB] items-start">
                <SideBarAdmin />
                {/* right sidebar  */}
                <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
                    <Header title={"Manage Syllabus"} />
                    {/* Overview */}
                    <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                        {/*  */}
                        <div className="bg-white rounded-[20px] mb-[30px]">
                            <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                                <h3 className=" text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">Syllabus  </h3>
                                <AddSyllabus getsyllabusdata={getsyllabusdata} />
                            </div>
                            <div className="overflow-x-auto">
                                {Loading ? (
                                    <LoadingData />
                                ) : (
                                    listing?.length < 0 ? (
                                        // <Nodata />
                                        <NoData />
                                    ) : (
                                        <table className="min-w-full">
                                            <thead>
                                                <tr>
                                                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        S. No.
                                                    </th>
                                                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        Class
                                                    </th>
                                                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        Download
                                                    </th>
                                                    <th className="pr-4 md:pr-6 lg:pr-10 pl-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em] text-center">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listing?.map((item, index) => (
                                                    <tr key={item.id} className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                                                        <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {index + 1}
                                                        </td>
                                                        <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {item?.text
                                                            }
                                                        </td>
                                                        <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            <Link
                                                                href={item?.link}
                                                                target="_blank"
                                                                className="button-animation rounded text-white font-normal tracking-[-0.04em] text-sm font-normal py-2 px-3 xl:px-3.5  outline-none focus:outline-none ease-linear transition-all duration-150">
                                                                Click Here
                                                            </Link>
                                                        </td>


                                                        <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]  tracking-[-0.03em] space-x-2">
                                                            <div className="flex space-x-2 justify-center">
                                                                <a
                                                                    href={item?.viewLink}
                                                                    target="_blank"
                                                                    className=" h-[30px] w-[30px] bg-[#46494D]  text-black  bg-opacity-10 hover:bg-opacity-30 rounded inline-flex items-center justify-center">
                                                                    <FaEye size={18} />
                                                                </a>
                                                                {/* <Delete id={item?._id} getsyllabusdata={getsyllabusdata} /> */}
                                                                <AddSyllabus item={item} getsyllabusdata={getsyllabusdata} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    </>);
}

export default Index;