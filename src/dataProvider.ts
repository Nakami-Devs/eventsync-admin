/// <reference types="vite/client" />
import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const API_URL = "/api";

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem("token");
  if (!options.headers) {
    options.headers = new Headers({ "Content-Type": "application/json" });
  }
  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const baseProvider = simpleRestProvider(API_URL, httpClient);

export const dataProvider = {
  ...baseProvider,

  getList: async (resource: string, params: any) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const start = (page - 1) * perPage
    const end = page * perPage

    let url = `${API_URL}/${resource}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}`

    if (params.filter) {
      Object.keys(params.filter).forEach(key => {
        if (params.filter[key]) {
          url += `&${key}=${params.filter[key]}`
        }
      })
    }

    const response = await httpClient(url);

    const contentRange = response.headers.get('X-Total-Count')
    const total = contentRange
      ? parseInt(contentRange, 10)
      : Array.isArray(response.json) ? response.json.length : 0

    return {
      data: response.json,
      total
    }
  },

  create: async(resource: string, params: any) => {
    if(resource === 'sessions') {
      const {data} = params

      const payload = {
        ...data,
        id_event: data.id_event,
        speaker_ids: data.speaker_ids || []
      }

      const url = `${API_URL}/${resource}`
      const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({ 'Content-type': 'application/json' }),
      } 

      const token = localStorage.getItem('token')
      if(token) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }

      const response = await fetchUtils.fetchJson(url, options)
      return { data : response.json }
    }

    return baseProvider.create(resource, params)
  },
  getManyReference: async (resource: string, params: any) => {
  const { target, id, pagination, sort } = params
  const { page, perPage } = pagination
  const { field, order } = sort
  const start = (page - 1) * perPage
  const end = page * perPage

  const url = `${API_URL}/${resource}?${target}=${id}&_start=${start}&_end=${end}&_sort=${field}&_order=${order}`

  const response = await httpClient(url)
  const total = parseInt(response.headers.get('X-Total-Count') ?? '0', 10)

  return {
    data: response.json,
    total,
  }
},
}
