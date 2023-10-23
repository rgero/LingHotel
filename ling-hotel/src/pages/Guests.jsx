import AddGuest from "../features/guests/AddGuest"
import GuestTable from "../features/guests/GuestTable"
import Heading from "../ui/Heading"
import Row from "../styles/Row"

const Guests = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        {/* <GuestTableOperations /> */}
        <span>GuestTableOperations</span>
      </Row>
      <Row>
        <GuestTable />
        <AddGuest/>
      </Row>
      
    </>
  )
}

export default Guests
