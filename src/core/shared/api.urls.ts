import { environment } from '../../environments/environment';

const API_BASE_URL = environment.apiBaseUrl;


export const API_URLS = {
    foodtrucks: `${API_BASE_URL}/foodtrucks`,
    reservations: `${API_BASE_URL}/reservations`
};