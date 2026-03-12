import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { ChatProvider } from './contexts/ChatContext'
import Chatbox from '~/components/ChatBot'
import GlobalStyles from '~/components/GobalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <GlobalStyles>
            <ChatProvider>
                <Provider store={store}>
                    <App />
                    <Chatbox />
                </Provider>
            </ChatProvider>
        </GlobalStyles>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>,

    // </React.StrictMode>,
)

reportWebVitals()
