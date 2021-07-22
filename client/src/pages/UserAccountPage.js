import { useContext, useCallback, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

import '../styles/accountPage.css'
import { useHTTP } from "../hooks/http.hook"
import { useMesssage } from "../hooks/message.hook"

import { Button } from "../components/Button"
import { Loader } from "../components/Loader"



export const UserAccountPage = () => {

    const auth = useContext(AuthContext)

    const message = useMesssage()

    const { request, loading, clearError } = useHTTP()
    const [account, setAccount] = useState(null)

    const changeHandler = (event) => {
        setAccount({...account, [event.target.name]: event.target.value})
    }

    const getAccount = useCallback(async () => {
        try {
            const account = await request(`/api/auth/account`, 'GET', null, {
                'Authorization': `Bearer ${auth.token}`
            })
            setAccount(account)
        } catch (err) {
            message(err)
            clearError()
        }
    }, [request, message, clearError, auth])


    const updateUser = useCallback( async () => {
        try {
            const updatedAccount = await request(`/api/auth/update`, 'POST', account, {
                'Authorization': `Bearer ${auth.token}`
            })
            setAccount(updatedAccount)
        } catch (err) {
            message(err)
            clearError()
        }
    }, [auth, message, clearError, request, account])



    const deleteUser = useCallback( async () => {
        if (window.confirm('Are you sure you wish to delete your account?')) {
            try {
                await request(`/api/auth/close`, 'DELETE', null, {
                    'Authorization': `Bearer ${auth.token}`
                })
                auth.logout()
            } catch (err) {
                message(err)
                clearError()
            }
        }
    }, [auth, message, clearError, request])

    useEffect(() => {
        getAccount()
    }
    ,[getAccount])

    useEffect(() => {
        getAccount()
    }
    ,[getAccount])


    if (loading) {
        return <Loader />
    }

    return (
        <div className='centered-box'>
            <div className='p10 account-info-container'>
                <h1>My Account</h1>

                <h4>Contact info</h4>
                <div className='input-line'>
                <div className='input-item'>
                    <label htmlFor="email">Email</label>
                    <input 
                        className='yellow-input'
                        placeholder="Enter email"
                        value={account ? account.email : ''}
                        id="email"
                        type="text"
                        name="email"
                        onChange={changeHandler}
                    />
                </div>
                <div className='input-item'>
                        <label htmlFor="phone">Phone number</label>
                        <input
                            className='yellow-input'
                            placeholder="Enter phone number"
                            value={account ? account.phone : ''}
                            id="phone"
                            type="text"
                            name="phone"
                            onChange={changeHandler}
                        />
                </div>
            </div>

                <h4>Shipping address</h4>
                <div className='input-line'>

                    <div className='input-item'>
                        <label htmlFor="name">First name</label>
                        <input
                            className='yellow-input'
                            placeholder="Enter name"
                            value={account ? account.name : ''}
                            id="name"
                            type="text"
                            name="name"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='input-item'>
                            <label htmlFor="email">Surname</label>
                            <input 
                                className='yellow-input'
                                placeholder="Enter surname"
                                value={account ? account.surname : ''}
                                id="surname"
                                type="text"
                                name="surname"
                                onChange={changeHandler}
                            />
                    </div>
                </div>
                <div className='input-line'>

                    <div className='w100'>
                        <label htmlFor="street">Street adress</label>
                        <input
                            className='yellow-input'
                            placeholder="Enter street adress"
                            value={account ? account.street : ''}
                            id="street"
                            type="text"
                            name="street"
                            onChange={changeHandler}
                        />
                    </div>
                </div>

                <div className='input-line'>
                    <div className='input-item'>
                        <label htmlFor="zip">Zip/Postal Code*</label>
                        <input
                            className='yellow-input'
                            placeholder="Enter Zip/Posta code"
                            value={account ? account.zip : ''}
                            id="zip"
                            type="text"
                            name="zip"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='input-item'>
                            <label htmlFor="city">City*</label>
                            <input 
                                className='yellow-input'
                                placeholder="Enter city"
                                value={account ? account.city : ''}
                                id="city"
                                type="text"
                                name="city"
                                onChange={changeHandler}
                            />
                    </div>
                </div>

                <div className='input-line pb5'>
                <div className='input-item'>
                    <label htmlFor="country">Country*</label>
                    <input
                        className='yellow-input'
                        placeholder="Enter country"
                        value={account ? account.country : ''}
                        id="country"
                        type="text"
                        name="country"
                        onChange={changeHandler}
                    />
                </div>
                <div className='input-item'>
                        <label htmlFor="state">State/Province</label>
                        <input 
                            className='yellow-input'
                            placeholder="Enter state/provance"
                            value={account ? account.state : ''}
                            id="state"
                            type="text"
                            name="state"
                            onChange={changeHandler}
                        />
                </div>
            </div>
                
                <div className='pb5'>
                    <Button  title={'Update'} handler={updateUser}/>
                </div>
                
                <div className='pb5'>
                    <Button title={'Logout'} handler={auth.logout}/>
                </div>
                
                <h2>Privacy Settings</h2>
                <span>We care about your integrity, and continuously work toward making your SonicJuice experience as secure and transparent as possible. Read the SonicJuice <a href="/privacy">Privacy Policy</a> to learn more about how we use and store personal data. This page is where you will be able to manage your privacy settings. Return to review this page, as it will be continuously updated.</span>
                <h3>Closing your account</h3>
                <span className='pb5'>Note: If you choose to close your account you will no longer be able to access our services including, for example: purchasing products, downloading previously bought Sound Packs or issuing support tickets. For the time being this is a manual process and needs to be initiated via an e-mail sent to us. Click the button below to start the process.</span>

                <div className='pb5'>
                    <Button title={'Close my account'} handler={deleteUser}/>
                </div>
            </div>
        </div>
    )
}