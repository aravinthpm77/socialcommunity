import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
const Createpost = () =>{
    
    const User=useSelector((state)=>(state.currentUserReducer))
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [navigate])

    const handleChange = (e) => {
        setTitle(e.target.value)
    }


    const handleClick = () => {
        if(User===null){
            toast.warning("Login to Answer")
            navigate('/Auth')
        }
        else{
            if((!title && !image)||(!title && image)||(title && !image)){
                toast.error('Required both Title, Image')
            }
            else{
                console.log(title,  image, 19)

                const formData = new FormData()
                formData.append('title', title)
                formData.append('image', image)
                formData.append('UserPosted', User.result.name)
                axios.post('https://react-socialogram.onrender.com/api/services',
                    formData,
                    {
                        headers: { 'Authorization': localStorage.getItem('token') }
                    }
                )
                    .then((res) => {
                        console.log(res.data)
        
                        if (res.data.code === 403 && res.data.message === 'Token Expired') {
                            localStorage.setItem('token', null)
                        }
                        navigate('/home')
                    })
                    .catch(err => {
                        console.log(err, "err")
                    })
            }
            
        }
        
    }


   
    

   
    
    
    return (
            <div className="Create-post">
                <div className="create-post-section">
                    <div className="header-post-section">
                       
                        <img className="post-img" src="https://img.icons8.com/small/16/ball-point-pen.png"S alt="new-post" />   
                        <Link to='/' className="header-post"  style={{textDecoration:"none" }}>Create Post </Link>
                    </div>
                    <div className="header-textbox">
                        <form onSubmit={handleClick}>
                            
                            <textarea name="title"  onChange={handleChange} id="ask-post-title" cols='50' rows='6' placeholder="What's on your mind"></textarea>
                            
                            <img width="30" height="30" className="img-upload" src="https://img.icons8.com/fluency-systems-regular/48/FF0000/full-image.png" alt=""/>
                            <input type="file" accept="image/* ,image/png, video/*" multiple = "true" onChange={(e) => setImage(e.target.files[0])}/>
                            
                            <button className="upload-submit"  type="submit">Submit</button>
                        </form>
                    </div>


                    
                    
                    
                </div>
                
            </div>
    )
}

export default Createpost 
