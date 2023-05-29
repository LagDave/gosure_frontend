import { useEffect, useState } from "react"
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login(){

  const [loginUrl, setLoginUrl] = useState(null);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {

    if(user) return navigate('/dashboard');
    axios.get('http://localhost:8001/api/auth/getGoogleRedirectURL')
    .then(response => {
      setLoginUrl(response.data);
    })
    
  }, [user])

  return (
    <>
      <div className="container my-5">
        <a
          className="btn btn-primary"
          href={ loginUrl && ( loginUrl ) }
        >Login with Google</a>
      </div>
    </>
  )
}