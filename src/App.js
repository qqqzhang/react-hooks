import './App.css';
import { useEffect, useState } from 'react';
import {useFetch} from './useFetch'

//Can be replaced with useReducer
let index = -1;

function App() {
  const [admin, setAdmin] = useState(false)
  const [user, setUser] = useState()
  
  const {loading, data, error} = useFetch(`https://api.github.com/users`)

  useEffect( () => {
    if(user) {
      document.title = `Celebrate ${user.login}`
      console.log(`changing name to ${user.login}`)
    }
  }, [user] );

  useEffect( () => {
    console.log(`use is admin = ${admin ? "Logged in" : " Not Logged in"}`)
  }, [admin])
/*
  useEffect( () => {
    fetch(`https://api.github.com/users`).then(
       (res) => res.json()).then( (users) => {
         setUsers(users)
         setIndex(0)
         setName(users[0].login)}
        )
  }, [] ) //make sure the [] so only called once!!
*/


  if(data) {
    if(!user) {
        index = 0;
        setUser(data[index]);
        console.log(JSON.stringify(data,null,2))
    }
    console.log(user)
    if(!user) return;

    console.log(index)
    
    return (
      <>
        <section>
          <ul>
         { data.map( (s) => {
            return <li key={s.id} > {s.login} </li>;
            } ) }
         </ul>
          <p> Congratulations {user.login} !</p>
          <img src={user.avatar_url} alt={user.login} />
          <h1> {user.login}</h1>
          { user.name && <p> {user.name}</p> }
          <button onClick={ () => 
            { index = (index + 1 )% data.length 
                setUser(data[index])
            } } > Change Winner</button>
          <p> { admin ? "Logged in" : "Not Logged in" } </p>
            <button onClick={ ()=>setAdmin(!admin)} >Change Login</button>
        </section>
      </>
    );
 }
 
 if(loading) {
  return (
    <section>
      <h1> Page is Loading ... </h1>
    </section>
  )
 }

 if(error) {
  return (
      <section>
      <pre> {JSON.stringify(error, null, 2)}</pre>
    </section>
  )
 }
}

export default App;
