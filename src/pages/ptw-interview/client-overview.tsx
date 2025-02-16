// pages/ptw-interview/client-overview.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronUp, ChevronDown, House } from 'lucide-react';
import { AppContext } from './context/app-context';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type SortDirection = 'asc' | 'desc';
type SortColumn = 'id' | 'name' | 'openTickets';

const ClientOverviewPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Fetch clients (and tickets) on mount.
  useEffect(() => {
    async function fetchData() {
      try {
        const clientsRes = await fetch('/api/clients');
        const clientsData = await clientsRes.json();
        dispatch({ type: 'SET_CLIENTS', payload: clientsData });
        // Fetch tickets to update openTickets counts.
        const ticketsRes = await fetch('/api/tickets');
        const ticketsData = await ticketsRes.json();
        dispatch({ type: 'SET_TICKETS', payload: ticketsData });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  // Sorting logic.
  const sortedClients = [...state.clients].sort((a, b) => {
    let aValue: string | number, bValue: string | number;
    if (sortColumn === 'id') {
      aValue = a.id.toLowerCase();
      bValue = b.id.toLowerCase();
    } else if (sortColumn === 'name') {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();
    } else {
      aValue = a.openTickets;
      bValue = b.openTickets;
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline-block ml-1" />
    );
  };

  // When a client’s open ticket count is clicked, set global filters and navigate.
  const handleClickOpenTickets = (clientName: string) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { clientName, status: ['New', 'In Editing'] },
    });
    router.push({
      pathname: '/ptw-interview/ticket-overview',
      query: { back: '/ptw-interview/client-overview' },
    });
  };

  // Back button always routes to home.
  const handleBackClick = () => {
    router.push('/');
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header with inline Back button */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </Button>
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Client Overview
        </h1>
        <Button
          variant="outline"
          onClick={handleHomeClick}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <House className="h-5 w-5 mr-2" />
          <span>Home</span>
        </Button>
      </div>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading clients...</p>
      ) : (
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer text-black"
                  onClick={() => handleSort('id')}
                >
                  Client ID {renderSortIcon('id')}
                </TableHead>
                <TableHead
                  className="cursor-pointer text-black"
                  onClick={() => handleSort('name')}
                >
                  Client Name {renderSortIcon('name')}
                </TableHead>
                <TableHead
                  className="cursor-pointer text-black text-center"
                  onClick={() => handleSort('openTickets')}
                >
                  Open Tickets {renderSortIcon('openTickets')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="p-4 text-center text-sm text-black">
                      No clients found. Try adjusting your filters.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="text-black">{client.id}</TableCell>
                    <TableCell className="text-black">{client.name}</TableCell>
                    <TableCell className="text-center">
                      {client.openTickets > 0 ? (
                        <button
                          onClick={() => handleClickOpenTickets(client.name)}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {client.openTickets}
                        </button>
                      ) : (
                        <span className="text-black">{client.openTickets}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {sortedClients.length > 0 && (
              <TableCaption className="pl-4 flex text-black">
                {sortedClients.length} clients found.
              </TableCaption>
            )}
          </Table>
        </div>
      )}
    </div>
  );
};

export default ClientOverviewPage;
