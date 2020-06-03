import useParents from './useParents'
import ky from 'ky-universal'

export default function useVoting () {
  const [currentParentName, otherParentName, toggleParent] = useParents()

  async function vote (name, isLiked) {
    await ky.post(`/api/users/${currentParentName}/votes`, {
      json: {
        name,
        isLiked
      }
    })
  }

  return {
    currentParentName,
    otherParentName,
    toggleParent,
    vote
  }
}
