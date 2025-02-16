// pages/ptw-interview/state/state.ts
import { Client, Ticket, TicketStatus } from '../types';

export interface AppState {
  clients: Client[];
  tickets: Ticket[];
  filters: {
    status?: TicketStatus | TicketStatus[];
    assignedTo?: string;
    clientName?: string;
  };
  selectedTicket?: Ticket;
}

export const initialState: AppState = {
  clients: [],
  tickets: [],
  filters: {},
  selectedTicket: undefined,
};

export type Action =
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'SET_TICKETS'; payload: Ticket[] }
  | { type: 'SET_FILTERS'; payload: AppState['filters'] }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_SELECTED_TICKET'; payload: Ticket | undefined };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload };
    case 'SET_FILTERS':
      // Merge new filters into existing ones.
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, filters: {} };
    case 'SET_SELECTED_TICKET':
      return { ...state, selectedTicket: action.payload };
    default:
      return state;
  }
}
