import { Table } from 'antd'
import React from 'react'
import Loading from '../../components/LoadingComponent/Loading'

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [] } = props

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    }

    return (
        <Loading isLoading={isLoading}>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent
