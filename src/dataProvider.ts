import simpleRestProvider from 'ra-data-simple-rest'
import { fetchUtils } from 'react-admin'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('token')
  if (!options.headers) {
    options.headers = new Headers({ 'Content-Type': 'application/json' })
  }
  if (token) {
    (options.headers as Headers).set('Authorization', `Bearer ${token}`)
  }
  return fetchUtils.fetchJson(url, options)
}

const baseProvider = simpleRestProvider(API_URL, httpClient)


export const dataProvider = {
  ...baseProvider,

  getList: async (resource: string, params: any) => {
    const { page, perPage } = params.pagination
    const { field, order }  = params.sort
    const start = (page - 1) * perPage
    const end   = page * perPage

    const url = `${API_URL}/${resource}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}`

    const response = await httpClient(url)

    
    const contentRange = response.headers.get('Content-Range')
    const total = contentRange
      ? parseInt(contentRange.split('/')[1], 10)
      : Array.isArray(response.json) ? response.json.length : 0

    return {
      data:  response.json,
      total
    }
  }
}