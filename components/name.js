import { capitalize } from '../library/helpers'

export default function Name (props) {
  const capitalized = capitalize(props.children)
  return <>{capitalized}</>
}
