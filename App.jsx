import React, {useState} from "react";
import uuid from 'react-uuid';

function App(){
  const initUsers = [
      {id: id(), name: 'user1', surname: 'surn1', age:30,isEdit: false},
      {id: id(), name: 'user2', surname: 'surn2', age:31,isEdit: false},
      {id: id(), name: 'user3', surname: 'surn3', age:32,isEdit: false},
  ];
  function id(){
      return uuid()
  }
  const [users,setUsers]=useState(initUsers)
  function UsersField({id,type,text,changeField}){
      const [isEdit,setIsEdit]= useState(false);
      return <td>
          { 
          isEdit
          ?<input value={text} onChange={event=>changeField(id,type,event)} onBlur={()=> setIsEdit(false)}/>
          : <span onClick={() => setIsEdit(true)}>{text}</span>}
      </td>;
  }
  
  function User ({ id,name,surname,age,toggleMode,isEdit}){
   
      return <tr>
          name: <UsersField
          id={id}
          text={name}
          type="name"
          changeField={changeField}
          />,
          surname: <UsersField
          id={id}
          text={surname}
          type="surname"
          changeField={changeField}
          />,
          age: <UsersField
          id={id}
          text={age}
          type="age"
          changeField={changeField}
          />
          </tr>
  }
  function toggleMode(id){
      setUsers(users.map(use=>{
          if (use.id === id){
              use.isEdit = !use.isEdit;
          }
          return use;
      }));
  }
  function changeField(id,field,event){
      setUsers(users.map(use=>{
          if (use.id == id) {
              use[field] = event.target.value;
          }
          return use;
      }));
  }
  const rows = users.map(use=>{
      return <User
      key={use.id}
      id={use.id}
      name={use.name}
      surname={use.surname}
      age={use.age}
      changeField={changeField}
      />;
  });
  

  const info = users.map(use=>{
      return <User
      key={use.id}
      id={use.id}
      name={use.name}
      surname={use.surname}
      age={use.age}
      isEdit={use.isEdit}
      toggleMode={use.toggleMode}
      editProd={use.editProd}
      />;
  });

  function editProd(id,field,event){
      setUsers(users.map(use=>{
          if (use.id === id) {
              use[field] = event.target.value
          }
          return use;
      }));
  }



  return <div>
      {rows}
  </div>
}


export default App;
