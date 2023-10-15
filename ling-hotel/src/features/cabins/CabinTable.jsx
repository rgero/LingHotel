import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useCabins } from "./hooks/useCabins";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    const filterValue = searchParams.get("discount") || 'all';

    let filteredCabins;
    switch(filterValue)
    {
      case "all":
        filteredCabins = cabins;
        break;
      case "no-discount":
        filteredCabins = cabins.filter((cabin)=> cabin.discount === 0);
        break;
      case "discount":
        filteredCabins = cabins.filter((cabin)=> cabin.discount !== 0);
        break;
      default:
        filteredCabins = cabins;
    }
    
    // Sort the filtered cabins
    const sortBy = searchParams.get('sortBy') || 'startDate-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedCabins = field === "name"
      ? filteredCabins?.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);
  
    return (
      <Menus>
        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body 
            data={sortedCabins} 
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} 
          />
        </Table>
      </Menus>
    );
}

export default CabinTable
