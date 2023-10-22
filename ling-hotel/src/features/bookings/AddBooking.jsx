import Button from "../../styles/Button"
import CreateBookingForm from "./CreateBookingForm"
import Modal from "../../ui/Modal"

const AddBooking = () => {
  return (
    <div>
      <Modal>
          <Modal.Open opens="booking-form">
              <Button>Add New Booking</Button>
          </Modal.Open>
          <Modal.Window name="booking-form">
              <CreateBookingForm/>
          </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddBooking
