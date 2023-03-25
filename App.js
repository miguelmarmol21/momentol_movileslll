import { useState } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';


let notas = []

export default function App() {
const[identificacion, setIdentificacion] = useState('')
const[nombres, setNombres] = useState('')
const[asignatura, setAsigmatura] = useState('')
const[nota1, setNota1] = useState('');
const[nota2, setNota2] = useState('');
const[nota3, setNota3] = useState('');
const[definitiva, setDefinitiva] = useState('');
const[observacion, setObservacion] = useState('');
const[esValido, setEsValido] = useState('');
const[mensaje, setMensaje] = useState('');

function valCampos(){
  if(nota1 === "" || nota2 === "" || nota3 === "" || identificacion === "" || nombres === "" || asignatura === ""){
    return false
  }else{
    return true
  }
}

function valValores(){
  let n1 = parseFloat(nota1)
  let n2 = parseFloat(nota2)
  let n3 = parseFloat(nota3)
  
  if(n1 >= 0 && n1 <= 5){
    if(n2 >= 0 && n2 <= 5){
      if(n3 >= 0 && n3 <= 5){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }else{
    return false
  }
}

let calcular = () =>{
  let ob = ''
  let resValCam = valCampos()
  let resValVal = valValores()
  let resultado = (parseFloat(nota1) * 0.3) + (parseFloat(nota2) * 0.35) + (parseFloat(nota3) * 0.35)
  if(resValCam){
    if(resValVal){
      setEsValido(true);
      setMensaje('')
      if(resultado < 2){
        setDefinitiva(resultado);
        setObservacion('Reprueba');
        ob = 'Reprueba'
      }else if(resultado >= 2 && resultado < 3){
        setDefinitiva(resultado);
        setObservacion('Habilita');
        setEsValido(false)
        ob = 'Aprueba'
      }else if(resultado >= 3 && resultado <= 5){
        setDefinitiva(resultado);
        setObservacion('Aprueba');
        ob = 'Aprueba'
      }
      setEsValido(true)
      setMensaje('Estudiante Ingresado')
      notas.push({identificacion:identificacion,nombres:nombres,asignatura:asignatura,nota1:nota1,nota2:nota2,nota3:nota3,definitiva:resultado.toString(),observacion:ob})
      console.log(notas)
    }else{
      setEsValido(false);
      setMensaje('Se deben ingresar valores entre 0 y 5')
    }
  }else{
    setEsValido(false)
    setMensaje('Se deben ingresar todos los campos')
  }
}

let limpiar = () =>{
  setIdentificacion('')
  setNombres('')
  setAsigmatura('')
  setNota1('')
  setNota2('')
  setNota3('')
  setDefinitiva('')
  setObservacion('')
  setMensaje('')
}

let buscarAlumno = () =>{
  let ident = identificacion
  const notaFind = notas.find(idFind => idFind.identificacion === ident)
  if(ident === ""){
    setEsValido(false)
    setMensaje('Ingresa una identificacion')
  }else{
    if(notaFind != undefined){
      console.log(notaFind)
      setNombres(notaFind.nombres)
      setAsigmatura(notaFind.asignatura)
      setNota1(notaFind.nota1)
      setNota2(notaFind.nota2)
      setNota3(notaFind.nota3)
      setDefinitiva(notaFind.definitiva)
    }else{
      setEsValido(false)
      setMensaje('No existe identificacion')
    }
  }

}

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.view,{flex:1, backgroundColor:'#E1F6FF'}]}>
      <Banner name="codereact"></Banner>
      </View>
      <View style={[styles.container, styles.view,{flex:5, backgroundColor:'#E1F6FF'}]}>
	      <TextInput
          placeholder='Identificación'
          style={styles.textInput}
          onChangeText={(identificacion) => setIdentificacion(identificacion)}
          value={identificacion}
        ></TextInput>
        <TextInput
          placeholder='Nombres'
          style={styles.textInput}
          onChangeText={(nombres) => setNombres(nombres)}
          value={nombres}
        ></TextInput>
        <TextInput
          placeholder='Asignatura'
          style={styles.textInput}
          onChangeText={(asignatura) => setAsigmatura(asignatura)}
          value={asignatura}
        ></TextInput>
        <TextInput
          placeholder='Nota Momento 1 (30%)'
          style={styles.textInput}
          onChangeText={(nota1) => setNota1(nota1)}
          value={nota1}
        ></TextInput>
        <TextInput
          placeholder='Nota Momento 2 (35%)'
          style={styles.textInput}
          onChangeText={(nota2) => setNota2(nota2)}
          value={nota2}
        ></TextInput>
        <TextInput
          placeholder='Nota Momento 3 (35%)'
          style={styles.textInput}
          onChangeText={(nota3) => setNota3(nota3)}
          value={nota3}
        ></TextInput>
        <TextInput
          placeholder='Definitiva'
          editable={false}
          style={styles.textInput}
          onChangeText={(definitiva) => setDefinitiva(definitiva)}
          value={definitiva}
        ></TextInput>
        <TextInput
          placeholder='Observacion'
          editable={false}
          style={styles.textInput}
          onChangeText={(observacion) => setObservacion(observacion)}
          value={observacion}
        ></TextInput>
        <View style={{flexDirection:'colum', alignItems: 'center'}}>
        <Text style={{fontWeight:'bold', marginTop:20, marginBottom:25, fontSize:15, color: esValido ? "green" : "red"}}>{mensaje}</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={[styles.buttons, {backgroundColor:'#00B6FF'}]}
            onPress= {() => calcular()}
          >
            <Text>Calcular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, {backgroundColor:'#00B6FF'}]}
            onPress={() => buscarAlumno()}
          >
            <Text>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, {backgroundColor:'#00B6FF'}]}
            onPress={() => limpiar()}
          >
            <Text>Limpiar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <View style={[{flex:1,backgroundColor:'#000000',alignItems: 'center'}]}>
          <Text style={{color:'#FFFFFF',marginTop:20}}>Primer Momento</Text>
          <Text style={{color:'#FFFFFF'}}>Moviles 3</Text>
          <Text style={{color:'#FFFFFF'}}>CESDE</Text>
          <Text style={{color:'#FFFFFF'}}>copyRight © 2023</Text>
      </View>
    </View>
  );
}

function Banner(props){
  return(
    <Image style={{width:'100%',height:'100%',resizeMode:'stretch'}} source={require(`./assets/${props.name}.png`)}>

    </Image>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  view:{
    width:'100%', 
    height:'100%',
  },
  textInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:10,
    placeholderTextColor:"#4D4D4D",
    padding: 10,
  },
  buttons:{
    borderRadius:10, 
    padding:10, 
    width:70,
    marginLeft:10, 
    textAlign:'center'
  }
})
