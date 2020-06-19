import useParents from './use-parents.js'
import getLinks from '../library/get-links.js'

export default function useLinks () {
  const [currentParentName, otherParentName] = useParents()
  return {
    currentParent: getLinks(currentParentName),
    otherParent: getLinks(otherParentName)
  }
}
