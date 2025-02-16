import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type TicketUpdateRequest = {
  id: string;
  question?: string;
  answer?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, question, answer } = req.body as TicketUpdateRequest;

  if (!id) {
    return res.status(400).json({ message: 'Ticket id is required' });
  }

  // Construct the file path (adjust according to your project structure)
  const filePath = path.join(
    process.cwd(),
    'src',
    'pages',
    'ptw-interview',
    'fakeData',
    'fakeData.json',
  );

  try {
    // Read the current data
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);

    // Find the ticket to update
    const ticketIndex = data.tickets.findIndex(
      (ticket: { id: string }) => ticket.id === id,
    );

    if (ticketIndex === -1) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update fields if provided
    if (question !== undefined) {
      data.tickets[ticketIndex].question = question;
    }
    if (answer !== undefined) {
      data.tickets[ticketIndex].answer = answer;
    }

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({
      message: 'Ticket updated successfully',
      ticket: data.tickets[ticketIndex],
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
