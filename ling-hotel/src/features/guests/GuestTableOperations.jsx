import SortBy from "../../ui/SortBy"
import TableOperations from "../../styles/TableOperations"

const GuestTableOperations = () => {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "fullName-desc", label: "Sort by Name (descending)" },
          { value: "fullName-asc", label: "Sort by Name (ascending)" },
        ]}
      />
    </TableOperations>
  )
}

export default GuestTableOperations
