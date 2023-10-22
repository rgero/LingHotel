import { Flag } from "../../styles/Flag";
import Table from "../../ui/Table"

/* eslint-disable react/prop-types */
const GuestRow = ({guest}) => {

  const {fullName, email, nationality, countryFlag } = guest;

  return (
    <Table.Row>
      <span>{fullName}</span>
      <span>{email}</span>
      <span>{nationality}</span>
      <span><Flag src={countryFlag} alt={`Flag of ${nationality}`} /></span>
    </Table.Row>
  )
}

export default GuestRow
