// pages/ptw-interview/ticket-overview.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronUp, ChevronDown, House } from 'lucide-react';
import { AppContext } from './context/app-context';
import { MultiSelect } from '@/components/ui/multi-select';
import { DropdownSelect } from '@/components/ui/dropdown-select';
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
import { Ticket, TicketStatus } from './types';

type SortDirection = 'asc' | 'desc';
type SortColumn = 'id' | 'clientName' | 'assignedTo' | 'status';

const TicketOverviewPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const [assignedToFilter, setAssignedToFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortColumn>('clientName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Derive the selected statuses directly from the global filter.
  const selectedStatuses: string[] = state.filters.status
    ? Array.isArray(state.filters.status)
      ? state.filters.status
      : [state.filters.status]
    : [];

  // Fetch tickets from API.
  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch('/api/tickets');
        const ticketsData = await res.json();
        dispatch({ type: 'SET_TICKETS', payload: ticketsData });
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [dispatch]);

  // Filtering logic.
  const filteredTickets = state.tickets.filter((ticket) => {
    if (
      state.filters.clientName &&
      ticket.clientName !== state.filters.clientName
    ) {
      return false;
    }
    if (
      selectedStatuses.length > 0 &&
      !selectedStatuses.includes(ticket.status)
    ) {
      return false;
    }
    if (assignedToFilter && ticket.assignedTo !== assignedToFilter) {
      return false;
    }
    return true;
  });

  // Sorting logic.
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  // Derive unique options.
  const uniqueStatuses = Array.from(
    new Set(state.tickets.map((ticket) => ticket.status)),
  );
  const uniqueAssignedTos = Array.from(
    new Set(state.tickets.map((ticket) => ticket.assignedTo)),
  );
  const uniqueClientNames = Array.from(
    new Set(state.tickets.map((ticket) => ticket.clientName)),
  );

  // Back button logic.
  const { back } = router.query;
  const handleBackClick = () => {
    if (back && typeof back === 'string') {
      router.push(back);
    } else {
      router.back();
    }
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  // Sorting handlers.
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

  // Handler for MultiSelect change.
  const handleStatusChange = (selected: unknown[]) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { status: selected as unknown as TicketStatus[] },
    });
  };

  // When a Ticket ID is clicked, select that ticket and navigate to details.
  const handleTicketClick = (ticket: Ticket) => {
    dispatch({ type: 'SET_SELECTED_TICKET', payload: ticket });
    router.push('/ptw-interview/ticket-details');
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
          Ticket Overview
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
        <p className="text-gray-500 dark:text-gray-400">Loading tickets...</p>
      ) : (
        <>
          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4">
            {/* Filter by Client */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white">
                Filter by Client:
              </label>
              <DropdownSelect
                label="Client"
                options={uniqueClientNames.map((clientName) => ({
                  value: clientName,
                  label: clientName,
                }))}
                value={state.filters.clientName || ''}
                onChange={(val) =>
                  dispatch({
                    type: 'SET_FILTERS',
                    payload: { clientName: val || undefined },
                  })
                }
              />
            </div>
            {/* MultiSelect for Status */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white">
                Filter by Status:
              </label>
              <MultiSelect
                value={selectedStatuses}
                onValueChange={handleStatusChange}
                options={uniqueStatuses.map((status) => ({
                  label: status,
                  value: status,
                }))}
                defaultValue={selectedStatuses}
                placeholder="Select statuses"
                variant="default"
                animation={0}
                maxCount={10}
              />
            </div>
            {/* Filter by Assigned To */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white">
                Filter by Assigned To:
              </label>
              <DropdownSelect
                label="Assigned To"
                options={uniqueAssignedTos.map((assignedTo) => ({
                  value: assignedTo,
                  label: assignedTo,
                }))}
                value={assignedToFilter}
                onChange={setAssignedToFilter}
              />
            </div>
          </div>
          {/* Shadcn Table */}
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer text-black"
                    onClick={() => handleSort('id')}
                  >
                    Ticket ID {renderSortIcon('id')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-black"
                    onClick={() => handleSort('clientName')}
                  >
                    Requesting Client {renderSortIcon('clientName')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-black"
                    onClick={() => handleSort('assignedTo')}
                  >
                    Assigned To {renderSortIcon('assignedTo')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-black"
                    onClick={() => handleSort('status')}
                  >
                    Status {renderSortIcon('status')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="p-4 text-center text-sm text-black">
                        No tickets found. Try adjusting your filters.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="text-black">
                        <button
                          onClick={() => handleTicketClick(ticket)}
                          className="text-blue-600 hover:underline"
                        >
                          {ticket.id}
                        </button>
                      </TableCell>
                      <TableCell className="text-black">
                        {ticket.clientName}
                      </TableCell>
                      <TableCell className="text-black">
                        {ticket.assignedTo}
                      </TableCell>
                      <TableCell className="text-black">
                        {ticket.status}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              {sortedTickets.length > 0 && (
                <TableCaption className="text-black">
                  {sortedTickets.length} tickets found.
                </TableCaption>
              )}
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketOverviewPage;
