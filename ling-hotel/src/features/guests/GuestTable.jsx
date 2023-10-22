import Empty from "../../ui/Empty";
import GuestRow from "./GuestRow";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useGuests } from "./hooks/useGuests";

const GuestTable = () => {
  const {isLoading, guests, count} = useGuests();

  if (isLoading) return <Spinner />;
  if (guests.length === 0) return <Empty resourceName="guests"/>


  return (
    <Menus>
      <Table columns="2fr 1.8fr 2.2fr 0.3fr 3.2rem">
        <Table.Header>
          <div>Full Name</div>
          <div>E-mail</div>
          <div>Nationality</div>
          <div>Flag</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => (
            <GuestRow key={guest.id} guest={guest} />
          )}
        />

        <Table.Footer>
          <Pagination count={count}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable
