import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

// Pages
import Account from "./pages/Account"
import AppLayout from "./ui/AppLayout"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Dashboard from "./pages/Dashboard"
import GlobalStyles from "./styles/GlobalStyles"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Settings from "./pages/Settings"
import Users from "./pages/Users"

const App = () => {
  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to='dashboard'/>} />
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='bookings' element={<Bookings/>} />
            <Route path='cabins' element={<Cabins/>} />
            <Route path='users' element={<Users/>} />
            <Route path='settings' element={<Settings/>} />
            <Route path='account' element={<Account/>} />
          </Route>
          <Route path='login' element={<Login/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App