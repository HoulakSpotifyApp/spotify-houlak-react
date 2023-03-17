import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import{ useState, useEffect} from 'react';

const ID_SPOTIFY ="73a843357efd4a8a8b3efbf634505bc7";

function App() {
  const [buscadorInput, setBuscadorInput] = useState("");
  
  const [albums, setAlbums] = useState([]);

  useEffect(() =>{
    //API Access Token

    
  })
  // Search
  async function search() {
    

  // ver albums segun el nombre artista
  let returnedAlbums = await fetch('http://localhost:4000/albums/' + buscadorInput)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    setAlbums(data);
  });
  let data ={nombre_artista: buscadorInput};
  // Se le pasa el id de spotifi estaticamente por parametro ya que no tenemos funcionalidad de login
  let postUser = await fetch('http://localhost:4000/users/' + ID_SPOTIFY, {
    
    method:'POST',
    body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
  }
  
    
  
  console.log(albums);
  return (
    <div className="App">
     <Container>
      <InputGroup className='mb-3' size="lg">
        <FormControl
        placeholder='Buscar Artista' type='input' onKeyPress={event =>{
          if(event.key == "Enter"){
            search();
          }
        }}
        //Captura lo que se escribe en input y con el hook lo setea
        onChange={event => setBuscadorInput(event.target.value)}
        />     
       <Button onClick={search}>
        Buscar
       </Button>
      </InputGroup>
     </Container>
     <Container>
      <Row className='mx-2 row row-cols-4'>
        {albums.map((album, i)=>{
          console.log(album);
            return(     
            <Card>
              <Card.Img src={album.images[0].url}/> 
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>)
        })}
 
      
      </Row>
     
     </Container>
    </div>
  );
}

export default App;
