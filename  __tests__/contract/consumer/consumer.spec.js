import 'dotenv/config';

import { Pact } from '@pact-foundation/pact';
import { eachLike, somethingLike, integer } from '@pact-foundation/pact/dsl/matchers';
import path from 'path';

import { fetchCharacters } from '../../../src/service/api';

const mockProvider = new Pact({
  consumer: 'web-application',
  provider: 'characters-api-application',
  port: parseInt(process.env.MOCK_SERVER_PORT),
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'WARN',
  spec: 2,
  cors: true
});

describe('API Pact Test - Characters Service', () => {
  beforeAll(async () => 
    await mockProvider.setup().then(() => {
      mockProvider.addInteraction({
        uponReceiving: 'a request to list all characters',
        withRequest: {
          method: 'GET',
          path: '/characters'
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: eachLike (
            {
              id: integer(1),
              name: somethingLike('Walter White'),
              age: integer(58)
            },
            { min: 5 }
          )
        }
      });
    })
  );

  afterEach(() => mockProvider.verify());

  afterAll(() => mockProvider.finalize());

  it('should return the expected data', async () => {
    const response = await fetchCharacters();

    const { name, age } = response.data[0];

    expect(response.status).toEqual(200);
    expect(name).toBe('Walter White');
    expect(age).toBe(58);
  });
});