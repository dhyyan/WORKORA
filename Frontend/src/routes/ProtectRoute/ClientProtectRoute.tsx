import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom'
import {type ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode;
}

const ClientProtectRoute = ({ children }: ProtectedRouteProps) => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const userToken = useSelector((state: RootState) => state.clientToken.token)

  if (!userData || !userToken) {
    return <Navigate to="/client/login" replace />
  }
  return <>{children}</>
}

export default ClientProtectRoute
