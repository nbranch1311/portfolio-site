import fakeData from '../ptw-interview/fakeData/fakeData.json';
import { Client } from '../ptw-interview/types';

export default function handler(
  req: unknown,
  res: {
    status: (arg0: number) => {
      (): unknown;
      new (): unknown;
      json: {
        (arg0: Client[]): void;
        new (): unknown;
      };
    };
  },
) {
  // Simulate a .5-second network delay
  setTimeout(() => {
    res.status(200).json(fakeData.clients);
  }, 500);
}
