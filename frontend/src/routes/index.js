import { Sidebar } from '~/components/Layout'
import Home from '~/pages/Home'
import Gamedetails from '~/pages/GameDetails'
import Profile from '~/pages/Profile'
import Admin from '~/pages/Admin'
import Search from '~/pages/Search'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import ForgotPassword from '~/pages/ForgotPassword'
import Cart from '~/pages/Cart'
import GameType from '~/pages/GameType'
import Page404 from '~/pages/Page404'
import Library from '~/pages/Library'
import Notification from '~/pages/Notification'

// Cho mọi tài khoản publicRoutes
const publicRoutes = [
    { path: '/detail/:game_id/:game_slug', component: Gamedetails },
    { path: '/search', component: Search },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/resetPass', component: ForgotPassword },
    { path: '/cart', component: Cart },
    { path: '/gameType/:genre', component: GameType },
    { path: '/404/', component: Page404 },
    { path: '/', component: Home },
]

// Đăng nhập mới vào được
const privateRoutes = [
    { path: '/admin', component: Admin, layout: Sidebar },
    { path: '/profile', component: Profile },
    { path: '/library', component: Library },
    { path: '/notification', component: Notification },
]

export { publicRoutes, privateRoutes }
