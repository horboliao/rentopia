'use client';

import { signIn} from "next-auth/react";
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
import {useLoginModal} from "@/app/hooks/useLoginModal";

import {Modal} from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import {Button} from "@/app/components/Button";
import {useRouter} from "next/navigation";




export const LoginModal = () => {
    const router = useRouter(); // Accessing the router object for navigation
    const registerModal = useRegisterModal(); // Using the useRegisterModal hook
    const loginModal =  useLoginModal(); // Using the useLoginModal hook
    const [isLoading, setIsLoading] = useState(false); // Managing the loading state

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    }); // Initializing the form using the useForm hook from "react-hook-form"

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true); // Set loading state to true

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false); // Set loading state to false

                if (callback?.ok) {
                    toast.success('Logged in'); // Show success toast message
                    router.refresh(); // Refresh the page
                    loginModal.onClose(); // Close the login modal
                }

                if (callback?.error) {
                    toast.error(callback.error); // Show error toast message
                }
            });
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]) // Toggle between login and register modals


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
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

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="
      text-neutral-500 text-center mt-4 font-light">
                <p>First time using Rentopia?
                    <span
                        onClick={onToggle}
                        className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
                    > Create an account</span>
                </p>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )

}
