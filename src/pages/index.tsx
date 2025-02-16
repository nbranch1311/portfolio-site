import Link from 'next/link';
import React, { useContext } from 'react';
import { AppContext } from './ptw-interview/context/app-context';

export default function Home() {
  const { dispatch } = useContext(AppContext);

  const handleTicketOverviewClick = () => {
    // Clear all filters before navigating
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <header className="mb-8 justify-center flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          PTW Interview Assignment
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          A demo support ticket & client management system
        </p>
      </header>
      <main className="flex flex-col items-center space-y-4">
        <nav>
          <ul className="flex flex-row items-center gap-2">
            <li>
              <Link
                href="/ptw-interview/client-overview"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Client Overview
              </Link>
            </li>
            <li>
              <Link
                href="/ptw-interview/ticket-overview"
                onClick={handleTicketOverviewClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ticket Overview
              </Link>
            </li>
            <li>
              <Link
                href="/ptw-interview/ticket-details"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ticket Details
              </Link>
            </li>
            {/* Additional navigation links if needed */}
          </ul>
        </nav>
      </main>
      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} PTW Interview Assignment
      </footer>
    </div>
  );
}
