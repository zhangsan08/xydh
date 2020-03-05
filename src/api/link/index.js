import axios from 'axios'

const getLinks = username => axios.get(`/api/v1/links/${username}`).then(res => res.data)

export {
    getLinks,
}