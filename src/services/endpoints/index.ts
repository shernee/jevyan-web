import axios from 'axios'

const instance = axios.create({
  baseURL: `${window.location.origin}/api`,
})

const subDomain = window.location.hostname.split('.')[0]

const bannerUrl = `/org/banner/${subDomain}/`
const menuUrl = `/menu/items/${subDomain}/`

export {
  instance, bannerUrl, menuUrl,
}
