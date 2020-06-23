import request from '@/plugins/axios'


export const linkService = {

  getLinks(username){
    return request({
      url: '/api/v1/links/'+ username,
    })
  },

  getLinksbyID(id){
    return request({
      url: '/api/v1/linksbyid/'+ id,
    })
  },

  getLinksbyFolderID(fid){
    return request({
      url: '/api/v1/linksbyfolderid/'+ fid,
    })
  },
  
  createLink(data){
    return request({
      url: '/api/v1/link',      
      method: 'post',
      data
    })
  },  

  updateLink(data){
    return request({
      url: '/api/v1/link',      
      method: 'put',
      data
    })
  },  

  sortLink(data){
    return request({
      url: '/api/v1/links',      
      method: 'put',
      data
    })
  },  

  deleteLink(data){
    return request({
      url: '/api/v1/link',      
      method: 'delete',
      data
    })
  },  
}



export const folderService = {

  getFoldersbyID(id){
    return request({
      url: '/api/v1/foldersbyid/'+ id,
    })
  },

  createFolder(data){
    return request({
      url: '/api/v1/folder',      
      method: 'post',
      data
    })
  },   
  
  updateFolder(data){
    return request({
      url: '/api/v1/folder',      
      method: 'put',
      data
    })
  },  

  deleteFolder(data){
    return request({
      url: '/api/v1/folder',      
      method: 'delete',
      data
    })
  },  

}


export const siteService = {

  getSite(username){
    return request({
      url: '/api/v1/site/'+ username,
    })
  },

  getSitebyID(id){
    return request({
      url: '/api/v1/sitebyid/'+ id,
    })
  },

  updateSite(data){
    return request({
      url: '/api/v1/site',      
      method: 'put',
      data
    })
  },  

  getAll(id){
    return request({
      url: '/api/v1/all/'+ id,
    })
  },
}

export const userService = {

  UserRegister(data){
    return request({
      url: '/api/v1/user/register',      
      method: 'post',
      data
    })
  },

  UserLogin(data){
    return request({
      url: '/api/v1/user/login',      
      method: 'post',
      data
    })
  },  
  
  UserUpdate(data){
    return request({
      url: '/api/v1/user/update',      
      method: 'put',
      data
    })
  },  

  UserLogout(data){
    return request({
      url: '/api/v1/user/logout',      
      method: 'delete',
      data
    })
  },

  UserMe(){
    return request({
      url: '/api/v1/user/me',
    })
  },

  UserID(username){
    return request({
      url: '/api/v1/getuserid/'+ username,
    })
  },

  UserVip(data){
    return request({
      url: '/api/v1/user/vip',  
      method: 'post',
      data
    })
  },

  UserRandom(){
    return request({
      url: '/api/v1/getrandomuser',
    })
  },
  
  UserReset(data){
    return request({
      url: '/api/v1/user/reset',  
      method: 'post',
      data
    })
  },
}

