import {motion} from "framer-motion";
import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import {IconCurrencyLira, IconUpload} from "@tabler/icons-react";
import {HomeContext} from "../../../contexts/Home.Context.jsx";
import placeHolder from '../../../assets/images/placeholder.png';

const HomePageCard = ({data}) => {
    const {visibleCardIds} = useContext(HomeContext);

    const [isMyTurn, setIsMyTurn] = useState(false);
    const [isDataVisible, setIsDataVisible] = useState(false);

    const onAnimationComplete = () => {
        setIsDataVisible(true);
    };

    useEffect(() => {
        if (data.id in visibleCardIds) {
            setIsMyTurn(true);
        }
    }, [data, visibleCardIds]);

    return (
        <div className='w-full h-full aspect-square'>
            {!isMyTurn && !isDataVisible && <CardPlaceholder onAnimationComplete={onAnimationComplete}/>}
            {isMyTurn && isDataVisible && (<>
                <div className='flex flex-col gap-y-2'>
                    <div className='relative w-full aspect-square rounded-xl'>
                        <img className='bg-slate-200 rounded-xl'
                             src={placeHolder}
                             width={1000}
                             height={1000}
                             alt={`https://picsum.photos/1024?random=${data.id}`}/>
                        <div className='absolute top-0 w-full flex flex-row items-center justify-between p-4 '>
                            <CardCountDownTimer/>
                            <button
                                className='appearance-none w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:scale-110 hover:bg-white transition ease-in-out duration-75'>
                                <IconUpload size={18}/>
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-6'>
                        <div className='h-7 col-span-4'>
                            <p className='whitespace-nowrap overflow-hidden text-ellipsis font-medium text-md capitalize'>
                                {data.title}
                            </p>
                        </div>
                        <div className='h-7 col-span-4'>
                            <p className='whitespace-nowrap overflow-hidden text-ellipsis text-slate-500 text-sm'>
                                Ev Sahibi: {data.body}
                            </p>
                        </div>
                        <div className='h-7 col-span-4'>
                            <div className='flex flex-row items-center'>
                                <p className='whitespace-nowrap overflow-hidden text-ellipsis text-black font-semibold text-sm'>
                                    {((data.id * 1000) + (Math.random() * 2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </p>
                                <IconCurrencyLira size={18}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </div>
    );
};

const CardCountDownTimer = () => {
    let time = new Date().toLocaleTimeString();
    const [ctime, newTime] = useState(time);

    function updateTime() {
        time = new Date().toLocaleTimeString();
        newTime(time);
    }

    setInterval(updateTime, 1000);

    return (
        <div
            className='flex flex-row items-center gap-x-3 bg-slate-100 bg-opacity-75 px-5 py-2 rounded-full text-sm font-medium'>
            {ctime.split(':')[0]}sa
            <div className='block h-3 w-[0.1rem] bg-slate-300'></div>
            {ctime.split(':')[1]}dk
            <div className='block h-3 w-[0.1rem] bg-slate-300'></div>
            {ctime.split(':')[2]}sn
        </div>
    );
};

const CardPlaceholder = ({onAnimationComplete}) => {
    return (
        <motion.div initial={{y: '100%'}}
                    animate={{y: 0}}
                    transition={{duration: 1}}
                    onAnimationComplete={onAnimationComplete}>
            <div className='flex flex-col gap-y-2'>
                <div className='w-full aspect-square bg-slate-200 rounded-xl'></div>
                <div className='grid grid-cols-6 gap-y-2'>
                    <div className='row-span-1 h-7 col-span-4 bg-slate-200 rounded-xl'>
                    </div>
                    <div className='row-span-1 h-7 col-span-3 bg-slate-200 rounded-xl'>
                    </div>
                    <div className='col-span-2'>
                    </div>
                    <div className='row-span-2 h-7 col-span-2 bg-slate-200 rounded-xl'>
                    </div>
                </div>
            </div>
        </motion.div>

    );
};

CardPlaceholder.propTypes = {
    onAnimationComplete: PropTypes.func,
};

HomePageCard.propTypes = {
    data: PropTypes.object,
};
export default HomePageCard;