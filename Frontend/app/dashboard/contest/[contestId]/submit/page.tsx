"use client"; 

import { FormEvent, useState } from "react"
import { useParams,useRouter} from "next/navigation";
import { submitCode } from "@/backend_api/contests";
export default function SubmitPage() { 
    const [file, setFile] = useState<File | null>(null); 
    const [dragActive, setDragActive] = useState<boolean>(false); 
    const router = useRouter(); 
    const params = useParams(); 

    // function handleDrag(event) {
    //     event.preventDefault(); 
    //     event.stopPropagation(); 
    //     if(event.type == "dragenter" || event.type == "dragover") { 
    //         setDragActive(true); 
    //     } else if (event.type == "dragleave") { 
    //         setDragActive(false); 
    //     }
    // }

    // function handleDrop(event) { 
    //     event.preventDefault(); 
    //     event.stopPropagation(); 
    //     setDragActive(false); 
    //     console.log("dropped!!!"); 
    //     console.log(event.dataTransfer); 
    //     if(event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) { 
    //         setFile(file); 
    //     }
    // }
    function handleFileSelected(event: FormEvent) {
        event.preventDefault(); 

        const target = event.target as HTMLInputElement; 
        if(target && target.files && target.files[0]) { 
            setFile(target.files[0]); 
        }
    }

    function handleCancel(event: FormEvent) { 
        event.preventDefault(); 
        setFile(null); 
    }

    async function handleSubmit(event: FormEvent) { 
         event.preventDefault(); 

         if(file != null) { 
            try { 
                let submitResult = await submitCode({contestId: parseInt(params.contestId), file}); 
                if(submitResult.success) { 
                    router.push(`/dashboard/contests/${params.contestId}/submissions`);    
                }
                else { 
                    alert(submitResult.msg); 
                }
            }
            catch (error){ 
                alert(error); 
            }
         }
         else { 
            alert("No file selected!"); 
         }
    }
    return (
    <form> 
        <div className="space-y-12">
            <div className={"border-b pb-12"}>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Submit code</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Upload your source code here</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Source code</label>
                <div 
                    // onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                    className={`mt-2 flex justify-center rounded-lg border ${dragActive?"border-sky-500": "border-dashed border-gray-900/25"} px-6 py-10`}>
                    <div className="text-center">
                    {/* <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg> */}
                    {/* <div className="flex justify-center"><Image src={bracket} className="w-10 h-5" alt=""></Image></div> */}
                    
                    <div className="mt-4 flex flex-center text-sm leading-6 text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" accept="text/x-c .cpp" className="sr-only" onChange={handleFileSelected}></input>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-500">.cpp files</p>
                    <p className="text-xs leading-5 text-gray-700 mt-5">{file?file.name: "No file selected"}</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
            <button type="button" onClick={handleCancel} 
                className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
            </button>
            <button type="submit" onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Submit
            </button>
        </div>
        </form>
        )
}