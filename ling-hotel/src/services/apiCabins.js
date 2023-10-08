import supabase from "./supabase"

export const getCabins = async () => {
    let {data, error} = await supabase.from("cabins").select("*");

    if (error)
    {
        console.error(error);
        throw new Error("Cabins cannot be loaded");
    }

    return data;
}