import money from '/money.png'

export const Transaction =()=>{
    return(
        <div className="py-4 flex flex-row w-full text-white">
            <img src={money} width={40} height={48} />
            <div className='flex flex-col gap-1'>
                <p className='text-base font-normal'>
                    Зачисление
                </p>
                <p className='text-[#B3B3B3] text-xs'>
                    За участие в корп. субботнике
                </p>
            </div>
            <p className='text-green-500'>+15 балл</p>
        </div>
    )
}