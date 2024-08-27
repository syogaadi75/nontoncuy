import axios from 'axios'

const customAxios = axios.create({
  baseURL: 'https://ngide.vercel.app/api'
})

export default customAxios
