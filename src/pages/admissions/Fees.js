import React, { useEffect, useState } from "react";

import Details from "../api/admin/Details";
import Loader from "@/Component/Loader";

export default function Fees() {
  const [Fees, setFees] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const getFeesStruture = () => {
    setLoading(true);
    const main = new Details();
    main
      .getfees()
      .then((r) => {
        setLoading(false);
        setFees(r?.data?.fees);
      })
      .catch((err) => {
        setLoading(false);
        setTeachers([]);
        console.log("error", err);
        setCount(count + 1);
        if (count <= 2) {
          principle();
        }
      });
  };

  useEffect(() => {
    getFeesStruture();
  }, []);

  return (
    <div className="bg-white pb-[40px] md:pb-[80px] lg:pb-[100px]" id="fees">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <h2 className="merriweather-font font-normal  text-2xl md:text-3xl lg:text-4xl mb-3 lg:mb-4 text-[#1E1E1E]  tracking-[-0.04em] text-center">
          Fee Structure
        </h2>
        <div className="overflow-x-auto mb-6 lg:mb-8">
          <table className="border border-gray-200 w-full">
            <thead>
              <tr className="bg-[#36C9B4] text-white">
                <th
                  width="80px"
                  className="text-white text-sm px-3.5 py-5 tracking-[-0.04em] uppercase  font-medium"
                >
                  Sr. No.
                </th>
                <th className="text-white text-sm px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] uppercase font-medium">
                  CLASS
                </th>
                <th
                  width="127px"
                  className="text-white text-sm px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] uppercase font-medium"
                >
                  I
                </th>
                <th
                  width="127px"
                  className="text-white text-sm px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] uppercase font-medium"
                >
                  II
                </th>
                <th
                  width="127px"
                  className="text-white text-sm px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] uppercase font-medium"
                >
                  III
                </th>
                <th
                  width="127px"
                  className="text-white text-sm px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] uppercase font-medium"
                >
                  IV
                </th>
                <th
                  width="150px"
                  className="text-white text-sm px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] uppercase font-medium"
                >
                  Total Fees
                </th>
              </tr>
            </thead>
            {Loading ? (
              <Loader />
            ) : (
              <tbody>
                {Fees &&
                  Fees?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-[#666666] text-base px-3.5 py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {index + 1}
                      </td>
                      <td className="text-[#666666] text-base px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {item?.grade}
                      </td>
                      <td className="text-[#666666] text-base px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {item?.first}
                      </td>
                      <td className="text-[#666666] text-base px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {item?.second}
                      </td>
                      <td className="text-[#666666] text-base px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {item?.third}
                      </td>
                      <td className="text-[#666666] text-base px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {item?.fourth}
                      </td>
                      <td className="text-[#EE834E] text-base px-3.5 lg:px-[30px] py-5 tracking-[-0.04em] border border-black border-opacity-10 font-medium text-center">
                        {item?.total}
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
       <div className="space-y-6 text-[#666666] text-sm lg:text-base">

  <p><b>Note :</b></p>
  <p>1. Admission form fee Rs. 500/- only for new admission.</p>
  <p>2. Admission fee for new student one time only.</p>

  {/* Admission Fee Table */}
  <table className="border border-gray-400 w-full text-center">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Class</th>
        <th className="border p-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="border p-2">Nursery to U.K.G.</td><td className="border p-2">1000</td></tr>
      <tr><td className="border p-2">I to V</td><td className="border p-2">1500</td></tr>
      <tr><td className="border p-2">VI to VIII</td><td className="border p-2">2000</td></tr>
      <tr><td className="border p-2">IX to XII</td><td className="border p-2">2500</td></tr>
    </tbody>
  </table>

  <p>3. Renewal fee Rs. 1000/- for students of X class passed from this school.</p>
  <p>4. Exam Fee -</p>

  {/* Exam Fee Table */}
  <table className="border border-gray-400 w-full text-center">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Class</th>
        <th className="border p-2">October Amount</th>
        <th className="border p-2">January Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="border p-2">Nursery to U.K.G.</td><td className="border p-2">150</td><td className="border p-2">100</td></tr>
      <tr><td className="border p-2">I to V</td><td className="border p-2">300</td><td className="border p-2">200</td></tr>
      <tr><td className="border p-2">VI to VIII</td><td className="border p-2">350</td><td className="border p-2">250</td></tr>
      <tr><td className="border p-2">IX to XII</td><td className="border p-2">600</td><td className="border p-2">400</td></tr>
    </tbody>
  </table>

  <p>5. Sport Fee in April -</p>

  {/* Sport Fee Table */}
  <table className="border border-gray-400 w-full text-center">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Class</th>
        <th className="border p-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="border p-2">I to V</td><td className="border p-2">100</td></tr>
      <tr><td className="border p-2">VI to XII</td><td className="border p-2">200</td></tr>
    </tbody>
  </table>

  <p>6. Conveyance Charges - Only for the students availing conveyance facility.</p>
  <p>7. A late fine of Rs. 10/- per day will be charged if the fee is not deposited by 10th of the quarter/month.</p>

</div>

      </div>
    </div>
  );
}
