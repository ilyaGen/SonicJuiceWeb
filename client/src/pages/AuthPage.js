import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHTTP } from "../hooks/http.hook"
import { useMesssage } from "../hooks/message.hook"
import { Button } from "../components/Button"
import { useHistory } from "react-router-dom"


export const AuthPage = () => {

    const history = useHistory()

    const auth = useContext(AuthContext)

    const message = useMesssage()

    const { loading, error, request, clearError } = useHTTP()


    const [form, setForm] = useState({
        email: '',
        password: ''
    })


    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            
            auth.login(data.token, data.userID)

        } catch (e) {}
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    return (
        <div className='centered-box-v'>
            <h1 className='center-text'>Login or Create an Account</h1>


            <div className='auth-form p10'>
                <div className='item p10'>

                    <h3>Registered Customers</h3>
                    <div className='pb5'>If you have an account with us, please log in.</div>
                    <div className=''>
                        <label htmlFor="email">Email</label>
                        <input 
                            className='yellow-input'
                            placeholder="Enter email"
                            id="email"
                            type="text"
                            name="email"
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='pb5'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='yellow-input'
                            placeholder="Enter password"
                            id="password"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                        />
                    </div>

                    <Button title={'Login'} handler={loginHandler} disabled={loading}/>

                </div>


                <div className='item p10'>
                    <h3>New Customers</h3>
                    <div className='pb10'>By creating an account you will be able to purchase items in the SonicJuice webshop, contact SonicJuice Support, view and track your orders and more.</div>
                    <Button title={'Register'} handler={() => {history.push('/register')}} disabled={loading}/>
                </div>

            </div>
        </div>
    )
}