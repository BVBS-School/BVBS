import Image from 'next/image'
import React from 'react'

export default function Infrastructure() {
    const infraData=[
        {
            title: 'Science Laboratories',
            imgsrc:"/Facilities/Icon1.png",
            description: 'Equipped with dedicated laboratory for Physics, Chemistry, and Biology to foster hands-on learning.'
        },
        {
            title: 'CCTV security',
            imgsrc:"/Facilities/Icon2.png",
            description: 'Comprehensive CCTV surveillance to ensure safety and security across the school campus.'
        },
        {
            title: 'Computer Laboratory',
            imgsrc:"/Facilities/Icon3.png",
            description: 'State-of-the-art computer laboratory to enhance digital literacy and technical skills.'
        },
        {
            title: 'Assembly Hall',
            imgsrc:"/Facilities/Icon4.png",
            description: 'Spacious assembly hall for gatherings, events, and cultural activities.'
        },
        {
            title: 'Smart Classrooms',
            imgsrc:"/Facilities/Icon5.png",
            description: 'Interactive smart classrooms for an engaging and modern learning experience.'
        },
        {
            title: 'Library',
            imgsrc:"/Facilities/Icon6.png",
            description: 'A well-stocked library fostering a love for reading and knowledge exploration.'
        },
        {
            title: 'Air-conditioned classrooms for pre-primary',
            imgsrc:"/Facilities/Icon7.png",
            description: 'Comfortable air-conditioned pre-primary classrooms to ensure a cool learning environment.'
        },
        {
            title: 'Children Play Area',
            imgsrc:"/Facilities/Icon8.png",
            description: 'A fun and safe play area designed to nurture physical development and playfulness.'
        },
    ]
  return (
    <div className="container mt-10 bg-[#ECE1C5]">
        <div>
        <h2>Infrastructure</h2>
        <p>BVBS School offers state-of-the-art infrastructure, including modern classrooms, advanced science and computer laboratories, and a serene Saraswati Mandir. Our campus is designed to create a conducive environment for holistic education and the overall development of our students.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
            {infraData && infraData?.map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                    <Image src={item?.imgsrc} alt={item?.title} width={30} height={30}/>
                    <h3>{item?.title}</h3>
                    <p>{item?.description}</p>
                </div>
            ))}
        </div>
        </div>
  )
}