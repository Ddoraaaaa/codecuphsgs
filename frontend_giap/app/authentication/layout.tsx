export default function AuthenticationLayout({
    children
  }: {
    children: React.ReactNode
  }) {  
    return (
      <div className="w-full">
        {children}
      </div>
    )
  }