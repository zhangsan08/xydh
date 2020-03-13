import axios from 'axios'

// const getFolders = username => axios.get(`/api/v1/Folders/${username}`).then(res => res.data)
const getFoldersbyID = id => axios.get    (`/api/v1/foldersbyid/${id}`).then(res => res.data)

const createFolder  = form => axios.post  ('/api/v1/folder/',form).then(res => res.data)
const updateFolder = form => axios.put    ('/api/v1/folder/',form).then(res => res.data)
// 注意删除时打包数据有个小坑 要放入data中
const deleteFolder = form => axios.delete ('/api/v1/folder/',form).then(res => res.data)


export {
    // getFolders,
    getFoldersbyID,
    createFolder,
    updateFolder,
    deleteFolder,
}