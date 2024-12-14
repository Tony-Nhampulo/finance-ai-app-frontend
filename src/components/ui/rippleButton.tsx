import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

const RippleButton: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  onClick, // Add onClick to destructured props
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    // Create and style the ripple effect
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - diameter / 2;
    const y = e.clientY - rect.top - diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";

    // Remove previous ripple
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    // Remove the ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Trigger the parent-provided onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      {...props}
      ref={buttonRef}
      className={`ripple-container ${className}`}
      variant={variant} // Pass variant to ShadCN button
      size={size} // Pass size to ShadCN button
      onClick={handleClick} // Attach custom click handler
    >
      {children}
    </Button>
  );
};

export default RippleButton;
