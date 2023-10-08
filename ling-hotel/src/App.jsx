import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Pages
import Account from "./pages/Account"
import AppLayout from "./ui/AppLayout"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Dashboard from "./pages/Dashboard"
import GlobalStyles from "./styles/GlobalStyles"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import Settings from "./pages/Settings"
import Stick from './pages/Stick'
import Users from "./pages/Users"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to='dashboard'/>} />
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='bookings' element={<Bookings/>} />
            <Route path='stick' element={<Stick/>} />
            <Route path='cabins' element={<Cabins/>} />
            <Route path='users' element={<Users/>} />
            <Route path='settings' element={<Settings/>} />
            <Route path='account' element={<Account/>} />
          </Route>
          <Route path='login' element={<Login/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
