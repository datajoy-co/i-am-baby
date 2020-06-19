import names from './data/names'
import flowerText from './data/flower-text'

const flowerWords = flowerText
  .split(/\W/g)
  .filter(s => s.trim().length > 0)
  .map(s => s.toLowerCase())

function processName (name) {
  const lowerName = name.toLowerCase()
  const inFlowerWords = flowerWords.indexOf(lowerName) > -1
  if (inFlowerWords) {
    console.log(name)
  }
}

async function main () {
  for (const name of names) {
    processName(name)
  }
}

main()
