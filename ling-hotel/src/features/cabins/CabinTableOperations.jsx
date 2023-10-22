import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
import TableOperations from "../../styles/TableOperations"

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter filterField="discount" 
          options={[
            {value:"all", label:"All"},  
            {value:"no-discount", label:"No Discount"},  
            {value:"discount", label:"Discount"},  
      ]}/>
      <SortBy options={[
        {value: "name-asc", label: "Sort By Name (A-Z)"},
        {value: "name-des", label: "Sort By Name (Z-A)"},
        {value: "regularPrice-asc", label: "Sort By Price (low first)"},
        {value: "regularPrice-des", label: "Sort By Price (high first)"},
        {value: "maxCapacity-asc", label: "Sort By Capacity (low first)"},
        {value: "maxCapacity-des", label: "Sort By Capacity (high first)"}
      ]}/>
    </TableOperations>
  )
}

export default CabinTableOperations
