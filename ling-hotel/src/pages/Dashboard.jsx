import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout"
import Heading from '../ui/Heading';
import Row from '../styles/Row';

const Dashboard = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter/>
      </Row>

      <DashboardLayout/>
    </>
  )
}

export default Dashboard
