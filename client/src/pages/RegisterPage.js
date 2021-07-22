import { useEffect, useState } from "react"
import { useHTTP } from "../hooks/http.hook"
import { useMesssage } from "../hooks/message.hook"
import { Button } from "../components/Button"
import { useHistory } from "react-router-dom"


export const RegisterPage = () => {

    const history = useHistory()

    const message = useMesssage()

    const { loading, error, request, clearError } = useHTTP()

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmedPassword: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {

        console.log(form.password)
        console.log(form.confirmedPassword)

        if (form.password && (form.password === form.confirmedPassword)) {
            try {
                const data = await request('/api/auth/register', 'POST', {...form})
                message(data.message)
                history.push('/auth')
    
            } catch (e) {}
        } else {
            message('passwords do not match..')
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    return (
        <div className='centered-box-v'>
            <h1 className='center-text'>Create an Account</h1>

            <div className='p10'>
                <div className='w100'>
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
                <div className='w100'>
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

                <div className='w100 pb5'>
                    <label htmlFor="confirmedPassword">Confirm Password</label>
                    <input
                        className='yellow-input'
                        placeholder="Enter password"
                        id="confirmedPassword"
                        type="password"
                        name="confirmedPassword"
                        onChange={changeHandler}
                    />
                </div>

                <Button title={'Register'} handler={registerHandler} disabled={loading}/>

            </div>
        </div>
    )
}