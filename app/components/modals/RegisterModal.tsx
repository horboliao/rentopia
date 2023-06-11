'use client';

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import {useRegisterModal} from "@/app/hooks/useRegisterModal";

import {Modal} from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import {Button} from "@/app/components/Button";
import {signIn} from "next-auth/react";
import {useLoginModal} from "@/app/hooks/useLoginModal";


// Define the RegisterModal component
export const RegisterModal = () => {
    // Use the useRegisterModal and useLoginModal hooks to access the state and functions related to the registration and login modals
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    // Initialize isLoading state variable to control the loading state of the form
    const [isLoading, setIsLoading] = useState(false);


    // Use the useForm hook to initialize the form with default values and retrieve form-related functions and state variables
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    // Define the form submission handler
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Set isLoading to true to indicate that the form is being submitted
        setIsLoading(true);

        // Send a POST request to the /api/register endpoint with the form data
        axios.post('/api/register', data)
            .then(() => {
                // Display a success message if registration is successful
                toast.success('Registered!');

                // Close the register modal and open the login modal
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                // Display an error message if there's an error
                toast.error(error);
            })
            .finally(() => {
                // Set isLoading back to false after the request is completed
                setIsLoading(false);
            })
    }

    // Define the callback function to toggle between the register and login modals
    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    // JSX content for the modal body
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Rentopia"
                subtitle="Create an account!"
                center
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
// JSX content for the modal footer
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <div
                className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
            >
                <p>Already have an account?
                    <span
                        onClick={onToggle}
                        className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
                    > Log in</span>
                </p>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )

}
