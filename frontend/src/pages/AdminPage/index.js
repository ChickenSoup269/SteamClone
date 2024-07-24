import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils'
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminGame from '../../components/AdminGame/AdminGame'

const AdminPage = () => {
    const items = [
        getItem('Users', 'user', <UserOutlined />),
        getItem('Games', 'game', <AppstoreOutlined />),
        getItem('Genres', 'genre', <AppstoreOutlined />)
    ];

    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch(key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'game':
                return (
                    <AdminGame />
                )
            default:
                return <></>
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage