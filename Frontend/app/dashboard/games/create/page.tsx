"use client"; 

import alertBackendAPIError from "@/app/utils/alertSystem/alertBackendAPIError";
import { createGame } from "@/backend_api/games";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateGamePage() {

    const router = useRouter(); 
    
    const [name, setName] = useState(""); 
    const [statementURL, setStatementURL] = useState(""); 
    const [renderUrl, setRenderURL] = useState(""); 

    function onNameUpdate(event: FormEvent) { 
        const target = event.target as HTMLInputElement; 
        setName(target.value);  
    }

    function onStatementURLUpdate(event: FormEvent) { 
        const target = event.target as HTMLInputElement; 
        setStatementURL(target.value); 
    }

    function onRenderURLUpdate(event: FormEvent) { 
        const target = event.target as HTMLInputElement; 
        setRenderURL(target.value); 
    }

    async function onFormSubmit(event:FormEvent) {
        event.preventDefault(); 

        try { 
            await createGame({ 
                name, 
                statementUrl: statementURL, 
                renderUrl: renderUrl
            }); 

            router.push("/dashboard/games/list"); 
        }
        catch(error) { 
             alertBackendAPIError(error, "contestCreateSubmitHandler"); 
        }
    }

    return (
    <form>
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Game Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600"></p>

                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div className="mt-2">
                        <input type="text" onChange={onNameUpdate}  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </input>
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label  className="block text-sm font-medium leading-6 text-gray-900">StatementURL</label>
                    <div className="mt-2">
                        <input type="text" onChange={onStatementURLUpdate}
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label  className="block text-sm font-medium leading-6 text-gray-900">RenderURL</label>
                    <div className="mt-2">
                        <input type="text" onChange={onRenderURLUpdate} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
            <button type="submit" onClick={onFormSubmit} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Publish</button>
        </div>
    </form>
    ); 
}