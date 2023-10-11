import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

const CreateCabinForm = () => {
    const {register, formState, getValues, handleSubmit, reset} = useForm();
    const errors = formState.errors;
    console.log(errors);
    const queryClient = useQueryClient();

    const {mutate, isLoading} = useMutation({
        mutationFn: addCabin,
        onSuccess: () => {
            toast.success("New cabin created!");
            queryClient.invalidateQueries({queryKey: ['cabins']});
            reset();
        },
        onError: (err) => {toast.error(err.message)}
    });

    const onFormSubmit = (data) => {
        mutate(data);
    }

    const onError = (err) => {

    }
    
    return (
        <Form onSubmit={handleSubmit(onFormSubmit, onError)}>
            <FormRow label="Cabin Name" errors={errors?.name?.message}>
                <Input 
                    type="text"
                    id="name"
                    disabled={isLoading} 
                    {...register("name", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" errors={errors?.maxCapacity?.message}>
                <Input 
                    type="number" 
                    id="maxCapacity"
                    disabled={isLoading} 
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
                    disabled={isLoading} 
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
                    disabled={isLoading} 
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
                    disabled={isLoading} 
                    defaultValue="" 
                    {...register("description", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Cabin Photo" errors={errors?.image?.message}>
                <FileInput id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLoading}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
