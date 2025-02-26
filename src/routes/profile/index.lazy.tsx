import { createLazyFileRoute } from '@tanstack/react-router'
import { Avatar } from '../../components/catalyst/avatar'
import achieve from "/achieve.png";
import CaseAnimation from '../../components/Case';

export const Route = createLazyFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='text-white flex flex-col gap-6'>
    <p className=' text-3xl'>Профиль</p>
    <div className='flex flex-row gap-3 items-center'>
      <Avatar className='w-12 h-12' />
      <div className='flex flex-col gap-2'>
        <p className='text-2xl leading-5'>
          Охотин Иван
        </p>
        <p className='text-[#B3B3B3] text-base'>Ген директор</p>
      </div>
    </div>
    <div className=''>
      <div className='bg-[#26282C] flex flex-col rounded-2xl p-4 w-fit h-fit'>
        <div className=' flex flex-row gap-3 items-center'>
        <img src={achieve} width={21} height={24} />
          <p className='text-xl'>Достижения</p>
        </div>
        <p className='text-[#B3B3B3] text-base'>Витрина достижений</p>
      </div>
    </div>
    <CaseAnimation />
  </div>
)
}
