import Nav from '../components/nav'

export default function Layout (props) {
  return (
    <>
      <Nav {...props} />
      <div className='py-10'>{props.children}</div>
    </>
  )
}
