import { createLazyFileRoute } from '@tanstack/react-router'
import { EventCard } from '../../components/EventCardSmall'

export const Route = createLazyFileRoute('/notification/')({
  component: RouteComponent,
})

function RouteComponent() {
  const consts = {
    title: "label",
    desc: "asd7",
    money: "5",
    achieve: "",
    status: "awaiting",
    date: "12.02.2025",
  };
  return (
  <div className='flex flex-col gap-6 text-white'>
    <p className='text-3xl'>Уведомления</p>
    <div className='flex flex-col gap-4'>
      <EventCard data={consts} />
      <EventCard data={consts} />
      <EventCard data={consts} />
      <EventCard data={consts} />

    </div>
  </div>
  )
}
