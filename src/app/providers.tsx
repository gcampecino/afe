// app/providers.tsx
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={"top-center".includes("top") ? 10 : 0} />
      {children}
    </HeroUIProvider>
  )
}