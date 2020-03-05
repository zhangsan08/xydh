import axios from 'axios'

const getSite = username => axios.get(`/api/v1/site/${username}`).then(res => res.data)
const getSitebyID = id => axios.get(`/api/v1/sitebyid/${id}`).then(res => res.data)

const updateSite = form => axios.put('/api/v1/site/', form).then(res => res.data)

export {
    getSite,
    getSitebyID,
    updateSite,
}