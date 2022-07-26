import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import UserEditForm from './UserEditForm'
import PwdEditForm from './PwdEditForm'
import { useNavigate } from 'react-router-dom'
import './Profile.css';
import MyTripsProfile from '../trips/MyTripsProfile'



export default function Profile(props) {

    const [isEdit, setIsEdit] = useState(false)
    const [isPwdEdit, setIsPwdEdit] = useState(false)
    const navigate = useNavigate()

    const editView = () => {
        setIsEdit(true)
        setIsPwdEdit(false)

    }

    const editPwdView = () => {
        setIsPwdEdit(true)
        setIsEdit(false)

    }

    const editPwd = (currentUser) => {
        console.log("Axios call goes here")
        Axios.put("auth/profile/pwdchange", currentUser, {headers : {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }})
        .then(response => {
            console.log("Updated Password!")
            setIsPwdEdit(false)
            navigate('/profile')
            props.popupHandler({"type": "success", "message": "Updated password!"})
        })
        .catch(error => {
            console.log("Error Updating password !!!");
            console.log(error);
            props.popupHandler({"type": "error", "message": "Error Updating password - please try again"})
        })
    }

    const editUser = (newUser) => {
    Axios.put(`auth/profile/update?id=${newUser.id}`, newUser, {headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }})
    .then(response => {
        console.log("Updated User Information!")
        setIsEdit(false)
        navigate('/profile')
        props.popupHandler({"type": "success", "message": "Updated profile information!"})
        // window.location.reload()
        })
    .catch(error => {
        console.log("Error Updating User Information !!!");
        console.log(error);
        props.popupHandler({"type": "error", "message": "Error Updating User Information - please try again"})
    })
}


  return (
    <div>
        <h1>PROFILE</h1>

        <div className='profile-container'>
            
            <div className='profile-container-left-item'>
                {(props.currentUser.profileImage)
                ?
                <img alt="profile" width={"100px"} src={props.currentUser.profileImage}></img>
                :
                 <img alt="default" src='/img/non-conforming-gender.png' width={"100px"}></img>
                }
                
                {(!isEdit)?
                    <div className='user-info'>
                    <div>@{props.currentUser.username}</div> <br></br>
                    <div>{props.currentUser.firstName} {props.currentUser.lastName}</div><br></br>
                    <div>{props.currentUser.emailAddress}</div><br></br>
                    <button onClick={() =>{editView()}}>EDIT</button>
                    </div>
                :
                <div><UserEditForm editUser={editUser} currentUser={props.currentUser}/></div>
                
                }
                <br></br>
                {(!isPwdEdit)?
                    <button onClick={() =>{editPwdView()}}>CHANGE PASSWORD</button>
                :
                <div><PwdEditForm editPwd={editPwd} currentUser={props.currentUser}/></div>
                }
            </div>
            <div className='profile-container-mytrips-item'><MyTripsProfile currentUser={props.currentUser}></MyTripsProfile></div>
        </div>
        
    </div> 

  )
}
