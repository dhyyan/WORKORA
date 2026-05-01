import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode;
}

const AdminPublicRoute = ({ children }: PublicRouteProps) => {
    // Note: State keys from store.ts: admintAuth and admimToken
    const adminData = useSelector((state: RootState) => state.admintAuth.admin)
    const adminToken = useSelector((state: RootState) => state.admimToken.token)

    if (adminData && adminToken) {
        return <Navigate to="/admin/dashboard" replace />
    }

    return <>{children}</>
}

export default AdminPublicRoute
