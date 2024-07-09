import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import GlobalStyles from '~/components/GobalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <GlobalStyles>
            <Provider store={store}>
                <App />
            </Provider>
        </GlobalStyles>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>,
    // </React.StrictMode>,
)

reportWebVitals()
