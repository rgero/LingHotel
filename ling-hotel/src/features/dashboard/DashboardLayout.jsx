import Spinner from '../../ui/Spinner';
import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const {bookings, isLoading} = useRecentBookings();

  if (isLoading) return <Spinner/>

  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today Activity</div>
      <div>Stay Durations</div>
      <div>Sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
