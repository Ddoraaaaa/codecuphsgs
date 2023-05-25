"use client"; 

import { setUserInfo } from "@/session_storage_api/api";
import {login} from "../../../backend_api/users"
import assert from "assert";
import {useState} from "react"
import { useRouter } from "next/navigation";

export default function LoginPage() { 
    let [username, setUsername] = useState(null); 
    let [password, setPassword] = useState(null); 
    let [email, setEmail] = useState(null); 
    const router = useRouter(); 

    async function updateUsername(event) { 
        await setUsername(event.target.value); 
        console.log(username); 
    }
    async function updatePassword(event) { 
        await setPassword(event.target.value); 
        console.log(password); 
    }

    async function updateEmail(event) { 
        await setEmail(event.target.value); 
        console.log(email); 
    }

    async function handleSubmitButtonClicked(event) { 
        event.preventDefault();
        try { 
            let loginResult = await login({
                username: username, 
                email: email, 
                password: password
            }); 
            if(loginResult.success) { 
                assert(loginResult.userInfo != undefined); 
                setUserInfo(loginResult.userInfo); 
                try { 
                    router.push("/dashboard"); 
                } catch(error) { 
                    console.log(error); 
                }
            }
            else { 
                console.log(loginResult.msg); 
            }
        }
        catch (error) { 
            console.log(error); 
        }
    }

    return (
        <div className="bg-white w-full h-full flex content-center justify-center items-center">
            <div className="flex-col justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Login</h2>
                </div>
                <form id="signup-form" className="text-center mt-2.5">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2.5">
                                <input type="text" name="username" id="username" autoComplete="username" onChange={updateUsername}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </input>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input type="email" name="email" id="email" autoComplete="email" onChange={updateEmail}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </input>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2.5">
                                <input type="password" name="password" id="password" autoComplete="password" onChange={updatePassword}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </input>
                            </div>
                        </div>
                        <div className="mt-2.5">
                        <button type="submit" onClick={handleSubmitButtonClicked} 
                        // do not know why but clicking button still rerender the page even when onSubmit is blocked
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Login
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}