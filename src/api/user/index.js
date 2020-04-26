import axios from 'axios'

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// var currentUser = ""

const UserRegister = form => axios.post('/api/v1/user/register', form).then(res => res.data)

const UserLogin = form => axios.post('/api/v1/user/login', form).then(res => res.data)

const UserUpdate = form => axios.put('/api/v1/user/update', form).then(res => res.data)

const UserLogout = () => axios.delete('/api/v1/user/logout/').then(res => res.data)

const UserMe = () => axios.get('/api/v1/user/me').then(res => res.data)

const UserID = username => axios.get(`/api/v1/getuserid/${username}`).then(res => res.data)

const UserVip = form => axios.post('/api/v1/user/vip', form).then(res => res.data)

export {
    UserRegister,
    UserLogin,
    UserUpdate,
    UserLogout,
    UserMe,
    UserID,
    UserVip,
}