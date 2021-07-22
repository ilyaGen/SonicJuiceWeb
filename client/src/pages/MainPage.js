import { useCallback, useEffect, useState } from "react"
import { useHTTP } from "../hooks/http.hook"

import { Loader } from "../components/Loader"
import { Post } from "../components/Post"
import { useMesssage } from "../hooks/message.hook"


export const MainPage = () => {

    const message = useMesssage()

    const { request, loading, clearError } = useHTTP()
    const [posts, setPosts] = useState(null)

    const getAllPosts = useCallback(async () => {
        try {
            const posts = await request(`/api/posts`)
            setPosts(posts)
        } catch (err) {
            message(err)
            clearError()
        }
    }, [request, message, clearError])

    useEffect(() => {
        getAllPosts()
    }
    ,[getAllPosts])


    if (loading) {
        return <Loader />
    }

    return (
        <div className='pb10'>
            { posts &&
                posts.map( (post, id) => {
                    return <Post post={post} key={id}/>
                })
            }
        </div>
    )
}