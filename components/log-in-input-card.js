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
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
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
              class="form-input block w-full sm:text-sm sm:leading-5"
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
