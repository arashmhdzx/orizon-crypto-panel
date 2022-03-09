import React, { useState } from 'react'
import { RiHome2Line, RiUser3Line, RiChat3Line,RiArrowUpDownLine } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { BiRightArrow, BiStar, BiHistory } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'


const Nav = () => {

    const icons = [<RiHome2Line />, <RiUser3Line />, <RiChat3Line />, <FiSettings />,
    <BiRightArrow />, <BiStar />, <BiHistory />, <RiArrowUpDownLine />]
    
    const [tab, setTab] = useState(0)

    return (
        <div className='flex flex-col w-20 border-r justify-between'>
            <div className='flex flex-col'>
                <img src="" className='w-4' alt="" />

                <div className='flex flex-col pt-3'>
                    {
                        icons.map((el, index) => (
                            <div key={index} onClick={() => setTab(index)}
                                className={`flex ${index === tab?"text-primary--color ":"text-text-default"} justify-center text-[20px] py-4-m`}>{el}</div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-center py-7">
                <div style={{boxShadow:"0px 30px 20px -6px rgba(0,0,0,0.2)"}} className='flex  text-white p-3 bg-primary--color rounded-bl-lg rounded-br-lg rounded-tr-lg'>
                <AiOutlinePlus/></div>
            </div>
        </div>  
    )
}

export default Nav