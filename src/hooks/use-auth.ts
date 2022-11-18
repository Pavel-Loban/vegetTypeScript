import { useSelector } from "react-redux";
import { useAppSelector } from "./redux-hooks";

export function useAuth () {
    const {email,token, id,nameUser } = useAppSelector(state => state.user)
    return {
        isAuth: !!email,
        email,
        token,
        id,
        nameUser,
    };
}