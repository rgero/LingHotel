import supabase from "./supabase";

export const getBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)");

  if (error) {
    console.error(error);
    throw new Error("Bookings not found");
  }
  
  return data;
}

export const getBooking = async (id) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}