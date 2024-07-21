import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import { privateRoutes } from '~/routes'
import { DefaultLayout } from '~/components/Layout'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import { updateUser } from './redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import * as UserService from './services/UserService'

function App() {
    const dispatch = useDispatch()
    // const [isLoading, setIsLoading] = useState(false)
    // const user = useSelector((state) => state.user)

    useEffect(() => {
        // setIsLoading(true)
        const { storageData, decoded } = handleDecoded()
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData)
        }
        // setIsLoading(false)
    })

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token')
        let decoded = {}
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData)
            decoded = jwtDecode(storageData)
        }
        return { decoded, storageData }
    }

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            // Do something before request is sent
            const currentTime = new Date()
            const { decoded } = handleDecoded()
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken()
                config.headers['token'] = `Bearer ${data?.access_token}`
            }
            return config
        },
        function (error) {
            return Promise.reject(error)
        },
    )

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                    {/* Các trang phải đăng nhập mới vào được */}
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
