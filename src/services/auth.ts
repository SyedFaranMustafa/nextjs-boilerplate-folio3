// import { Session } from 'inspector';
import { ApiClient } from '.'

export const getUserinfo = () => {
  return ApiClient.get(`/api/v2/auth/me`)
}

export const login = (payload: any) => {
  return ApiClient.post(`/api/v2/auth/login`, payload, {})
}

export const signup = (payload) => {
  return ApiClient.post(`/api/v2/auth/signup`, payload, {})
}

export const sendPasswordEmail = (payload) => {
  return ApiClient.post(`/api/v2/auth/resetPasswordEmail`, payload, {})
}

export const sendVerifyEmail = (payload) => {
  return ApiClient.post(`/api/v2/auth/sendVerificationEmail`, payload, {})
}

export const verifyEmail = (payload) => {
  return ApiClient.post(`/api/v2/auth/verifyEmail`, payload, {})
}

export const resetPassword = (payload) => {
  return ApiClient.post(`/api/v2/auth/resetPassword`, payload, {})
}

export const createUser = (payload) => {
  return ApiClient.post('/api/v2/auth/user/create', payload.userPayload, {
    Authorization: `Bearer ${payload.session.userTokenInfo?.access_token}`,
  })
}
