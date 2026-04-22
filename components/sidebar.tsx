import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="bg-gray-100 w-64 p-4">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <Link href="/(dashboard)/dashboard" className="block hover:bg-gray-200 p-2 rounded">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/(admin)/admin" className="block hover:bg-gray-200 p-2 rounded">
            Admin
          </Link>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </div>
  )
}

export default Sidebar
