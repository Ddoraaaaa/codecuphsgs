export default function AuthenticationLayout({
    children
  }: {
    children: React.ReactNode
  }) {  
    return (
      <div className="h-full w-full">
        {children}
      </div>
    )
  }