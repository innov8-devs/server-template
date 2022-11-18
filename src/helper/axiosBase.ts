import axios from 'axios';
import { BASE_AUTH_URL } from '../tools/config';

export default axios.create({ baseURL: BASE_AUTH_URL });
