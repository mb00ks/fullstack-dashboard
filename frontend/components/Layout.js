import Link from "next/link";
import { logout } from "../lib/api";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <Link href="/dashboard" className="block hover:underline">Dashboard</Link>
            <button onClick={logout} className="text-red-500 hover:underline mt-4">Logout</button>
          </nav>
        </div>
        <ThemeToggle />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
