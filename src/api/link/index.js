import axios from 'axios'

const getLinks = username => axios.get(`/api/v1/links/${username}`).then(res => res.data)
const getLinksbyID = id => axios.get(`/api/v1/linksbyid/${id}`).then(res => res.data)

const updateLink = form => axios.put('/api/v1/link/',form).then(res => res.data)
// const updateLink = () => axios.put('/api/v1/link/').then(res => res.data)

export {
    getLinks,
    getLinksbyID,
    updateLink,
}