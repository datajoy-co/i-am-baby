import Link from "next/link"
import { capitalize } from "../library/helpers"
import { useState, useEffect } from "react"
import getLinks from "../library/get-links"

export default function logInInputCard(props) {
  const [userName, setUserName] = useState("")
  const [userLinks, setUserLinks] = useState(getLinks("test").rateNextName())

  useEffect(() => {
    setUserLinks(getLinks(userName.toLocaleLowerCase()).rateNextName())
  }, [userName])

  return (
    <div
      className="bg-white rounded-lg px-4 pt-5 pb-4 mx-5 overflow-hidden shadow-xl sm:max-w-sm sm:w-full sm:p-6 my-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div>
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Pick names you like
          <br className="hidden sm:inline" />
          <span className="text-indigo-600" id="newsletter-headline">
            Compare your likes with others
          </span>
        </h2>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            What's your name?
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              onChange={(e) => {
                setUserName(e.target.value)
              }}
              id="username"
              className="form-input block w-full sm:text-sm sm:leading-5"
              placeholder="Joe"
            />
          </div>
        </div>
      </div>
      {userName.length > 0 && (
        <div className="mt-5 sm:mt-6">
          <span className="flex w-full rounded-md shadow-sm">
            <Link
              disabled={userName.length < 1}
              href={userLinks.href}
              as={userLinks.as}
            >
              <button
                disabled={userName.length < 1}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Log in as {capitalize(userName)}
              </button>
            </Link>
          </span>
        </div>
      )}
    </div>
  )
}
