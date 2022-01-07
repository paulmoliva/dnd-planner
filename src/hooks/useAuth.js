import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import React from "react";

export const useAuth = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth)

    React.useEffect(() => {
        if (!currentUser.token) {
            navigate('/login')
        }
    }, [currentUser])
}