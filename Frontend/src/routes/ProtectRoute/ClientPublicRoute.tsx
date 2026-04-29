import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode;
}

const ClientPublicRoute = ({ children }: PublicRouteProps) => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const userToken = useSelector((state: RootState) => state.clientToken.token)

  if (userData && userToken) {
    return <Navigate to="/client" replace />
  }
  return <>{children}</>
}

export default ClientPublicRoute
