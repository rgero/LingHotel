import { ENTRIES_PER_PAGE } from "../utils/constants";
import { getCountryFlagFromName } from "../utils/countyCodeGetter";
import supabase from "./supabase";

export const getGuests = async ({filter, sortBy, page}) => {

  let query = supabase
    .from("guests")
    .select("*", {count: "exact"});

  if (filter) 
  {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy)
  {
    query = query.order(sortBy.field, {ascending: sortBy.direction === "asc"})
  }

  if (page){
    const from = ENTRIES_PER_PAGE * (page-1);
    const to = from + ENTRIES_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const {data, error, count} = await query;
  if (error) {
    console.error(error);
    throw new Error("Guests not found");
  }

  return {data, count};
}

export const deleteGuest = async (id) => 
{
    const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', id)

    if (error)
    {
        console.error(error);
        throw new Error("Guest cannot be deleted");
    }
}

export const addGuest = async (newGuest) => {
  console.log(newGuest);
  const countryFlag = getCountryFlagFromName(newGuest.nationality)
  const { error } = await supabase.from('guests').insert([{...newGuest,countryFlag: countryFlag}])

  console.log(error);
}