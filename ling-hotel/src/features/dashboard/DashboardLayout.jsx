/* eslint-disable no-unused-vars */

import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import TodayActivity from '../operations/TodayActivity';
import styled from "styled-components";
import { useCabins } from "../cabins/hooks/useCabins";
import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from './hooks/useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const {bookings, isLoading} = useRecentBookings();
  const {confirmedStays, numDays, isLoading: isStaysLoading} = useRecentStays();
  const {cabins, isLoading: isLoadingCabins} = useCabins();

  if (isLoading || isStaysLoading || isLoadingCabins) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} cabinCount={cabins.length} numDays={numDays}/>
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
