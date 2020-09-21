/* eslint-disable no-console */
import axios from 'axios'
import { menuUrl } from './endpoints'

const baseURL = `${window.location.origin}/api`
const loadData = async () => {
  const response = await axios.get(baseURL + menuUrl)
  const { data } = response
  return data
}

export default loadData
