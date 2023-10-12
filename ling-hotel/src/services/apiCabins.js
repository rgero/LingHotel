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

export const addOrEditCabin = async (newCabin, id) => {
    let imagePath, imageName;
    let needToUpload = false;
    if (newCabin.image)
    {
        if (typeof newCabin.image === 'string')
        {
            imagePath = newCabin.image;
        } else {
            needToUpload = true;
            imageName = `${Math.random()}-${newCabin.image.name}`.replace("/","");
            imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
        }
    }

    let query = supabase.from('cabins');
    if (!id)
    {
        query = query.insert([{...newCabin, image: imagePath}])
    } else {
        query = query.update({...newCabin, image: imagePath}).eq('id', id).select()
    }

    const { data, error } = await query.select().single();

    if (error)
    {
        console.error(error);
        throw new Error("Cabins cannot be added");
    }

    // Upload the data
    if (needToUpload)
    {
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