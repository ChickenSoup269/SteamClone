import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Admin.module.scss'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const cx = classNames.bind(styles)

function Admin() {
    const [devtoolsVisible, setDevtoolsVisible] = useState(false)

    return (
        <div className={cx('lmao')}>
            <button
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                    padding: '0.5rem 1rem',
                    background: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                onClick={() => setDevtoolsVisible(!devtoolsVisible)}
            >
                Toggle Devtools
            </button>

            {devtoolsVisible && <ReactQueryDevtools initialIsOpen={false} />}
        </div>
    )
}

export default Admin
