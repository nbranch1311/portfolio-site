// pages/ptw-interview/index.tsx
import Link from 'next/link';
import React from 'react';

export default function PTWHome() {
  return (
    <div>
      <h1>PTW Homepage</h1>
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ticket Overview
            </Link>
          </li>
          {/* add additional navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
}
