import { useContext } from "react"
import { AuthContext } from "../../../context/context"

const Home = () => {
  const{loginData} = useContext(AuthContext );
  console.log(loginData);
  
  return (
    <div>
   Home
    
    </div>
  )
}

export default Home