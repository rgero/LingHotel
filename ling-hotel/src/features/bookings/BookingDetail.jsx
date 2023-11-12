import BookingPresentation from "./BookingPresentation";
import Button from "../../styles/Button";
import ButtonGroup from "../../styles/ButtonGroup";
import ButtonText from "../../styles/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../styles/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import styled from "styled-components";
import { useBooking } from "./hooks/useBooking";
import { useCheckout } from "../operations/hooks/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const {booking, isLoading} = useBooking();
  const {checkOut, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner/>;
  if (!booking) return <Empty resource="booking"/>

  const status = booking.status;
  const id = booking.id;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleDelete = () => {
    deleteBooking(id);
    moveBack();
  }

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

      <Modal>
        <ButtonGroup>
          { status === 'unconfirmed' &&
            <Button variation="success" onClick={()=> navigate(`/checkin/${booking.id}`)}>
              Check In
            </Button>
          }
          { status === 'checked-in' &&
            <Button variation="success" disabled={isCheckingOut} onClick={()=> checkOut(id)}>
              Check out
            </Button>
          }

          <Modal.Open opens="delete">
            <Button variation="danger">
              Delete
            </Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="bookings"
            disabled={isDeleting}
            onConfirm={handleDelete}
          />
        </Modal.Window>
        
      </Modal>
    </>
  );
}

export default BookingDetail;
