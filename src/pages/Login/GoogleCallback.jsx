import axios from 'axios';
import {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../stores/userSlice";

function GoogleCallback() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // On page load, we take "search" parameters 
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {
      
      if(user) return;
      
      // login the user to get access token
      axios.get(`http://localhost:8001/api/auth/google/loginUser${location.search}`)
      .then(response => {
        dispatch(setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          id: response.data.user.id,
          accessToken: response.data.access_token
        }))
        navigate('/dashboard')
      })

    }, []);

    const logoutUser = () => {

      axios.get('http://localhost:8001/api/auth/logoutUser', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + user.accessToken,
        }
      })
      .then((response) => {
        console.log(response)
      })
    }

    return (
      <>
        Userdata: 
        {
          user && (
            <></>
          )
        }
      </>
    )

}

export default GoogleCallback;