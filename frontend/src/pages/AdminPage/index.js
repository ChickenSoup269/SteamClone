import React, { useState } from 'react'
import { Menu } from 'antd'
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminGame from '../../components/AdminGame/AdminGame'
import { getItem } from '../../utils'
import classNames from 'classnames'
import styles from './Admin.module.scss'

const AdminPage = () => {
    const items = [
        getItem('Users', 'user', <UserOutlined />),
        getItem('Games', 'game', <AppstoreOutlined />),
        getItem('Genres', 'genre', <AppstoreOutlined />),
    ]

    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />
            case 'game':
                return <AdminGame />
            default:
                return <></>
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }

    return (
        <div className={classNames(styles.container)}>
            <Menu mode="inline" className={classNames(styles.menu)} items={items} onClick={handleOnClick} />
            <div className={classNames(styles.content)}>{renderPage(keySelected)}</div>
        </div>
    )
}

export default AdminPage
