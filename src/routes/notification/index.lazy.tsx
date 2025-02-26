import { createLazyFileRoute } from '@tanstack/react-router'
import { EventCard } from '../../components/EventCardSmall'

export const Route = createLazyFileRoute('/notification/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='flex flex-col gap-6 text-white'>
    <p className='text-3xl'>Уведомления</p>
    <div className='flex flex-col gap-4'>

    </div>
  </div>
  )
}
