import Link from 'next/link'
import React from 'react'

export default function AdmissionForm() {
  return (
    <div className='bg-white py-[40px] md:py-[80px] lg:py-[100px]' id="form">
      <div className="container sm:container md:container lg:max-w-[1204px] px-4 mx-auto">
        <div className='bg-[#ECE1C5] py-8 md:py-10 lg:py-14 px-4 md:px-6 lg:px-10 text-center'>
          <p className='text-[#000000] font-medium text-base md:text-lg lg:text-xl mx-auto max-w-[880px] m-6 lg:mb-[34px] lg:leading-6'>Our admission process begins in January and the academic year begins in the first week of April. The Admission form download fee is Rs. 500, and new admissions require a Admission fee of nur-ukg Rs. 1000, I to V Rs. 1500, VI to VIII  Rs. 2000, IX to XII Rs. 2500 , Students renewing after Class X for Grade XI pay a fee of Rs. 1000. Conveyance charges apply for bus pick-up and drop services.</p>
          <Link href="/admissions/apply" className="button-animation rounded px-8 lg:px-8 py-3.5 text-white text-base lg:text-lg font-normal tracking-[-0.04em]">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}
