export default function getLinks (userName) {
  return {
    namesYouBothLike () {
      return {
        href: '/users/[userName]/names-you-both-like',
        as: `/users/${userName}/names-you-both-like`
      }
    },
    rateName (name) {
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
