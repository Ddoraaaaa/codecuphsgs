import { ReactNode } from "react"

export default function Section({
    children
}: { 
    children: ReactNode
})  { 
    return <div className="w-full pt-12 text-sm">
        {children}
    </div>
}