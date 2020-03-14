import axios from 'axios'

const getLinks = username => axios.get(`/api/v1/links/${username}`).then(res => res.data)
const getLinksbyID = id => axios.get(`/api/v1/linksbyid/${id}`).then(res => res.data)
const getLinksbyFolderID = fid => axios.get(`/api/v1/linksbyfolderid/${fid}`).then(res => res.data)

const createLink  = form => axios.post   ('/api/v1/link/',form).then(res => res.data)
const updateLink = form => axios.put    ('/api/v1/link/',form).then(res => res.data)
// 注意删除时打包数据有个小坑 要放入data中
const deleteLink = form => axios.delete ('/api/v1/link/',form).then(res => res.data)


export {
    getLinks,
    getLinksbyID,
    getLinksbyFolderID,
    createLink,
    updateLink,
    deleteLink,
}