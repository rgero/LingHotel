import supabase, { supabaseUrl } from "./supabase"

export const getCabins = async () => {
    let {data, error} = await supabase.from("cabins").select("*");

    if (error)
    {
        console.error(error);
        throw new Error("Cabins cannot be loaded");
    }

    return data;
}

export const addCabin = async (newCabin) => {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/","");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    
    const { data, error } = await supabase
        .from('cabins')
        .insert([{...newCabin, image: imagePath}])
        .select()

    if (error)
    {
        console.error(error);
        throw new Error("Cabins cannot be added");
    }

    // Upload the data
    const {error: imageError} = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image )

    // Delete cabin if error exists
    if (imageError)
    {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        throw new Error("Cabin Image could not be uploaded");
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