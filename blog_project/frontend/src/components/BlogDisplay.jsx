import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function HomePage() {
    
    const [blogForm, setBlogForm] = useState([]);

    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/posts/view/" + params.id)
            .then((res) => {
                setBlogForm(res.data.data);
                console.log(blogForm)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (   
        <div className="dispContainer">
            <div>
                <img src={blogForm.imageURL} alt="image" />
                <h1 className="dispTitle">{blogForm.title}</h1>
                <h2 className="dispAuthor">By: {blogForm.author}</h2>
                <p className="dispText">{blogForm.text}</p>
            </div>
        </div>
);
}


            

export default HomePage;