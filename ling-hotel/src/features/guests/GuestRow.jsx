import ConfirmDelete from "../../ui/ConfirmDelete";
import { Flag } from "../../styles/Flag";
import { HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table"
import { useDeleteGuest } from "./hooks/useDeleteGuest";

/* eslint-disable react/prop-types */
const GuestRow = ({guest}) => {
  const {isDeleting, deleteGuest} = useDeleteGuest();
  const {id: guestID, fullName, email, nationality, nationalID, countryFlag } = guest;
  return (
    <Table.Row>
      <span>{fullName}</span>
      <span>{email}</span>
      <span>{nationality}</span>
      <span><Flag src={countryFlag} alt={`Flag of ${nationality}`} /></span>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={nationalID} />

            <Menus.List id={nationalID}>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guests"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestID)}
              />
            </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default GuestRow
