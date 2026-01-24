import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: ReactNode;
}
const FreelancerProtectRoute = ({children}:ProtectedRouteProps) => {
    const userData=useSelector((state:RootState)=>state.freelancerAuth.freelancer)
    const userToken=useSelector((state:RootState)=>state.freelancerToken.token)
    if(userData&&userToken){
        return <Navigate to="/freelancer"/>
    }
  return <>{children}</>
}

export default FreelancerProtectRoute
