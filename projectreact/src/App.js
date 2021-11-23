import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { 
  Container,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,

 } from 'reactstrap';

import Movie from './components/Movie'

function App() {

  const [moviesCount,setMoviesCount] = useState(0)
  const [moviesWishList, setMoviesWishList] = useState([])

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [moviesData, setMoviesData] = useState([])

  const toggle = () => setPopoverOpen(!popoverOpen);

  var handleClickAddMovie = (name,img) => {
    setMoviesCount(moviesCount+1)

      fetch('/wishlist-movie', {
        method: 'POST',
        headers: {'Content-type':'application/x-www-form-urlencoded'},
        body: `name=${name}&img=${img}`
      })
  
    }
  
  var handleClickDeleteMovie = (name) => {
    setMoviesCount(moviesCount-1)
    fetch("/wishlist-movie/" + name,
    {
      method:'delete'
    })
    // setMoviesWishList(moviesWishList.filter(object => object.name != name))
  }
  useEffect(() => {
    async function loadData2() {
      var rawResponse2 = await fetch('/wishlist-movie')
      var moviesData2 = await rawResponse2.json()
      setMoviesWishList(moviesData2.movies)
      console.log(moviesWishList)
      
      
    }
    loadData2()
  }, [])
  var cardWish = moviesWishList.map((movie,i) => {
    return (
      <ListGroupItem>
        <ListGroupItemText onClick={() => {handleClickDeleteMovie(movie.name)}}>
        <img width="25%" src={"https://image.tmdb.org/t/p/original/"+movie.img} /> {movie.name}
        </ListGroupItemText>
      </ListGroupItem>
    )
    
  })
  useEffect(() => {
  async function loadData2() {
    var rawResponse = await fetch('/new-movies')
    var moviesData2 = await rawResponse.json()
    setMoviesData(moviesData2.movies)
    
    
  }
  loadData2()
}, [])

  var movieList = moviesData.map((movie,i) => {
    var result = moviesWishList.find(element => element.name == movie.title)
    var isSee = false
    if(result != undefined){
      isSee = true
    }
    return(<Movie key={i} movieSee={isSee} handleClickDeleteMovieParent={handleClickDeleteMovie} handleClickAddMovieParent={handleClickAddMovie} movieName={movie.title} movieDesc={movie.overview} movieImg={movie.backdrop_path} globalRating={movie.vote_average} globalCountRating={movie.vote_count} />)
  })

  return (
    <div style={{backgroundColor:"#232528"}}>
      <Container>
        <Nav>
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="Popover1"  type="button">{moviesCount} films</Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>WishList</PopoverHeader>
                <PopoverBody>
                <ListGroup>
                {cardWish}
                </ListGroup>
                </PopoverBody>
              </Popover>
            </NavLink>
          </NavItem>
        </Nav>
        <Row>
          {movieList}
        </Row>
      </Container>
    </div>
  );
}

export default App;
