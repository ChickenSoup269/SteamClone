import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as GameService from '../../services/GameService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../LoadingComponent/Loading'
import * as message from '../Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import Highlighter from 'react-highlight-words'

const AdminGame = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state.user)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null)

    const [stateGame, setStateGame] = useState({
        game_id: '',
        game_name: '',
        description: '',
        header_image: '',
    })
    const [stateGameDetails, setStateGameDetails] = useState({
        game_id: '',
        game_name: '',
        description: '',
        header_image: '',
    })

    const [form] = Form.useForm()

    const mutation = useMutationHooks((data) => {
        const { game_id, game_name, description, header_image } = data
        const res = GameService.createGame({
            game_id,
            game_name,
            description,
            header_image,
        })
        return res
    })

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data
        const res = GameService.updateGame(id, token, { ...rests })
        return res
    })

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data
        const res = GameService.deleteGame(id, token)
        return res
    })

    const getAllGame = async () => {
        const res = await GameService.getAllGame()
        return res
    }

    const fetchGetDetailsGame = async () => {
        const res = await GameService.getDetailsGame(rowSelected)
        if (res) {
            setStateGameDetails({
                game_id: res?.game_id,
                game_name: res?.game_name,
                description: res?.description,
                header_image: res?.header_image,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        form.setFieldsValue(stateGameDetails)
    }, [form, stateGameDetails])

    useEffect(() => {
        if (rowSelected) {
            setIsLoadingUpdate(true)
            fetchGetDetailsGame(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsGame = () => {
        setIsOpenDrawer(true)
    }

    const { data, isSuccess, isError } = mutation
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    console.log('dataUpdated', dataUpdated)
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted

    const queryGame = useQuery({
        queryKey: ['games'],
        queryFn: getAllGame,
    })

    const { isLoading: isLoadingGames, data: games } = queryGame

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => setIsModalOpenDelete(true)}
                />
                <EditOutlined
                    style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
                    onClick={handleDetailsGame}
                />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    })

    const columns = [
        {
            title: 'Id',
            dataIndex: 'game_id',
            ...getColumnSearchProps('game_id'),
        },
        {
            title: 'Name',
            dataIndex: 'game_name',
            sorter: (a, b) => a.game_name.length - b.game_name.length,
            ...getColumnSearchProps('game_name'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ]

    const dataTable =
        games?.games?.data?.length &&
        games?.games?.data?.map((game) => {
            return { ...game, key: game._id }
        })

    useEffect(() => {
        if (isSuccess) {
            message.success('Game submitted successfully')
            handleCancel()
        } else if (isError) {
            message.error('Game submission failed')
        }
    }, [isSuccess, isError])

    useEffect(() => {
        if (isSuccessUpdated) {
            message.success('Game updated successfully')
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error('Game updated failed')
        }
    }, [isSuccessUpdated, isErrorUpdated])

    useEffect(() => {
        if (isSuccessDeleted) {
            message.success('Game deleted successfully')
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error('Game deleted failed')
        }
    }, [isSuccessDeleted, isErrorDeleted])

    const handleCancel = () => {
        setIsModalOpen(false)
        setStateGame({
            game_id: '',
            game_name: '',
            description: '',
            header_image: '',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteGame = async () => {
        setIsLoading(true)
        try {
            await mutationDeleted.mutateAsync(
                { id: rowSelected, token: user?.access_token },
                {
                    onSettled: () => {
                        queryGame.refetch()
                    },
                },
            )
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateGameDetails({
            game_id: '',
            game_name: '',
            description: '',
            header_image: '',
        })
        form.resetFields()
    }

    const onFinish = async () => {
        const params = {
            game_id: stateGame.game_id,
            game_name: stateGame.game_name,
            description: stateGame.description,
            header_image: stateGame.header_image,
        }
        setIsLoading(true)
        try {
            await mutation.mutateAsync(params, {
                onSettled: () => {
                    queryGame.refetch()
                },
            })
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnChange = (e) => {
        setStateGame({
            ...stateGame,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnChangeDetails = (e) => {
        setStateGameDetails({
            ...stateGameDetails,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateGame({
            ...stateGame,
            header_image: file.preview,
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateGameDetails({
            ...stateGameDetails,
            header_image: file.preview,
        })
    }

    const onUpdateGame = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateGameDetails },
            {
                onSettled: () => {
                    queryGame.refetch()
                },
            },
        )
    }

    const handleChangeSelect = (value) => {
        setStateGame({
            ...stateGame,
            type: value,
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý game</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    columns={columns}
                    isLoading={isLoadingGames}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record.game_id)
                            },
                        }
                    }}
                />
            </div>
            <ModalComponent
                forceRender
                title="Game Submission"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Id"
                            name="game_id"
                            rules={[{ required: true, message: 'Please input game id!' }]}
                        >
                            <InputComponent value={stateGame.game_id} onChange={handleOnChange} name="game_id" />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="game_name"
                            rules={[{ required: true, message: 'Please input game name!' }]}
                        >
                            <InputComponent value={stateGame.game_name} onChange={handleOnChange} name="game_name" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input game description!' }]}
                        >
                            <InputComponent
                                value={stateGame.description}
                                onChange={handleOnChange}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="header_image"
                            rules={[{ required: true, message: 'Please upload game image!' }]}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </WrapperUploadFile>
                                {stateGame?.header_image && (
                                    <img
                                        src={stateGame?.header_image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent
                title="Game detail"
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width="90%"
            >
                <Loading isLoading={isLoadingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateGame}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Id"
                            name="game_id"
                            rules={[{ required: true, message: 'Please input game id!' }]}
                        >
                            <InputComponent
                                value={stateGameDetails.game_id}
                                onChange={handleOnChangeDetails}
                                name="game_id"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="game_name"
                            rules={[{ required: true, message: 'Please input game name!' }]}
                        >
                            <InputComponent
                                value={stateGameDetails.game_name}
                                onChange={handleOnChangeDetails}
                                name="game_name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input game description!' }]}
                        >
                            <InputComponent
                                value={stateGameDetails.description}
                                onChange={handleOnChangeDetails}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="header_image"
                            rules={[{ required: true, message: 'Please upload game image!' }]}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </WrapperUploadFile>
                                {stateGameDetails?.header_image && (
                                    <img
                                        src={stateGameDetails?.header_image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent
                forceRender
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteGame}
            >
                <Loading isLoading={isLoading}>
                    <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default AdminGame
