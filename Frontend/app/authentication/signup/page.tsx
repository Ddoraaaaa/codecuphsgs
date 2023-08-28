"use client"; 

import {signup} from "../../../backend_api/users"
import { setUserInfo } from "@/session_storage_api/api";
import assert from "assert";
import {FormEvent, useState} from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import alertBackendAPIError from "@/app/utils/alertSystem/alertBackendAPIError";


export default function SignupPage() { 
    const [username, setUsername] = useState<null | string>(null); 
    const [password, setPassword] = useState<null | string>(null); 
    const [email, setEmail] = useState<null | string>(null); 
    const router = useRouter(); 

    async function updateUsername(event: FormEvent) { 
        const target = event.target as HTMLInputElement; 
        await setUsername(target.value); 
    }
    async function updatePassword(event: FormEvent) { 
        const target = event.target as HTMLInputElement; 
        await setPassword(target.value); 
    }

    async function updateEmail(event: FormEvent) { 
        const target = event.target as HTMLInputElement; 
        await setEmail(target.value); 
    }

    async function handleSubmitButtonClicked(event: FormEvent) { 
        event.preventDefault();

        try { 
            const userInfo = await signup({
                username: username, 
                email: email, 
                password: password
            }); 
           
            setUserInfo(userInfo); 
            
            router.push("/dashboard"); 
        }
        catch (error) { 
            alertBackendAPIError(error, "signupSubmitHandler"); 
        }
    }

    return (
        <div className="bg-white w-full flex-col justify-center items-center">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Signup</h2>
            </div>
            <form id="signup-form" className="mt-4">
                <div className="grid grid-cols-1 gap-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-1">
                            <input type="text" name="username" id="username" autoComplete="username" onChange={updateUsername}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-1">
                            <input type="email" name="email" id="email" autoComplete="email" onChange={updateEmail}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-1">
                            <input type="password" name="password" id="password" autoComplete="password" onChange={updatePassword}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>
                    <div className="mt-1">
                        <button type="submit" onClick={handleSubmitButtonClicked} 
                            className="block w-full rounded-md bg-gray-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                            Signup
                        </button>
                        <div className="w-full text-sm"> 
                            Already have an account?&#160;
                            <Link href="/authentication/login" className="underline">Login here</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}