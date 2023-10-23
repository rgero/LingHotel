import Button from "../../styles/Button"
import CreateGuestForm from "./CreateGuestForm"
import Modal from "../../ui/Modal"

const AddGuest = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
            <Button>Add New Guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
            <CreateGuestForm/>
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddGuest
