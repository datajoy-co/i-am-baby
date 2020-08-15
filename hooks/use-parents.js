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
  const currentParentName = router.query.userName
  const otherParentName = getOtherParentName(currentParentName)

  function toggleParent () {
    updateRoute(router, { userName: otherParentName })
  }

  return [currentParentName, otherParentName, toggleParent]
}
