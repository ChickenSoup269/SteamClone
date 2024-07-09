import { message } from 'antd'

const success = (mes) => {
    message.success(mes)
}

const error = (mes) => {
    message.error(mes)
}

const warning = (mes = 'Warning') => {
    message.warning(mes)
}

export { success, error, warning }
