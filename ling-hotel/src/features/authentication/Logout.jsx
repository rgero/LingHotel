import ButtonIcon from "../../styles/ButtonIcon"
import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useLogout } from "./hooks/useLogout"

const Logout = () => {
  const {logout, isLoading} = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      <HiArrowRightOnRectangle/>
    </ButtonIcon>
  )
}

export default Logout
