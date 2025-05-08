import { Button } from "@heroui/react";

const CustomButton = ({
    type,
    displayText,
    bgColor,
    color,
    ...props
}) => {

    const custBgColor = bgColor ? bgColor : "bg-custom-burgundy"
    return (
        <>
            <Button
                className={"w-full " + custBgColor}
                type={type}
                {...props}
            >
                {displayText}
            </Button>
        </>
    )
}
export { CustomButton }