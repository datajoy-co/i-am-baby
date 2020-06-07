export default function ProfileImage (props) {
  const kristinSrc = '/kristin.jpeg'
  const paulSrc = '/paul.jpeg'
  const src = props.parentName === 'kristin' ? kristinSrc : paulSrc
  return <img className='h-8 w-8 rounded-full' src={src} alt='' />
}
