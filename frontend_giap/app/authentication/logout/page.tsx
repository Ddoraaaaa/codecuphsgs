"use client"; 

import { setUserInfo } from "@/session_storage_api/api";
import {login} from "../../../backend_api/users"
import assert from "assert";
import {useState} from "react"
import { redirect, useRouter } from "next/navigation";
import { logout } from "@/backend_api/users";

export default function LogoutPage() { 
    try { 
        logout(); 
        setUserInfo(null);
        redirect("/authentication/login"); 
    }
    catch (error) { 
        alert(error);
    }
}