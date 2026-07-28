function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">
        Navigation
      </h2>

      <ul className="space-y-3">
        <li className="font-medium text-blue-600 cursor-pointer">
          Dashboard
        </li>

        <li className="text-gray-600 cursor-pointer hover:text-blue-600">
          Favorites
        </li>

        <li className="text-gray-600 cursor-pointer hover:text-blue-600">
          Categories
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;