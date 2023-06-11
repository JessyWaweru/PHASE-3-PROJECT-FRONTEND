import axios from "axios";
import React,{useState} from "react";

function AddReview(props){
    const[movieReviews,setMovieReviews]=useState([])
    const[newReview,setNewReview]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios
        .post(`http://localhost:9292/movies/${props.selectedMovie.id}/reviews`,{
        review:newReview})    
        .then(res=>{
            setMovieReviews([...movieReviews,res.data])
            setNewReview('')
        })
        .catch(error=>{
            console.error('ERror adding review:',error)
        })
        if(newReview.trim()!==''){
            props.onAddReview(newReview)
            setNewReview('')
        }
       
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your movie review:</label>
                    <input type="text"
                    id='review'
                    value={newReview}
                    onChange={e=>setNewReview(e.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddReview