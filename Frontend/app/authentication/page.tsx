import { redirect } from 'next/navigation';


export default function AuthenticationPage() { 
    return redirect("/authentication/login"); 
}