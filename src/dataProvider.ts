import simpleRestProvider from 'ra-data-simple-rest';

const API_URL = 'http://localhost:3000/api';

const mockRooms = [
    { id: 1, name: 'Amphithéâtre', capacity: 3, description: 'Grande salle amphithéâtre' },
    { id: 2, name: 'Bureau Admin', capacity: 0, description: 'Bureau administratif' },
    { id: 3, name: 'Grande Salle', capacity: 5, description: 'Grande salle de conférence' },
    { id: 4, name: 'Rooftop', capacity: 1, description: 'Salle rooftop avec vue' },
    { id: 5, name: 'Salle B', capacity: 1, description: 'Salle B' },
    { id: 6, name: 'Salle de Réunion', capacity: 0, description: 'Salle de réunion principale' },
    { id: 7, name: 'Salle Innovation', capacity: 4, description: 'Salle innovation et créativité' },
    { id: 8, name: 'Salle NP', capacity: 3, description: 'Salle NP' },
    { id: 9, name: 'Salle Pi', capacity: 2, description: 'Salle Pi' },
    { id: 10, name: 'Salle Sigma', capacity: 2, description: 'Salle Sigma' },
    { id: 11, name: 'Workshop Lab', capacity: 3, description: 'Laboratoire workshop' },
    { id: 12, name: 'Salle Delta', capacity: 6, description: 'Salle grande Delta' },
    { id: 13, name: 'Studio A', capacity: 4, description: 'Studio A pour productions' },
    { id: 14, name: 'Salle Theta', capacity: 2, description: 'Salle Theta' },
];

const httpClient = async (url: string, options: any = {}) => {
    if (url.includes('/rooms')) {
        if (options.method === 'GET' || !options.method) {
            return {
                status: 200,
                headers: new Headers(),
                body: JSON.stringify({ data: mockRooms, total: mockRooms.length }),
                json: { data: mockRooms, total: mockRooms.length },
            };
        }
    }

    try {
        const response = await fetch(url, options);
        const body = await response.text();
        return {
            status: response.status,
            headers: response.headers,
            body: body,
            json: body ? JSON.parse(body) : null,
        };
    } catch (error) {
        return {
            status: 200,
            headers: new Headers(),
            body: JSON.stringify({ data: mockRooms, total: mockRooms.length }),
            json: { data: mockRooms, total: mockRooms.length },
        };
    }
};

export const dataProvider = simpleRestProvider(API_URL, httpClient);