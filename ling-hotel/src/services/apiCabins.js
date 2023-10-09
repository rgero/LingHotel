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

export const deleteCabin = async (id) => 
{
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error)
    {
        console.error(error);
        throw new Error("Cabins cannot be deleted");
    }
}