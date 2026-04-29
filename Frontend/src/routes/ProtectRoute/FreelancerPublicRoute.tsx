import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { Navigate } from "react-router-dom"

interface PublicRouteProps {
  children: ReactNode;
}

const FreelancerPublicRoute = ({ children }: PublicRouteProps) => {
  const userData = useSelector((state: RootState) => state.freelancerAuth.freelancer)
  const userToken = useSelector((state: RootState) => state.freelancerToken.token)

  if (userData && userToken) {
    return <Navigate to="/freelancer" replace />
  }
  return <>{children}</>
}

export default FreelancerPublicRoute
