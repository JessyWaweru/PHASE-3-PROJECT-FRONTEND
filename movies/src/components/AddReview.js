import React,{useState} from "react";

function AddReview(props){
    const[movieReviews,setMovieReviews]=useState([])
    const[newReview,setNewReview]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        fetch(`http://localhost:9292/movies/${props.selectedMovie.id}/reviews`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({review:
            newReview})
        }
       

        )
        .then(res=>res.json())
        .then(data=>{
            setMovieReviews([...movieReviews,data.review])
            setNewReview('')
        })
    }
    const handleInputChange=(e)=>{
        setNewReview(e.target.value)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your movie review:
                    <input type="text"
                    value={newReview}
                    onChange={handleInputChange}/>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddReview