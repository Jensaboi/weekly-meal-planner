import { useState } from "react";

export default function useToggle() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, setIsOpen, toggle, close, open };
}
