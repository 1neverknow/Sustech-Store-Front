import axios from '@/axios'
import Qs from 'qs'

export function Post2(url, params, data) {
    let qs = Qs.stringify(params)
    url = url + '?' + qs
    return axios.post(url, data)
}
