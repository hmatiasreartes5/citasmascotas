import React,{useState ,Fragment, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'


function App() {

  //cargar las citas del localStorage en el state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales=[];
  }

  //El useState retorna 2 cosas, el state actual y el this.setState() funcion que actualiza el state
  const [citas, guardarCitas]= useState(citasIniciales);

  //almacenar datos en el local storage
  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if(citasIniciales){
          localStorage.setItem('citas',JSON.stringify(citas));
      }else{
          localStorage.setItem('citas',JSON.stringify([]));
      }
    } , [citas])

  //agregar nuevas citas al state citas
  const crearCita = (datosCita) =>{
    //creamos una copia del state(citas) y agregamos los datosCita
    const nuevaCita = [...citas,datosCita];
    //almacenamos el state
    guardarCitas(nuevaCita);
  }

  //eliminar citas 
  const eliminarCita = (indexCita) =>{
    //creo una copia del state
    const nuevaCita = [...citas];
    nuevaCita.splice(indexCita,1);
    guardarCitas(nuevaCita);

  }

  //Cargar condicinalmente un componente 
  const titulo = Object.keys(citas).length === 0 ? 'No hay Citas' : 'Administrador de Citas'

  return (
      <Fragment>
        <h1>Administrador de Pacientes</h1>
        <div className="container">
          <div className="row">
            <div className="one-half column">
                <Formulario 
                  crearCita={crearCita}
                />
            </div>
            <div className="one-half column">
                  <h1>{titulo}</h1>
                  {citas.map((cita,index) =>(
                    <Cita 
                      key={index}
                      index={index}
                      cita={cita}
                      eliminarCita={eliminarCita}
                    />
                  ))}
            </div>
          </div>
        </div>
      </Fragment>  
  );
}

export default App;
