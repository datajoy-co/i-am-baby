export default function StatsBlock (props) {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>
        <dl>
          <dt className='text-sm leading-5 font-medium text-gray-500 truncate'>
            {props.title}
          </dt>
          <dd className='mt-1 text-3xl leading-9 font-semibold text-gray-900'>
            {props.value}
          </dd>
        </dl>
      </div>
    </div>
  )
}
