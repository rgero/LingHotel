import BookingPresentation from "./BookingPresentation";
import Button from "../../styles/Button";
import ButtonGroup from "../../styles/ButtonGroup";
import ButtonText from "../../styles/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import styled from "styled-components";
import { useBooking } from "./hooks/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const {booking, isLoading} = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner/>;
  const status = booking.status;
  const id = booking.id;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingPresentation booking={booking} />

      <ButtonGroup>
        { status === 'unconfirmed' &&
          <Button variation="success" onClick={()=> navigate(`/checkin/${booking.id}`)}>
            Check In
          </Button>
        }
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
