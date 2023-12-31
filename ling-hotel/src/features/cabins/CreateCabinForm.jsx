/* eslint-disable react/prop-types */

import Button from "../../styles/Button";
import FileInput from "../../styles/FileInput";
import Form from "../../ui/forms/Form";
import FormRow from "../../ui/forms/FormRow";
import Input from "../../styles/Input";
import TextArea from "../../ui/forms/TextArea";
import { useAddCabin } from "./hooks/useAddCabin";
import { useEditCabin } from "./hooks/useEditCabin";
import {useForm} from "react-hook-form";

const CreateCabinForm = ({cabinToEdit = {}, onCloseModal}) => {

    const { id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {register, formState, getValues, handleSubmit, reset} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const errors = formState.errors;

    const {isCreating, addCabin} = useAddCabin();
    const {isEditing, editCabin} = useEditCabin();

    const onFormSubmit = (data) => {
        const image = typeof data.image === "string" ? data.image : data.image[0]
        if (isEditSession)
        {
            editCabin({newCabinData: {...data, image: image}, id: editId},
                      {onSuccess: () => {
                        reset();
                        onCloseModal?.();
                      }});
        } else 
        {
            addCabin({...data, image: image}, 
                    {onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }});
        }
    }

    const onError = (err) => {
        console.log(err);
    }
    
    return (
        <Form onSubmit={handleSubmit(onFormSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
            <h1>{isEditSession ? "Edit a Cabin" : "Create a Cabin"}</h1>
            <FormRow label="Cabin Name" errors={errors?.name?.message}>
                <Input 
                    type="text"
                    id="name"
                    disabled={isCreating || isEditing} 
                    {...register("name", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" errors={errors?.maxCapacity?.message}>
                <Input 
                    type="number" 
                    id="maxCapacity"
                    disabled={isCreating || isEditing} 
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Minimum capacity is 1"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Regular Price" errors={errors?.regularPrice?.message}>
                <Input 
                    type="number" 
                    id="regularPrice"
                    disabled={isCreating || isEditing} 
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Minimum price is 1"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Discount" errors={errors?.discount?.message}>
                <Input 
                    type="number" 
                    id="discount"
                    disabled={isCreating || isEditing} 
                    defaultValue={0} 
                    {...register("discount", {
                        required: "This field is required",
                        validate: (currentValue) => {
                            return currentValue <= getValues().regularPrice || "Discount shouldn't be more than regular price"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Description" errors={errors?.description?.message}>
                <TextArea 
                    type="number" 
                    id="description"
                    disabled={isCreating || isEditing} 
                    defaultValue="" 
                    {...register("description", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Cabin Photo" errors={errors?.image?.message}>
                <FileInput 
                    id="image" 
                    accept="image/*" 
                    type="file"
                    {...register("image", {
                        required: isEditSession ? false : "This field is required"
                    })} 
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button 
                    variation="secondary" 
                    type="reset" 
                    onClick={()=> onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isCreating || isEditing}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
