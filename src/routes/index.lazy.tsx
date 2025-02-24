import { createLazyFileRoute } from '@tanstack/react-router'
import { EventCard } from '../components/EventCard'
export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
;
  const consts={
    title: "label",
    desc: "asd7",
    money:"5",
    achieve:"",
    status:'awaiting',
    date:"12.02.2025"
  }
  return(
  <div className='text-white'>
    <EventCard data={consts} />
  </div>
  )
}
