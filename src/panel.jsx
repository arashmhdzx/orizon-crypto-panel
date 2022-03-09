import React, { useEffect, useState } from 'react'

import { chartData } from './data/chartData'
import BarChart from './components/BarChart'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './App.css'

import { BiChat, BiLineChart, BiLineChartDown, BiChevronRight } from 'react-icons/bi'
import { BsCalendarCheck } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'
import { MdKeyboardArrowDown, MdOutlineAttachment } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { GrTransaction } from 'react-icons/gr'


import { ReactComponent as Paypal } from './assets/icons/paypal.svg'
import { ReactComponent as PaypalLogo } from './assets/icons/PayPalLogo.svg'
import { ReactComponent as PayWave } from './assets/icons/paywave.svg'
import { ReactComponent as Chips } from './assets/icons/chips.svg'
import { data } from 'autoprefixer';

const Panel = () => {
    // STATES
    const [selectedCard, setSelectedCard] = useState(null);
    const [greet, setGreet] = useState("");
    const [option, setOption] = useState(false);
    const [summaryTab, setSummaryTab] = useState(0);
    const [allActivityTab, setAllActivityTab] = useState(0);
    const [spendingActivityTab, setSpendingActivityTab] = useState(0);
    const [incomingActivityTab, setIncomingActivityTab] = useState(0);
    const [totalSum, setTotalSum] = useState("");
    const [openCal, setOpenCal] = useState(false)
    const [date, setDate] = useState([
        new Date(2021, 8, 11),
        new Date(2021, 8, 13),
    ]);
    const getNthDay = ( date ,nth  ) => {
        var lastDay = new Date(date)
        lastDay.setDate(lastDay.getDate() - nth)
        return lastDay.toDateString()
    }
    // console.log(lastDay.toDateString());

    const [totalIncomeBar, setTotalIncomeBar] = useState({
        labels: chartData.map(data => data.day),
        datasets: [{
            label: "",
            data: chartData.map(data => data.income - data.spend),
            backgroundColor: [
                '#F09F30'
            ]
        }],
    })

    //DATAS
    const optionData = [
        {
            cart: "Visa Cart",
            cartID: "1234123412341234",
            expire: "09/22"
        },
        {
            cart: "PayPal",
            cartID: "1234123412341234",
            expire: "01/24"
        },
        {
            cart: "Master Cart",
            cartID: "1234123412341234",
            expire: "06/25"
        }
    ]

    const summaryTitle = ['activity summary', 'spending summary', 'incoming summary']

    // FUNCTIONS
    const getHour = () => {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 6 && hours < 12)
            setGreet("morning");
        else if (hours >= 12 && hours < 17)
            setGreet("Afternoon");
        else if (hours >= 17 && hours < 24)
            setGreet("Evening");
        else if (hours >= 0 && hours < 6)
            setGreet("Night");
    }

    const cartIdReplace = (e) => {
        var hideID = e.substring(0, 4) + "X".repeat(8) + e.substring(12)
        var spliter = [...hideID].map((d, i) => (i) % 4 == 0 ? ' ' + d : d).join('').trim();
        return spliter
    }

    const cartSelectHandler = (data, editedID) => {
        setSelectedCard({ ...data, cartID: editedID });
    }

    const summarySwitchComponent = (e) => {
        switch (e) {
            case 1:
                return <div>sad</div>
            default:
                return <div></div>
        }
    }

    const kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }

    const totalIncomeSum = () => {
        return chartData.map(item => item.income).reduce((prev, curr) => prev + curr, 0)
    }
    const totalSpendSum = () => {
        return chartData.map(item => item.spend).reduce((prev, curr) => prev + curr, 0)
    }

    const getTotal = () => {
        const totalIncome = totalIncomeSum()
        const totalspend = totalSpendSum()
        setTotalSum(kFormatter(totalIncome - totalspend))
    }

    const transactionChecker = (data) => {
        if (data.charAt(0) === "-") {
            data = data.substring(1)
            return (<div className='amount items-center min-w-[10rem] justify-end text-red-600'>{"- $" + data}</div>);
        } else if (data.charAt(0) === "+" || !isNaN(data)) {
            if (data.charAt(0) === "+") {
                data = data.substring(1)
                return (<div className='amount items-center min-w-[10rem] justify-end text-green-700'>{"+ $" + data}</div>);
            }
            else {
                return (<div className='amount items-center min-w-[10rem] justify-end text-green-700'>{"+ $" + data}</div>);
            }
        }
    }

    //SIDE EFFECT
    useEffect(() => {
        getHour()
        getTotal()
    }, [])


    return (
        <div className='flex flex-col w-3/4'>
            <div className='flex p-4 flex-col'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <img src="" className='ml-4' alt="" />
                        <h2 className='text-lg font-bold'>{`Good ${greet} Arash!`}</h2>
                    </div>
                    <div className='flex'>
                        <div onClick={() => setOption(prev => !prev)} className='flex flex-col'>
                            <div className={`flex p-3 bg-body-1 cursor-pointer select-none w-[200px] rounded-lg ${option && "rounded-b-none"}  justify-between`}>
                                <div className='font-bold text-[13px]'>{selectedCard ? selectedCard.cartID :"Choose Account"}</div>
                                <div className='flex items-center'>{option ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                            </div>
                            {
                                option &&
                                <div className='flex flex-col bg-body-1 cursor-pointer select-none absolute top-[55px] rounded-b-lg w-[200px] option '>
                                    {
                                        optionData.map((item, index) => (
                                            <div key={index} onClick={() => cartSelectHandler(item, cartIdReplace(item.cartID))} className='flex p-3 flex-col'>
                                                <div className='font-bold text-[11px]'>{item.cart}</div>
                                                <div className='font-bold text-[11px]'>{cartIdReplace(item.cartID)}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <div className='flex rounded-lg p-3 text-white bg-primary--color items-center ml-3' ><BiChat /></div>
                    </div>
                </div>
                <div className='flex w-full justify-between py-5 px-3'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center'>
                            <div className='xl-icons bg-green-300'>
                                <BiLineChart />
                            </div>
                            <div className='flex flex-col h-full justify-between'>
                                <p className='cardTitles text-[#747474]'>Total earnings</p>
                                <div className='amount'>$12,384.50</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='xl-icons bg-yellow-100'>
                                <BiLineChartDown />
                            </div>
                            <div className='flex flex-col'>
                                <p className='cardTitles'>Goals for this Month</p>
                                <div className='amount'>$12,384.50</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex w-[330px] relative h-[180px] bg-gradient-to-br from-[#4684c1] 
                        to-[#343174] rounded-xl '>
                            <div className='flex m-auto'>
                                <Paypal height={"150"} />
                            </div>
                            <div className='w-full h-full absolute flex flex-col p-3'>
                                <div className='flex justify-between w-full'><PaypalLogo width={"90px"} /><PayWave width="20px" /></div>
                                <div className='flex mt-5'><Chips width="35px" /></div>
                                <div className='flex justify-center font-[kredit-front] h-[30px] tracking-[5px] mt-2 text-white font-bold text-[18px]'>{selectedCard?.cartID}</div>
                                <div className="flex justify-between font-[kredit] text-white mt-1">
                                    {selectedCard && <div className='flex items-center font-[kredit-front] '><p className='font-bold mr-2'>EXP:</p>{selectedCard?.expire}</div>}
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className='flex'>
                            <div className='xl-icons bg-red-300'>
                                <BiLineChartDown />
                            </div>
                            <div className='flex flex-col'>
                                <p className='cardTitles'>Total spendings</p>
                                <div className='amount'>$12,384.50</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='xl-icons bg-blue-200'>
                                <BiLineChartDown />
                            </div>
                            <div className='flex flex-col'>
                                <p className='cardTitles'>Expected spending </p>
                                <div className='amount'>$12,384.50</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex py-4 border-y w-full '>
                {
                    summaryTitle.map((el, index) => (
                        <div key={index} onClick={() => setSummaryTab(index)} className={`summaryTitles ${index === summaryTab ? "text-black" : ""}`}>{el.toLocaleUpperCase()}</div>
                    ))
                }
            </div>
            <div className='flex w-full'>
                <div className='flex w-2/5 p-3 px-6 border-r'>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between items-center' >
                                <p>Total Profit</p>
                                <div className='amount mx-2'>{"$" + totalSum}</div>
                            </div>
                            <div className='flex w-[300px] mx-auto'>
                                <BarChart chartData={totalIncomeBar} />
                            </div>
                        </div>
                        <div className='flex flex-col pt-2'>
                            <div className='flex my-2 justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='flex p-3 mr-2 rounded-lg bg-purple-300 text-primary--color'><BsCalendarCheck /></div>
                                    <p className='cardTitles'>Monthly Plan</p>
                                </div>
                                <div className='flex p-3 bg-white shadow-custom-1 rounded-lg text-8'><BiChevronRight /></div>
                            </div>
                            <div className='flex my-2 justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='flex p-3 mr-2 rounded-lg bg-purple-300 text-primary--color'><FiSettings /></div>
                                    <p className='cardTitles'>Setting</p>
                                </div>
                                <div className='flex p-3 bg-white shadow-custom-1 rounded-lg text-8'><BiChevronRight /></div>
                            </div>
                            <div className='flex my-2 justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='flex p-3 mr-2 rounded-lg bg-purple-300 text-primary--color'><BsCalendarCheck /></div>
                                    <p className='cardTitles'>Goals</p>
                                </div>
                                <div className='flex p-3 bg-white shadow-custom-1 rounded-lg text-8'><BiChevronRight /></div>
                            </div>
                            <div className='flex my-2 justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='flex p-3 mr-2 rounded-lg bg-purple-300 text-primary--color'><BsCalendarCheck /></div>
                                    <p className='cardTitles'>Shopping</p>
                                </div>
                                <div className='flex p-3 bg-white shadow-custom-1 rounded-lg text-8'><BiChevronRight /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col p-4 w-3/5'>
                    <div className='flex h-fit w-full'>
                        <div className='flex border-b-2 w-full'>
                            <div onClick={() => setAllActivityTab(0)} className={`p-4 pr-6 
                                ${allActivityTab === 0 ? "text-primary--color" : ""} select-none cursor-pointer font-bold`}>History</div>
                            <div onClick={() => setAllActivityTab(1)} className={`p-4
                                ${allActivityTab === 1 ? "text-primary--color" : ""} select-none cursor-pointer font-bold`}>Upcoming</div>
                        </div>
                        <div className='flex h-fit self-end pl-3'>
                            <div onClick={() => setOpenCal(prev => !prev)} className='p-2 bg-body-1 whitespace-nowrap text-[#747474] 
                                text-[10px] rounded-lg select-none cursor-pointer '>{(date[0].toDateString())} - {date[1].toDateString()} </div>
                            {openCal && <div className='flex absolute top-[440px]'>
                                <Calendar onChange={setDate}
                                    selectRange={true} defaultValue={date} />
                            </div>}
                            <div className=' small-icons bg-body-1 mx-2'><FiSettings /></div>
                            <div className=' small-icons bg-primary--color shadow-custom-1 text-white'><AiOutlinePlus /></div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col py-3'>
                            <div className='text-[#747474] text-[12px]'>{date[1].toDateString()}</div>
                            <div className='flex py-3 justify-between'>
                                <div className='flex'>
                                    <div className='flex pt-[5px]'><GrTransaction /></div>
                                    <div className='flex flex-col px-2'>
                                        <div className='font-bold capitalize'>office Supplies</div>
                                        <div className='text-[#747474] text-[12px]'>{date[1].toLocaleTimeString()}</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className='flex items-center small-icons bg-body-1'><MdOutlineAttachment /></div>
                                    {transactionChecker("-10.00")}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col py-3'>
                            <div className='text-[#747474] text-[12px]'>{getNthDay(date[1],1)}</div>
                            <div className='flex py-3 justify-between'>
                                <div className='flex'>
                                    <div className='flex pt-[5px]'><GrTransaction /></div>
                                    <div className='flex flex-col px-2'>
                                        <div className='font-bold capitalize'>sold table</div>
                                        <div className='text-[#747474] text-[12px]'>{date[1].toLocaleTimeString()}</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className='flex items-center small-icons bg-body-1'><MdOutlineAttachment /></div>
                                    {transactionChecker("+200.00")}
                                </div>
                            </div>
                            <div className='flex py-3 justify-between'>
                                <div className='flex'>
                                    <div className='flex pt-[5px]'><GrTransaction /></div>
                                    <div className='flex flex-col px-2'>
                                        <div className='font-bold capitalize'>taxi</div>
                                        <div className='text-[#747474] text-[12px]'>{date[1].toLocaleTimeString()}</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className='flex items-center small-icons bg-body-1'><MdOutlineAttachment /></div>
                                    {transactionChecker("-20.00")}
                                </div>
                            </div>
                            <div className='flex py-3 justify-between'>
                                <div className='flex'>
                                    <div className='flex pt-[5px]'><GrTransaction /></div>
                                    <div className='flex flex-col px-2'>
                                        <div className='font-bold capitalize'>haircut</div>
                                        <div className='text-[#747474] text-[12px]'>{date[1].toLocaleTimeString()}</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className='flex items-center small-icons bg-body-1'><MdOutlineAttachment /></div>
                                    {transactionChecker("-50.00")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Panel