// pages/ptw-interview/ticket-detail.tsx
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from './context/app-context';
import { ChevronLeft, House, Edit, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const TicketDetailView = () => {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const ticket = state.selectedTicket;

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

  // Local state for edit mode and editable fields.
  const [editMode, setEditMode] = useState(false);
  const [questionValue, setQuestionValue] = useState(ticket?.question || '');
  const [answerValue, setAnswerValue] = useState(ticket?.answer || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!ticket) {
    return (
      <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={handleBackClick}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </Button>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Ticket Detail
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
        <p className="mt-4 text-lg text-red-600 dark:text-red-400">
          No ticket selected. Please select a ticket from{' '}
          <Link
            href="/ptw-interview/ticket-overview"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Ticket Overview
          </Link>
          .
        </p>
      </div>
    );
  }

  // Handler for saving changes.
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/update-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: ticket.id,
          question: questionValue,
          answer: answerValue,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: 'SET_SELECTED_TICKET', payload: data.ticket });
        setMessage('Ticket updated successfully.');
        setEditMode(false);
      } else {
        setMessage(data.message || 'Error updating ticket.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error updating ticket.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Top Navigation: Back and Home buttons */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </Button>
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Ticket Details
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
      <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader className="flex justify-between items-center border-b pb-2">
          <CardTitle className="text-black text-2xl">
            {`Ticket Details: ${ticket.id}`}
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setEditMode((prev) => !prev)}
            className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <Edit className="h-4 w-4 mr-1" />
            <span>{editMode ? 'Cancel' : 'Edit'}</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <strong className="text-black">Requesting Client:</strong>
            <p className="text-black">{ticket.clientName}</p>
          </div>
          <div className="space-y-2">
            <strong className="text-black">Assigned To:</strong>
            <p className="text-black">{ticket.assignedTo}</p>
          </div>
          <div className="space-y-2">
            <strong className="text-black">Status:</strong>
            <p className="text-black">{ticket.status}</p>
          </div>
          <div className="space-y-2">
            <strong className="text-black">Question:</strong>
            {editMode ? (
              <Textarea
                value={questionValue}
                onChange={(e) => setQuestionValue(e.target.value)}
                className="text-black border border-gray-300 rounded p-2"
                rows={4}
              />
            ) : (
              <p className="text-black">{ticket.question}</p>
            )}
          </div>
          {ticket.answer && (
            <div className="space-y-2">
              <strong className="text-black">Answer:</strong>
              {editMode ? (
                <Textarea
                  value={answerValue}
                  onChange={(e) => setAnswerValue(e.target.value)}
                  className="text-black border border-gray-300 rounded p-2"
                  rows={4}
                />
              ) : (
                <p className="text-black">{ticket.answer}</p>
              )}
            </div>
          )}
          {editMode && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Save className="h-5 w-5 mr-2" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </Button>
            </div>
          )}
          {message && <p className="mt-2 text-sm text-black">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetailView;
