import useParents from './use-parents'
import getLinks from '../library/get-links'

export default function useLinks () {
  const [currentParentName, otherParentName] = useParents()
  return {
    currentParent: getLinks(currentParentName),
    otherParent: getLinks(otherParentName)
  }
}
