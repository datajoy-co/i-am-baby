import { useRouter } from 'next/router'
import { updateRoute } from '../library/helpers'

function getOtherParentName (parentName) {
  if (parentName === 'kristin') {
    return 'paul'
  }

  return 'kristin'
}

export default function useParents () {
  const router = useRouter()
  const currentParentName = router.query.username
  const otherParentName = getOtherParentName(currentParentName)

  function toggleParent () {
    updateRoute(router, { username: otherParentName })
  }

  return [currentParentName, otherParentName, toggleParent]
}
