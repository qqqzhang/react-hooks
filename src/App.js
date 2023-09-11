import './App.css';
import { useEffect, useState, useRef} from 'react';
import {useFetch} from './useFetch'

//Can be replaced with useReducer

function App() {
  const [admin, setAdmin] = useState(false)
  const [user, setUser] = useState()
  
  const {loading, data, error} = useFetch(`https://api.github.com/users`)
  const index = useRef(-1);
  useEffect( () => {
    if(user) {
      document.title = `Celebrate ${user.login}`
      console.log(`changing name to ${user.login}`)
    }
  }, [user] );

  useEffect( () => {
    console.log(`user is admin = ${admin ? "Logged in" : " Not Logged in"}`)
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
        index.current = 0;
        setUser(data[index.current]);
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
            { index.current = (index.current + 1 )% data.length 
                setUser(data[index.current])
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
