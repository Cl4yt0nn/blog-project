import React, { useEffect, useState } from "react";
import axios from "axios";

function CreatePost() {
    const acc = localStorage.getItem('accLoggedInto');

    let verifyArr = [false, false, false];

    const [disabled, verify] = useState(true);
    if (acc == 'undefined') {
        location.replace('/signin');
    }

    const [blogForm, setBlogForm] = useState({
        title: "",
        description: "",
        text: "",
        imageURL: "",
    });

    const inputsHandler = (e) => {
        setBlogForm((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
            author: JSON.parse(localStorage.getItem("accLoggedInto")).username
        }));
        
        let charArr = [4,10,50];
        for (let i = 0; i < 3; i++) {
            if (document.getElementsByClassName("mb-3")[i].firstChild.value.length >= charArr[i]) {
                verifyArr[i] = true;
            } else {
                verifyArr[i] = false;
            }
        }
        if (verifyArr[0] == true && verifyArr[1] == true && verifyArr[2] == true) {
            verify(false);
            document.getElementById("submit").className = "btn on";
        } else {
            verify(true);
            document.getElementById("submit").className = "btn";
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/posts/create-post", blogForm)
            .then((res) => {
                console.log(res.data.data);
            });
        location.replace('/display-post');
    };

    const cloud_name = "dur9sal91";

    // const cloudHandler = (e) => {
    //     console.log("running cloudHandler")
    //     const formData = new FormData();
    //     formData.append('file', e.target.files[0]);
    //     formData.append("upload_preset", 'Blogimages');
    //     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    //       .then((res) => {     
    //         const imageurl = res.data.secure_url;
    //         // blogForm.imageURL = imageurl;
    //         setBlogForm(prev => ({
    //             ...prev,
    //             imageURL: 'hi',
    //         }));
    //         console.log(blogForm)
    //       });    
    //   };

    const cloudHandler = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append("upload_preset", 'Blogimages');
        
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
          .then((res) => {     
            const imageurl = res.data.secure_url;
            setBlogForm(prev => ({
                ...prev,
                imageURL: imageurl,
            }));
          });    
    };
    
    useEffect(() => {
        console.log(blogForm); // Log the updated state here
    }, [blogForm]);

    return(
        <div>
            <div className="form-wrapper">
                <form onSubmit={onSubmit} className="cForm">
                    <div className="mb-3">
                        <input type="text" className="cTitle" name="title" id="title" onChange={inputsHandler} placeholder="Title" />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="cDesc" name="description" id="description" onChange={inputsHandler} placeholder="Description" />
                    </div>

                    <div className="mb-3">
                        <textarea type="text" className="cText" name="text" id="text" onChange={inputsHandler} placeholder="Enter text here..." />
                    </div>
                    <div className="mb-3">
                        <input type="file" className="cImg" name="image" id="image" onChange={cloudHandler} />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn" disabled={disabled} id="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;