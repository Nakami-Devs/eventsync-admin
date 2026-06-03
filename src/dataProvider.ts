import type { DataProvider } from 'react-admin';

const STORAGE_KEY = 'react-admin-local-data';

interface Room {
    id: number;
    name: string;
    capacity: number;
}

interface Event {
    id: number;
    title: string;
    date: string;
}

interface LocalData {
    rooms: Room[];
    events: Event[];
}

const initialData: LocalData = {
    rooms: [
        { id: 1, name: 'Salle A', capacity: 20 },
        { id: 2, name: 'Salle B', capacity: 12 },
        { id: 3, name: 'Salle C', capacity: 8 },
    ],
    events: [],
};

const loadData = (): LocalData => {
    if (typeof window === 'undefined') {
        return initialData;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    }

    try {
        return JSON.parse(stored) as LocalData;
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    }
};

const saveData = (data: LocalData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const paginate = (items: any[], pagination: any) => {
    const { page, perPage } = pagination;
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
};

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const filtered = items;
        const paginated = params.pagination ? paginate(filtered, params.pagination) : filtered;
        return {
            data: paginated,
            total: filtered.length,
        };
    },

    getOne: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const record = items.find((item: any) => item.id === params.id);
        return { data: record };
    },

    getMany: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        return {
            data: items.filter((item: any) => params.ids.includes(item.id)),
        };
    },

    getManyReference: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const filtered = items.filter((item: any) => item[params.target] === params.id);
        const paginated = params.pagination ? paginate(filtered, params.pagination) : filtered;
        return {
            data: paginated,
            total: filtered.length,
        };
    },

    create: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const nextId = items.length ? Math.max(...items.map((item: any) => item.id)) + 1 : 1;
        const record = { id: nextId, ...params.data };
        items.push(record);
        saveData({ ...data, [resource]: items } as LocalData);
        return { data: record as any };
    },

    update: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const index = items.findIndex((item: any) => item.id === params.id);
        if (index === -1) {
            throw new Error('Record not found');
        }
        const updated = { ...items[index], ...params.data };
        items[index] = updated;
        saveData({ ...data, [resource]: items } as LocalData);
        return { data: updated };
    },

    updateMany: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const updatedIds = params.ids;
        const updatedItems = items.map((item: any) =>
            updatedIds.includes(item.id) ? { ...item, ...params.data } : item,
        );
        saveData({ ...data, [resource]: updatedItems } as LocalData);
        return { data: updatedItems.filter((item: any) => updatedIds.includes(item.id)).map((item: any) => item.id) };
    },

    delete: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const remaining = items.filter((item: any) => item.id !== params.id);
        saveData({ ...data, [resource]: remaining } as LocalData);
        return { data: (params.previousData || { id: params.id }) as any };
    },

    deleteMany: async (resource, params) => {
        const data = loadData();
        const items = (data as any)[resource] || [];
        const remaining = items.filter((item: any) => !params.ids.includes(item.id));
        saveData({ ...data, [resource]: remaining } as LocalData);
        return { data: params.ids };
    },
};

export { dataProvider };