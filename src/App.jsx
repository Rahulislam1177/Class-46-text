import './App.css'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from './firbase/firbase.config';
import { useState } from 'react';

function App() {
  const [users,setUsers] =useState({})
   console.log(users);
  const auth = getAuth(app);
 
  const handleSingUp = (event) => {

    event.preventDefault()
    const from =event.target;
     const email = from.email.value;
    const password = from.password.value;
   

   console.log(email,password);

   createUserWithEmailAndPassword(auth,email,password)
    .then(result => {
      const user =result.user;
      setUsers(user);
      from.reset();

    })
    .catch((error) => {
     console.log(error);
    
    });
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
       useState({})
    }).catch((error) => {
    });
  }
   const handleLogIn =(e)=> {
  e.preventDefault()
  const form =e.target;
   const email = form.email.value;
  const password = form.password.value;
  signInWithEmailAndPassword(auth,email,password)
  .then(result => {
    const user = result.user;
    setUsers(user)
    console.log(user);
    form.reset()
  })
  .catch(err => {
    console.log(err);
  })
}


 
  return (
    <>
       <div className='flex'>

        <div>
          <h2>LogIn</h2>

          <form onSubmit={handleLogIn}>

      <input type="email" placeholder='Type Your email'  name='email' /> <br />
      <input type="password" placeholder='Type Your password' name='password'/><br />
      <input type="submit" value="LogIn" /> 
      
     </form>
        </div>

        <div>
        <h2>SignUp here</h2> 
     {users?.uid && <><h5>Loged User: {users?.email}</h5> <button onClick={handleSignOut}>SignOut</button></>}
     
     <form onSubmit={handleSingUp}>

      <input type="email" placeholder='Type Your email'  name='email' /> <br />
      <input type="password" placeholder='Type Your password' name='password'/><br />
      <input type="submit" value="SignUp" /> 
      
     </form>
        </div>
       </div>
    </>
  )
}

export default App
