import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';




function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [rua, setRua] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [estado, setEstado] = useState(null);
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [descricao, setDescricao] = useState('');

  const URL_TO_FETCH = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+latitude+'&lon='+longitude;


const getLocal = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    setLatitude( position.coords.latitude);
    setLongitude(position.coords.longitude);

    return position;
    
});}
  

  const  getLocation   =()  =>{
/*
      navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatitude( position.coords.latitude);
      setLongitude(position.coords.longitude);
        */

      getLocal();
      
   
		 fetch(URL_TO_FETCH)
		     .then((response) => {
			 return response.json();
		     })
		     .then((data) => {		 	 		 
         setDados(data);
         setRua(data['address']['road']);
         setCidade(data['address']['city']);
         setBairro(data['address']['suburb']);
         setEstado(data['address']['state']);
         setCep(data['address']['postcode']); 
         console.log(data);
            
		     })
		     .catch((err) => {
           console.log("Not found");
			 
		     })
           
  }
  useEffect(() => {
     if(latitude==null && longitude==null){
       getLocal();

     }

   });

   const handleChange = (event) => {

   }

   const abrirOcorrencia = () =>{
    
    const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nome,
        latitude: latitude,
        longitude: longitude,
       rua: rua,
      bairro: bairro,
       cidade: cidade,
      estado: estado,
      descricao: descricao
    })
  };

  fetch('https://digoboratv.000webhostapp.com/socorre/api/insert.php', requestOptions)
      .then(async response => {
          const data = await response.json();

      
          if (!response.ok) {
          
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          alert("Ocorrencia aberta")
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });

   }

   const enviarDadosNovo = async () =>
    {
      fetch('https://digoboratv.000webhostapp.com/socorre/api/insert.php', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({nome: nome,
        latitude: latitude,
        longitude: longitude,
       rua: rua,
      bairro: bairro,
       cidade: cidade,
      estado: estado,
      descricao: descricao,
      telefone: telefone

      })
    }).then(()=>{alert("Ocorrencia aberta")})
    
    }

   const enviarDados = async () =>
    {
      fetch('https://digoboratv.000webhostapp.com/testes/dbinsert.php', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        name: 'asdfg',
        latitude: 12234,
        longitude: 12234,
        ocorrencia: 'descricao',

      })
    }).then(()=>{alert("Ocorrencia aberta")})
    
    }

    const  sendInfo = () => 
    {
      fetch('https://digoboratv.000webhostapp.com/testes/dbinsert.php', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'besta',
          latitude: 1234,
          longitude: 1234,
          ocorrencia: 'teste de ocoor',
  
        })
      })
          
    }

    const updateRua = (event) =>{
      setRua(event.target.value);
    }
    const updateBairro = (event) =>{
      setBairro(event.target.value);
    }
    const updateCidade = (event) =>{
      setCidade(event.target.value);
    }
    const updateEstado = (event) =>{
      setEstado(event.target.value);
    }
    const updateNome = (event) =>{
      setNome(event.target.value);
    }
    const updateTelefone = (event) =>{
      setTelefone(event.target.value);
    }

    const updateDescricao = (event) =>{
      setDescricao(event.target.value);
    }
   
  return (
    <div className="App">
     <form >

      <div className="form-group">
        <button type="button" className="btn btn-outline-primary mt-2" onClick={getLocation}> Capturar Localização</button>
      </div>

      <div className="form-group">
          <label >Rua</label>
          <input type="text" className="form-control" id="fRua" aria-describedby="emailHelp" value={rua} onChange={updateRua}/>             
      </div>

      <div className="form-group">
          <label >Bairro</label>
          <input type="text" className="form-control" id="fBairro" aria-describedby="emailHelp" value={bairro}  onChange={updateBairro}/>             
      </div>

      <div className="form-group">
          <label >Cidade</label>
          <input type="text" className="form-control" id="fCidade"  value={cidade} onChange={updateCidade}/>             
      </div>

      <div className="form-group">
          <label >Estado</label>
          <input type="text" className="form-control" id="fEstado"  value={estado} onChange={updateEstado}/>             
      </div>

      <div className="form-group">
          <label >Nome</label>
          <input type="text" className="form-control" id="fNome" onChange={updateNome}/>             
      </div>

      <div className="form-group">
          <label >Telefone</label>
          <input type="text" className="form-control" id="fTel"onChange={updateTelefone} />             
      </div>

      <div className="form-group">
          <label >Descrição da Ocorência</label>
          <textarea className="form-control" id="fDescricao" rows="3" onChange={updateDescricao}></textarea>
      </div>
              
      <div className="form-group">
          <button className="btn btn-primary">Carregar Imagem</button>
      </div>

      <div className="form-group">
          <button type="button" className="btn btn-danger" onClick={enviarDadosNovo}>Abrir Ocorência</button>
      </div>

     </form>
      
    </div>
  );
}

/*

 <header className="App-header">
      <span>Teste</span>
      <button onClick={getLocation}>CLIQUE AQUI</button>
      <label>Latitude: {latitude}</label>
      <label>Longitude:{longitude}</label>
      </header>
      */

export default App;
