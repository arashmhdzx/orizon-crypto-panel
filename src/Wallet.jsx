import React, { useEffect, useState } from 'react'
import callAPI from './services/callAPI'
import Plotly from 'plotly.js-dist-min'



import { FaBitcoin } from 'react-icons/fa'
import { SiEthereum ,SiBinance ,SiLitecoin } from 'react-icons/si'
import { BsSearch, BsBell } from 'react-icons/bs'
import { AiOutlineBarChart } from 'react-icons/ai'
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md'

const Wallet = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [latestPrice, setLatestPrice] = useState(0);

    useEffect(() => {
        fetchData().then((chartData) => {
            setIsLoading(false);
            initChart(chartData);
            setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
        });
        const timerID = setInterval(() => {
            fetchData().then((chartData) => {
                updateChart(chartData);
                setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
            });
        }, 1000 * 30);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const fetchData = async () => {
        let data = { index: [], price: [], volumes: [] };
        let result = await callAPI("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=1m");
        for (const item of result.prices) {
            data.index.push(item[0]);
            data.price.push(item[1]);
        }
        for (const item of result.total_volumes) data.volumes.push(item[1]);
        return data;
    };

    const initChart = (data) => {
        let trace_price = {
            name: "Price ($)",
            x: data.index.map((t) => new Date(t)),
            y: data.price,
            xaxis: "x",
            yaxis: "y1",
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue", size: 3 },
        };

        // let layout = {
        //     autosize: true,
        //     height: "100%",
        //     margin: {
        //         l: 50,
        //         r: 20,
        //         t: 35,
        //         pad: 3,
        //     },
        //     showlegend: false,
        //     xaxis: {
        //         domain: [1, 1],
        //         anchor: "y2",
        //     },
        //     yaxis: {
        //         domain: [0.1, 1],
        //         anchor: "x",
        //     },
        //     yaxis2: {
        //         showticklabels: false,
        //         domain: [0, 0.1],
        //         anchor: "x",
        //     },
        //     grid: {
        //         roworder: "bottom to top",
        //     },
        // };
        let config = { responsive: true };
        let series = [trace_price];
        Plotly.newPlot("chart", series, config);// layout,
    };

    const updateChart = (data) => {
        document.querySelector("#last-price").classList.remove("animate__fadeIn");
        let trace_price = {
            x: [data.index.map((t) => new Date(t))],
            y: [data.price],
        };


        Plotly.update("chart", trace_price, {}, 0);
        Plotly.update("chart1", trace_price, {}, 0);

        document.querySelector("#last-price").classList.add("animate__fadeIn");
    };



    // variables
    var profitPercent = "- 2.4%";
    const apiKey = "037e0512-367d-4971-88df-4c886cb1550a"
    let url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
        qString = "?CMC_PRO_API_KEY=" + apiKey + "symbol=BTC&convert=USD";
    fetch(url + qString)
        .then(response => response.json())
        .then(data => console.log(data));


    const profitIcoFunc = (e) => {
        if (e.charAt(0) === "-") {
            return <div className='flex text-white'>
                <MdArrowDropDown />
                {e}
            </div>
        }
        else if (e.charAt(0) === "+" || !isNaN(e)) {
            return <div className='flex items-center text-white'>
                <MdArrowDropUp />
                {e}
            </div>
        }
        if (e === "0" || e === "0.0") {
            return <div className='flex text-white'>
                {e}
            </div>
        }
    }
    const profitCard = (e) => {
        if (e.charAt(0) === "-") {
            return <div className='flex text-red-600'>
                {e}
            </div>
        }
        else if (e.charAt(0) === "+" || !isNaN(e)) {
            return <div className='flex items-center text-green-600'>
                <MdArrowDropUp />
                {e}
            </div>
        }
        if (e === "0" || e === "0.0") {
            return <div className='flex text-black'>
                {e}
            </div>
        }
    }



    return (
        <div className='w-1/4 flex flex-col bg-body-1'>
            <div className='flex justify-between items-center p-4 px-5'>
                <div className='flex flex-col'>
                    <div className='capitalize text-xl font-bold'>orizon crypto</div>
                    <div className='cardTitles'>Increase your profit</div>
                </div>
                <div className='flex items-center'>
                    <div className='flex p-3 rounded-full text-xl mr-2 bg-white'><BsSearch /></div>
                    <div className='flex p-3 rounded-full text-xl bg-white'><BsBell /></div>
                </div>
            </div>
            <div className='flex m-5 relative '>
                <div className='flex justify-end w-full bg-primary--color rounded-lg h-[150px]'>
                    <div className='w-1/3 rounded-l-full rounded-r-[45rem] bg-[#2425DB] '></div>
                    <div className='flex flex-col w-full h-full p-4 absolute'>
                        <div className="flex flex-col justify-between">
                            <div className='flex justify-between'>
                                <div className='flex capitalize text-white font-bold'>my portofolio</div>
                                <div className='flex items-center text-white text-2xl'>
                                    <AiOutlineBarChart />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='amount py-3 text-white text-2xl'>{"$85,376.50"}</div>
                                <div className='flex items-center'>
                                    {
                                        profitIcoFunc(profitPercent)
                                    }
                                </div>
                            </div>
                            <div className='flex w-full justify-center -mb-[10rem] '>
                                <div className='flex p-3 px-5 font-semibold mx-1 bg-white shadow-lg rounded-lg'>Deposit</div>
                                <div className='flex p-3 px-5 font-semibold mx-1 bg-white shadow-lg rounded-lg'>WithDraw</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full flex-col py-6 px-5'>
                <div className='flex justify-between '>
                    <div className='font-semibold'>Favorites</div>
                    <div className='font-semibold text-blue-600'>{"See All >"} </div>
                </div>
                <div className="flex flex-col mt-2 bg-white rounded-lg p-3 ">
                    <div className='flex  text-3xl self-center items-center'>
                        <FaBitcoin fill='#EF8E19' />
                        <div className='flex pl-4 flex-col text-base'>
                            <div className='font-bold'>BTC</div>
                            <div className='text-[#747474]'>Bitcoin</div>
                        </div>
                    </div>
                    <div className='w-[90%] h-[150px] flex flex-col '>
                        <div id='chart' className='p-0 mainPage-chart m-0'></div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='amount pl-3'>$ {latestPrice}</div>
                        <div className='font-bold pr-3 '>{profitCard(profitPercent)}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col p-5 py-0'>
                <div className='font-bold'>Live Prices</div>
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between mt-2'>
                        <div className='flex items-center'>
                            <div className='flex text-3xl'>
                                <SiEthereum fill='#898EA8' />
                            </div>
                            <div className='flex flex-col ml-3'>
                                <div className='font-bold text-sm '>ETH</div>
                                <div className='font-bold capitalize text-sm text-[#747474]'>ethereum</div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='amount text-sm font-bold pl-3'>$ {latestPrice}</div>
                            <div className='font-bold text-sm pr-3 '>{profitCard(profitPercent)}</div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <div className='flex items-center'>
                            <div className='flex text-3xl'>
                                <SiBinance fill='#EBB42E' />
                            </div>
                            <div className='flex flex-col ml-3'>
                                <div className='font-bold  text-sm '>BNB</div>
                                <div className='font-bold capitalize text-sm text-[#747474]'>binance coin</div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='amount text-sm font-bold pl-3'>$ {latestPrice}</div>
                            <div className='font-bold text-sm pr-3 '>{profitCard(profitPercent)}</div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <div className='flex items-center'>
                            <div className='flex text-3xl text[#325A98]'>
                                <SiLitecoin fill='#325A98' />
                            </div>
                            <div className='flex flex-col ml-3'>
                                <div className='font-bold text-sm uppercase '>ltc</div>
                                <div className='font-bold capitalize text-sm text-[#747474]'>litecoin</div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='amount text-sm font-bold pl-3'>$ {latestPrice}</div>
                            <div className='font-bold text-sm pr-3 '>{profitCard(profitPercent)}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex'>
                <div className='px-3 mt-1 w-full'>
                    {isLoading ? (
                        <h6 className='text-bold'> loading ...</h6>
                    ) : (
                        <>
                            <h2 id='last-price' className=''>
                                $ {latestPrice}
                            </h2>

                        </>
                    )}
                </div>
            </div> */}
        </div>
    )
}

export default Wallet