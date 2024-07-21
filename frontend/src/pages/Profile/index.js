import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useMutationHooks } from '~/hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { Button, message } from 'antd'
import { updateUser } from '~/redux/slices/userSlice'
import { getBase64 } from '~/utils'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '~/components/InputForm/InputForm'
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent'
import { UploadOutlined } from '@ant-design/icons'

function Profile() {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data
        UserService.updateUser(id, access_token, rests)
    })

    const dispatch = useDispatch()
    const { isSuccess, isError } = mutation

    useEffect(() => {
        setUsername(user?.username)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success('Cập nhật người dùng thành công')
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error('Cập nhật người dùng không thành công')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        console.log('res', res)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setUsername(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, username, phone, avatar, access_token: user?.access_token })
    }

    return (
        <div style={{ width: '1270px', margin: '75px auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="name">Name</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id="name" value={username} onChange={handleOnchangeName} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '4px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor="email">Email</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '4px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '4px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img
                            src={avatar}
                            style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                            alt="avatar"
                        />
                    )}
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '4px 6px',
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}

export default Profile
