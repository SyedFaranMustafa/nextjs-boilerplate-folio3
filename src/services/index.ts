// class API client

import axios from 'axios'
import { getSession } from '@lib/auth'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error)
  }
)

export class ApiClient {
  static baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  static async get(path: string, headers = {}) {
    const session = await getSession()
    console.log('session', session)
    let config = {
      method: 'get',
      url: this.baseUrl + path,
      headers: {
        // use this for auth is true
        Authorization: `Bearer ${session?.user?.tokens?.refreshToken}`,
        ...headers,
      },
    }
    return axios.request(config)
  }

  static async post(path: string, payload: any, headers = {}) {
    const data = payload
    let config = {
      method: 'post',
      url: this.baseUrl + path,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: data,
    }
    return axios.request(config)
  }

  static async delete(path: string, payload, headers = {}) {
    let data = JSON.stringify(payload)
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: this.baseUrl + path,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: data,
    }
    return axios.request(config)
  }

  static async put(path: string, payload = {}) {
    let data = JSON.stringify(payload)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: this.baseUrl + path,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }
    return axios.request(config)
  }
}
