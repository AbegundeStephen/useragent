import React, { useState } from 'react'
import styles from'./Login.module.css'
import { useRouter } from 'next/router'
import { LuLogIn } from "react-icons/lu";

const Login = ({onLogin}) => {
  
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onLogin()
    router.push('/datatable')
  }
  return (
    <div className={styles.body}>
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleFormSubmit}>
       <LuLogIn size={45} color='white'/>
        <label className={styles.label} htmlFor='username'>Username:</label>
        <input className={styles.input} type='text' value="test" id='username' name='username' />
        <label className={styles.label} htmlFor='password'>Password:</label>
        <input className={styles.input} type='password' value="dymmydata" id='password' name='password'/>

        <button className={styles.button} onClick={onLogin}>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login