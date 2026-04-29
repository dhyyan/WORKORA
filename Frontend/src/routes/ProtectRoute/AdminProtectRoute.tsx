import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectRoute = ({ children }: ProtectedRouteProps) => {
    // Note: State keys from store.ts: admintAuth and admimToken
    const adminData = useSelector((state: RootState) => state.admintAuth.admin)
    const adminToken = useSelector((state: RootState) => state.admimToken.token)

    if (!adminData || !adminToken) {
        return <Navigate to="/admin/login" replace />
    }

    return <>{children}</>
}

export default AdminProtectRoute
