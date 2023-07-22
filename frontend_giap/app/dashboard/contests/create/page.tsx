"use client"; 

import { useState } from 'react';
import { start } from 'repl';
import ContestInfoForm from '../../utils/contestForm';
import { create } from 'domain';
import { createContest } from '@/backend_api/contests';

export default function ContestCreatePage() { 

    function onSubmit(contestInfo: Object) { 
        console.log(contestInfo)
        createContest(contestInfo).then(({success, msg}: {success: Boolean, msg: string}) => { 
            alert(msg); 
        })
    }

    return <ContestInfoForm contestInfo = {null} callback={onSubmit}></ContestInfoForm>
}