import fakeData from '../ptw-interview/fakeData/fakeData.json';

export default function handler(
  req: unknown,
  res: {
    status: (arg0: number) => {
      (): unknown;
      new (): unknown;
      json: {
        (
          arg0: (
            | {
                id: string;
                clientName: string;
                assignedSupportMember: string;
                status: string;
                question: string;
                answer: null;
              }
            | {
                id: string;
                clientName: string;
                assignedSupportMember: string;
                status: string;
                question: string;
                answer: string;
              }
          )[],
        ): void;
        new (): unknown;
      };
    };
  },
) {
  // Simulate a .5-second network delay
  setTimeout(() => {
    res.status(200).json(
      fakeData.tickets as unknown as {
        id: string;
        clientName: string;
        assignedSupportMember: string;
        status: string;
        question: string;
        answer: string | null;
      }[],
    );
  }, 500);
}
