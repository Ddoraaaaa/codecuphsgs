export default function BodyContainer({children}: {children:React.ReactNode}) { 
    return <div className="w-11/12 h-full m-auto border-zinc-100 border-2 rounded-lg">{children}</div>; 
}