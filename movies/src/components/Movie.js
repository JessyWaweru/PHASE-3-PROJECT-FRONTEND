import React,{useState,useEffect} from 'react'
import axios from 'axios'
import AddReview from './AddReview'
function Movie(){
    const[movies,setMovies]=useState([])
    const[selectedMovie,setSelectedMovie]=useState(null)
    const[reviews,setReviews]=useState([])

    useEffect(()=>{axios.get('http://localhost:9292/movies').then((res)=>{
        setMovies(res.data)
    })
    },
    
[])

const handleSelectMovie=(movie)=>{
    setSelectedMovie(movie)
    axios.get(`http://localhost:9292/movies/${movie.id}/reviews`).then((res)=>{setReviews(res.data)})
    }
function deleteAllMovies(){
    axios.delete('http://localhost:9292/movies')
}



return (
    <div className='App'>
        <h4 onClick={()=>deleteAllMovies()}>RESET MOVIE DATABASE</h4>
        <h1>MOVIE REVIEW HUB</h1>
        <ul>
            {movies.map((movie)=>(
                <li key={movie.id}onClick={()=>
                handleSelectMovie(movie)}>{movie.title}</li>))}
                </ul>
                {selectedMovie && (
                    <div>
                        
                        <h2>{selectedMovie.title}</h2>
                        <img src={selectedMovie.image_url}
                        alt={selectedMovie.title}/>
                        <p>About:{selectedMovie.about}</p>
                        <p>Star Rating:{selectedMovie.star_rating}</p>
                        <h3>Reviews</h3>
                        <p><AddReview selectedMovie={selectedMovie}/></p>
                        <ul>
                            {reviews.map((review)=>(
                                <li key={review.id}>
                                    <strong>{review.username};</strong>{review.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                

    </div>
)
}

export default Movie