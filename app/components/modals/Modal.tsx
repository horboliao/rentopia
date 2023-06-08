'use client';

import React, {useCallback, useEffect, useState} from "react";
import {IoMdClose} from "react-icons/io";

import {Button} from "../Button";

interface ModalProps {
    isOpen?: boolean; // Optional prop indicating whether the modal is open or not
    onClose: () => void; // Callback function to handle modal close
    onSubmit: () => void; // Callback function to handle modal submit
    title?: string; // Optional prop for the modal title
    body?: React.ReactElement; // Optional prop for the modal body content
    footer?: React.ReactElement; // Optional prop for the modal footer content
    actionLabel: string; // Required prop for the label of the main action button
    disabled?: boolean; // Optional prop to disable the modal and its actions
    secondaryAction?: () => void; // Optional prop for the secondary action callback function
    secondaryActionLabel?: string; // Optional prop for the label of the secondary action button
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
                                            }) => {
    const[showModal, setShowModal] = useState(isOpen); // State to manage the visibility of the modal

    useEffect(() => {
        setShowModal(isOpen); // Update the visibility state when the isOpen prop changes
    }, [isOpen]);


    const handleClose  = useCallback(() => {
        if(disabled){
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300); // Close the modal with a delay for animation
    }, [onClose, disabled]);


    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }
        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    },[secondaryAction, disabled]);

    if (!isOpen){
        return null; // Render nothing if the modal is not open
    }
    return(
        <>
            <div
                className="
          justify-center
          items-center
          flex
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        "
            >
                <div className="
          relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
          "
                >
                    {/*content*/}
                    <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
                        <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            "
                        >
                            {/*header*/}
                            <div className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
                            >
                                <button
                                    className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                                    onClick={handleClose}
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/*footer*/}
                            <div className="flex flex-col gap-2 p-6">
                                <div
                                    className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
                                >
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                            outline
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );

}