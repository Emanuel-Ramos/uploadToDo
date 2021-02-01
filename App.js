import firebase from './src/Dados/Firebase'
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Keyboard,  } from 'react-native';
import TaksList from './src/Dados/TaskList'
import { AntDesign } from '@expo/vector-icons';

export default function App() {

  const [newTask, setNewTask] = useState(''); 
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [key, setKey] =useState('');

  useEffect(()=> {

    async function loadTasks(){
      await firebase.database().ref('tarefas').on('value', (snapshot)=>{
        setTasks([]);
  
        snapshot.forEach((childItem)=>{
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };
  
          setTasks(oldArray => [...oldArray, data]);
        })
  
  
      });
    }
  
    loadTasks();
  
   }, []);
  
  
   async function handleAdd(){
     if(newTask !== ''){

      if(key !== ''){
        await firebase.database().ref('tarefas').child(key).update({
          nome:newTask
        })
        Keyboard.dismiss();
        setKey('')
        setNewTask('')
        return
      }
  
      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;
  
      tarefas.child(chave).set({
        nome: newTask
      });
  
      Keyboard.dismiss();
      setNewTask('');
  
     }
   }

   async function handleDelete(key){
    await firebase.database().ref('tarefas').child(key).remove()

   }

  function handleEdit(data){
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus()
  }

  function cancelEdit(){
    setKey('');
    setNewTask('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>

    {key.length > 0 && (
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 5}}>
      <TouchableOpacity onPress={cancelEdit}>
      <AntDesign name="close" size={24} color="red" />
      </TouchableOpacity>
      <Text style={{color: 'red', marginLeft: 5, }}>
        Voce esta editando uma tarefa
      </Text>
    </View>

    )}


      
      <View style={styles.areaInput}>
        <TextInput style={styles.input} placeholder='O que vai fazer hoje?' 
        placeholderTextColor="white"
        onChangeText={(texto) => setNewTask(texto) }
        value={newTask}
        ref={inputRef}/>
        
        <TouchableOpacity style={styles.botaoAdd}
        onPress={handleAdd}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>

       
      </View>
      <FlatList 
      data={tasks}
      keyExtractor={item => item.key}
      renderItem={ ({item}) => (<TaksList data={item}
      deleteItem={handleDelete} 
      editItem={handleEdit}/>)}
    
      ></FlatList>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    backgroundColor: 'black',
    marginTop: 26
  },
  areaInput: {
    flexDirection: 'row',
    
  },
  input: {
    flex : 1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    height: 40,
    marginTop: 15,
    color: 'white'
  },
  botaoAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'white',
    paddingLeft: 14,
    paddingRight: 14,
    marginLeft: 5,
    marginTop: 15
  },
  textoBotao: {
    fontSize: 23,
    color: 'black'
  }

});
