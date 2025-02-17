const { faker } = require('@faker-js/faker');

// Fixed list of support team member names
const supportTeamMembers = [
  'Nicholas Branch',
  'Iona Gessinger',
  'Matthias Becker',
  'Sebastian Ludwig',
  'Oliver Lingg',
];

const generateClients = (numClients = 10) => {
  const clients = [];
  for (let i = 0; i < numClients; i++) {
    const client = {
      id: `client-${faker.string.alphanumeric(10)}`, // unique client ID
      name: faker.company.name(),
      openTickets: 0, // initialize open ticket count to 0 but generate it later
    };
    clients.push(client);
  }
  return clients;
};

const generateTickets = (clients, numTickets = 75) => {
  const statuses = ['New', 'In Editing', 'Closed'];
  const tickets = [];

  for (let i = 0; i < numTickets; i++) {
    // pick a random client from the list
    const randomClient =
      clients[faker.number.int({ min: 0, max: clients.length - 1 })];

    // randomly pick a status (using arrayElement for a proper random choice)
    const status = faker.helpers.arrayElement(statuses);

    const ticket = {
      id: `ticket-${faker.string.alphanumeric(10)}`, // unique ticket ID
      clientName: randomClient.name, // assigning client's name
      // Choose from the fixed list of support team members
      assignedTo:
        supportTeamMembers[
          faker.number.int({ min: 0, max: supportTeamMembers.length - 1 })
        ],
      status: status,
      question: faker.lorem.sentence(),
      answer: status === 'Closed' ? faker.lorem.sentences(2) : null, // provide an answer only if the ticket is closed
    };

    // increment open ticket count if the status is not "Closed"
    if (status !== 'Closed') {
      randomClient.openTickets += 1;
    }

    tickets.push(ticket);
  }
  return tickets;
};

// Generate the data
const clients = generateClients(40);
const tickets = generateTickets(clients, 100);

// Display the results log to terminal
console.log('Clients:');
console.table(clients);

console.log('Tickets:');
console.table(tickets);

// Write the generated data to a JSON file.
const fs = require('fs');
const data = { clients, tickets };
fs.writeFileSync(
  './src/pages/ptw-interview/fakeData/fakeData.json',
  JSON.stringify(data, null, 2),
);
