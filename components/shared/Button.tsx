import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react"

interface ButtonProps {
    children?: ReactNode
    className?: String
    onClick?: () => void
    disabled?: boolean
    buttonProps?: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
}

const Button: FC<ButtonProps> = ({
    children,
    className,
    disabled,
    buttonProps,
    onClick,
}) => {
    return (
        <button
            {...buttonProps}
            className={
                "active:translate-y-0 text-white font-bold py-2 px-4 rounded focus:outline-none hover:-translate-y-1 transition-transform shadow-md hover:shadow-lg active:shadow-md  " +
                (className ?? "")
            }
            disabled={disabled ?? false}
            onClick={onClick}
        >
            <div className={`flex gap-2 items-center justify-center `}>
                {children}
            </div>
        </button>
    )
}

export default Button
