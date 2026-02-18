import Details from "@/pages/api/admin/Details";
import Header from "../Component/Header";
import LoadingData from "../Component/Loading";
import SideBarAdmin from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import NoData from "../Component/NoData";
import AdminLayout from "@/layout/AdminLayout";
function Index() {
    const [listing, setLisitng] = useState([])
    const [Loading, setLoading] = useState(false)
    const getPayment = () => {
        setLoading(true);
        const main = new Details();
        main.paymentget()
            .then((r) => {
                setLoading(false);
                setLisitng(r?.data?.Payment);
            })
            .catch((err) => {
                setLoading(false);
                setLisitng([]);
                console.log("error", err);
            });
    };

    useEffect(() => {
        getPayment();
    }, []);


    return (<>
        <AdminLayout>
            <div className="md:flex flex-wrap  bg-[#F5F6FB] items-start">
                <SideBarAdmin />
                {/* right sidebar  */}
                <div className="w-full lg:ml-[304px] lg:w-[calc(100%-304px)]">
                    <Header title={"Payment History"} />
                    {/* Overview */}
                    <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                        {/*  */}
                        <div className="bg-white rounded-[20px] mb-[30px]">
                            <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                                <h3 className=" text-base lg:text-lg font-semibold text-[#1E1E1E] mb-3 sm:mb-0 tracking-[-0.03em]">Payment  </h3>

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
                                                        Date
                                                    </th>
                                                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        Payment ID
                                                    </th>
                                                    <th className="pl-4 md:pl-6 lg:pl-10 pr-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        Order Id
                                                    </th>
                                                    <th className="px-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        Type
                                                    </th>
                                                    <th className="px-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em]">
                                                        Name
                                                    </th>
                                                    <th className="pr-4 md:pr-6 lg:pr-10 pl-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em] text-center">
                                                        Amount
                                                    </th>
                                                    <th className="pr-4 md:pr-6 lg:pr-10 pl-3 py-3 lg:py-3.5 text-sm font-medium text-[#8D929A] text-left uppercase tracking-[-0.03em] text-center">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listing?.map((item, index) => (
                                                    <tr key={item.id} className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100">
                                                        <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {index + 1}
                                                        </td>
                                                        <td className=" whitespace-nowrap pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {
                                                                moment(item?.payment_date).format("Do MMM YY")
                                                            }
                                                        </td>
                                                        <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {item?.payment_id}
                                                        </td>
                                                        <td className="pl-4 md:pl-6 lg:pl-10 pr-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {item?.order_id
                                                            }
                                                        </td>
                                                        <td className="capitalize px-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {item?.type}
                                                        </td>
                                                        <td className="px-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {item?.product_name}
                                                        </td>
                                                        <td className="px-3 py-4 text-[15px] font-medium text-[#46494D] tracking-[-0.03em]">
                                                            {item?.amount
                                                            }
                                                        </td>
                                                        <td className={`capitalize px-3 py-4 text-[15px] font-medium tracking-[-0.03em] ${item?.payment_status === 'success' ? 'text-green-500' :
                                                            item?.payment_status === 'failed' ? 'text-red-500' :
                                                                item?.payment_status === 'pending' ? 'text-yellow-500' :
                                                                    'text-[#46494D]'
                                                            }`}>
                                                            {item?.payment_status}
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