import '../styles/post.css'
import { Button } from './Button'

export const Post = ({ post }) => {

    return (
        <div>
            <div> 
                <img src={`${process.env.PUBLIC_URL}/images/posts/${post.asssetName}`} alt='none' />
            </div>

            
            <div className='post'>
            <h3 className='post-text'>{post.title}</h3>
                {post.text.split("\n").map( (paragraph, id) => {
                    return <div className='p10 post-text' key={id}>{paragraph}</div>
                })}
            </div>
            <div className='centered-box m20'>
                <Button
                    title={post.linkTitle}
                    handler={() => {
                        window.open(post.linkTo);
                    }}
                />
            </div>
            
        </div>
    )
}