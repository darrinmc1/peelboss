export default function AdminPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Content Management</h2>
          <p className="text-sm text-gray-500 mb-4">Manage modules, lessons, and assessments</p>
          <a href="/admin/content" className="text-sm text-blue-600 hover:underline">
            Manage Content →
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">User Management</h2>
          <p className="text-sm text-gray-500 mb-4">Manage users, roles, and permissions</p>
          <a href="/admin/users" className="text-sm text-blue-600 hover:underline">
            Manage Users →
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Analytics</h2>
          <p className="text-sm text-gray-500 mb-4">View platform usage and performance metrics</p>
          <a href="/admin/analytics" className="text-sm text-blue-600 hover:underline">
            View Analytics →
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">New module created</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">admin@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">2023-05-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">User account updated</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">admin@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">2023-05-14</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Content published</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">admin@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">2023-05-13</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
