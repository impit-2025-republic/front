import { createLazyFileRoute } from '@tanstack/react-router'
import { EventCard } from '../components/EventCard'
import { initData, retrieveLaunchParams } from '@telegram-apps/sdk-react';
export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { initDataRaw } = retrieveLaunchParams();
  const consts={
    title: "label",
    desc: "asd7",
    money:"5",
    achieve:"",
    status:'awaiting',
    date:"12.02.2025"
  }
  console.log(initDataRaw)
  return(
  <div className='text-white'>
    <EventCard data={consts} />
  </div>
  )
}
