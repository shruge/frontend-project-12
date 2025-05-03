import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { authReset } from '../store/slices/authSlice'

const NavBar = () => {
  const { username } = useSelector(state => state.authData)
  const dispatch = useDispatch()

  const logOut = () => {
    localStorage.clear()
    dispatch(authReset())
  }

  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {username.length > 0 && <Button variant="primary" onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  )
}

export default NavBar
