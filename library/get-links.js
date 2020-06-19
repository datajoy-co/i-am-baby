export default function getLinks (userName) {
  return {
    namesYouBothLike () {
      return {
        href: '/users/[userName]/names-you-both-like',
        as: `/users/${userName}/names-you-both-like`
      }
    },
    rateName (name) {
      if (name == null) {
        return {
          href: '/users/[userName]/voting-complete',
          as: `/users/${userName}/voting-complete`
        }
      }

      return {
        href: '/users/[userName]/names/[name]',
        as: `/users/${userName}/names/${name}`
      }
    },
    rateNextName () {
      return {
        href: '/users/[userName]/rate-names',
        as: `/users/${userName}/rate-names`
      }
    }
  }
}
