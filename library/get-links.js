import * as database from './database'

export default async function getLinks (username, name = '') {
  const nextName = await database.getNextName(username, name)

  const rateNextName = {
    href: '/users/[username]/names/[name]',
    as: `/users/${username}/names/${nextName}`
  }

  const namesYouBothLike = {
    href: '/users/[username]/names-you-both-like',
    as: `/users/${username}/names-you-both-like`
  }

  return {
    rateNextName,
    namesYouBothLike
  }
}
