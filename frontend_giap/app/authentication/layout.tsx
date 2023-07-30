import FormContainer from "./utils/formContainer"

export default function AuthenticationLayout({
    children
  }: {
    children: React.ReactNode
  }) {  
    return (
      <div className="h-full w-full bg-white flex justify-center items-center">
        <FormContainer>{children}</FormContainer>
      </div>
    )
  }