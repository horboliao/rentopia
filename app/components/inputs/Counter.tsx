'use client';

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string; // Title text for the counter
    subtitle: string; // Subtitle text for the counter
    value: number; // Current value of the counter
    onChange: (value: number) => void; // Function to handle value change
}

const Counter: React.FC<CounterProps> = ({
                                             title,
                                             subtitle,
                                             value,
                                             onChange,
                                         }) => {
    const onAdd = useCallback(() => {
        onChange(value + 1); // Increase the value by 1 and call the onChange function
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;// If the value is already 1, do nothing
        }

        onChange(value - 1);  // Decrease the value by 1 and call the onChange function
    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
                >
                    <AiOutlineMinus />
                </div>
                <div
                    className="
            font-light
            text-xl
            text-neutral-600
          "
                >
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
}

export default Counter;