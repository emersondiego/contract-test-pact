import 'dotenv/config';

import axios from 'axios';

const baseUrl = `http://localhost:${process.env.MOCK_SERVER_PORT}`;

const fetchCharacters = async () => {
  return await axios.get(`${baseUrl}/characters`);
};

module.exports = {
  fetchCharacters
};