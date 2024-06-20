import { Sidebar } from '~/components/Layout'
import Home from '~/pages/Home'
import Gamedetails from '~/pages/GameDetails'
import Profile from '~/pages/Profile'
import Admin from '~/pages/Admin'
import Search from '~/pages/Search'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Cart from '~/pages/Cart'

// Cho mọi tài khoản publicRoutes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/gamedetails', component: Gamedetails },
    { path: '/search', component: Search },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/cart', component: Cart },
]

// Đăng nhập mới vào được
const privateRoutes = [
    { path: '/admin', component: Admin, layout: Sidebar },
    { path: '/profile', component: Profile },
]

export { publicRoutes, privateRoutes }
