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
  
  getTempLinks(){
    return request({
      url: '/api/v1/templinks',
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

  getLinksbyfolderid(id,pwd){
    return request({
      url: '/api/v1/linksbyfolderid/'+ id + '?password=' + pwd,
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
      url: '/api/v1/getuserid/' + username,
    })
  },

  UserVip(data){
    return request({
      url: '/api/v1/user/vip',  
      method: 'post',
      data
    })
  },

  UserRename(data){
    return request({
      url: '/api/v1/user/rename',      
      method: 'post',
      data
    })
  },  

  JsToken(){
    return request({
      url: '/api/v1/user/jstoken',
    })
  },
  
  UserRandom(){
    return request({
      url: '/api/v1/getrandomuser',
    })
  },

  UserRank(t){
    return request({
      url: '/api/v1/userrank/' + t,
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

export const sldLinkService = {

  getLinks(){
    return request({
      url: '/api/v1/sldlinks',
    })
  },

  createLink(data){
    return request({
      url: '/api/v1/sldlink',      
      method: 'post',
      data
    })
  },  

  updateLink(data){
    return request({
      url: '/api/v1/sldlink',      
      method: 'put',
      data
    })
  },   

  deleteLink(data){
    return request({
      url: '/api/v1/sldlink',      
      method: 'delete',
      data
    })
  },  
}