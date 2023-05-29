import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../stores/userSlice";

export default function Dashboard() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutUserHandler = () => {

    console.log(user.accessToken);

    axios.get('http://localhost:8001/api/auth/logoutUser', {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + user.accessToken,
    })
    .then((response) => {
      console.log(response)
      dispatch(logoutUser());
    })

  } 

  const fetchUserData = () => {

    axios.get(`http://localhost:8001/api/user/getActiveUser`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken,
      }
    })
    .then(response => {
      console.log(response)
    })

  }
  

  useEffect(() => {
    
    if(user) return;
    navigate('/login');

  }, [user])

  return (
    <section className="my-5">
      <div className="container">
        <h1>Dashboard</h1>
        <p>{
          user && user.name
        }</p>
        {
          user && (
            <button onClick={logoutUserHandler} className="btn btn-danger">Log out</button>
          )
        }
      </div>
    </section>
  )

}