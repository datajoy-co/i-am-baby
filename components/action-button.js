export default function ActionButton (props) {
  return (
    <span className='ml-3 inline-flex rounded-md shadow-sm'>
      <button type='button' className={props.className} onClick={props.onClick}>
        {props.children}
      </button>
    </span>
  )
}
