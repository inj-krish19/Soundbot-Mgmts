import { useState } from 'react';

import { BsFillInfoCircleFill, BsCheck2 } from 'react-icons/bs'
import { IoWarning } from 'react-icons/io5';
import { RxCross2, RxCheck } from 'react-icons/rx'
import { ImCross } from 'react-icons/im'
import { useEffect } from 'react';

function Notification(props) {

    let { message, type } = props.info;

    const [visible, setVisible] = useState(true);
    const types = ['info', 'warning', 'error', 'success']

    const stylesOFType = {
        info: ' bg-sky-500 text-white border-sky-600',
        warning: ' bg-amber-500 text-slate-900 border-amber-600',
        error: ' bg-rose-500 text-white border-rose-600',
        success: ' bg-emerald-500 text-white border-emerald-600',
    };


    const componentFROMType = {
        'info': <BsFillInfoCircleFill />,
        'warning': <IoWarning color={'white'} />,
        'error': <ImCross />,
        'success': <BsCheck2 />,
    }


    useEffect(() => {
        if (message) {

            setVisible(true);
            let timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message])

    if (!visible || !message || types.indexOf(type) == -1) return null;

    return (
        <div className={`${stylesOFType[type]} flex flex-row justify-between items-center gap-2 px-2 py-1 rounded-sm border`}>
            <div className="flex flex-row gap-2 justify-center items-center">
                {componentFROMType[type]}
                <span className='text-white'>{message}</span>
            </div>

            {/* Manual Close */}
            <button onClick={() => { setVisible(false) }}>
                <RxCross2 className='text-slate-200' />
            </button>
        </div>
    );

}

export default Notification;