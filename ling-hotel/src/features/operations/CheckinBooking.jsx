/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import BookingPresentation from "../../features/bookings/BookingPresentation";
import Button from "../../styles/Button";
import ButtonGroup from "../../styles/ButtonGroup";
import ButtonText from "../../styles/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import { useBooking } from "../bookings/hooks/useBooking";
import { useCheckin } from "./hooks/useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/hooks/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {booking, isLoading} = useBooking();
  const moveBack = useMoveBack();
  const {checkIn, isCheckingIn} = useCheckin();

  const {settings, isLoading: isLoadingSettings} = useSettings();

  useEffect(()=> {
    setConfirmedPaid(booking?.hasPaid)
  }, [booking])

  if (isLoading || isLoadingSettings) return <Spinner/>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast)
    {
      checkIn({bookingId, breakfast: {hasBreakfast: true, extrasPrice: optionalBreakfastPrice, totalPrice: totalPrice + optionalBreakfastPrice}})
    } else {
      checkIn({bookingId, breakfast: {}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingPresentation booking={booking} />

      {!hasBreakfast && 
        <Box>
          <Checkbox 
            checked={addBreakfast || isCheckingIn} 
            onChange={()=> {
              setAddBreakfast(!addBreakfast)
              setConfirmedPaid(false);
            }} id="add-breakfast"
          >
            Add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      }

      <Box>
        <Checkbox checked={confirmPaid || isCheckingIn} disabled={confirmPaid} onChange={()=>setConfirmedPaid(!confirmPaid)} id="confirm">
          I confirm that {guests.fullName} has paid the total amount of{" "}
            {!addBreakfast ? formatCurrency(totalPrice)
              : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
