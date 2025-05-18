'use client'

import React, { type ComponentPropsWithoutRef, type ReactElement } from 'react';
import {cn} from "@/utils/cn.utils";

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'pink' | 'gray' | 'light' | 'white';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    fullWidth?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    className?: string;
}

export default function Button({
       variant = 'primary',
       size = 'medium',
       color = 'pink',
       fullWidth = false,
       children,
       className,
       ...props
   }: ButtonProps): ReactElement {
    // Base button styles
    const baseStyles = "font-medium rounded-full transition-all duration-200";

    // Color variants
    const colorStyles = {
        pink: {
            primary: "bg-primary text-text hover:bg-primary",
            secondary: "border border-pink-300 text-pink-500 hover:bg-pink-50 focus:ring-pink-500",
            outline: "border border-primary text-primary-light bg-[#FFFAFA] hover:bg-pink-50 focus:ring-pink-500",
            ghost: "text-primary-light hover:bg-pink-50 focus:ring-pink-500",
        },
        gray: {
            primary: "bg-background-Disabled text-text-Tertiary hover:bg-gray-500 focus:ring-gray-500",
            secondary: "border border-gray-300 text-gray-500 hover:bg-gray-50 focus:ring-gray-500",
            outline: "border border-background-Tertiary text-primary-light hover:bg-gray-50 focus:ring-gray-500",
            ghost: "text-text-Disabled",
        },
        light: {
            primary: "bg-background-Disabled2 text-text-Disabled hover:bg-gray-200 focus:ring-gray-300",
            secondary: "border border-gray-200 text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
            outline: "border border-info-light text-text-Disabled hover:bg-gray-50 focus:ring-gray-300",
            ghost: "text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
        },
        white: {
            primary: "bg-white text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
            secondary: "border border-gray-200 text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
            outline: "border border-info-light text-text-Disabled hover:bg-gray-50 focus:ring-gray-300",
            ghost: "text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
        },
    };

    // Size variants
    const sizeStyles = {
        small: "py-1 px-4 text-sm",
        medium: "py-2 px-6 text-base",
        large: "py-3 px-8 text-lg",
    };

    // Full width option
    const widthStyles = fullWidth ? "w-full" : "";

    return (
        <button
            className={cn(
                baseStyles,
                colorStyles[color][variant],
                sizeStyles[size],
                widthStyles,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
