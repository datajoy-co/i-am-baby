import Nav from '../components/nav.js'

export default function Layout (props) {
  return (
    <>
      <Nav {...props} />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-10'>{props.children}</div>
      </div>
    </>
  )
}
