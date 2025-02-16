// types.ts
export type TicketStatus = 'New' | 'In Editing' | 'Closed';

export interface Client {
  id: string;
  name: string;
  openTickets: number; // could get from the tickets list.
}

export interface Ticket {
  id: string;
  clientId: string;
  clientName: string;
  assignedTo: string;
  status: TicketStatus;
  question: string;
  answer?: string | null;
}
