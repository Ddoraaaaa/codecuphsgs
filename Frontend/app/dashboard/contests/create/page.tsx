"use client"; 
import ContestInfoForm from '../../components/contestForm';
import { createContest } from '@/backend_api/contests';
import { useRouter } from 'next/navigation';

export default function ContestCreatePage() { 
    const router = useRouter();

    async function onSubmit(contestInfo: Object) { 
        console.log(contestInfo)
        const {success, msg} = await createContest(contestInfo); 
        if(!success) { 
            alert(msg); 
        }
        else { 
            try {
                router.push("/dashboard/contests/upcoming"); 
            } catch(e) { 
                alert(e); 
            }
        }
    }

    return <ContestInfoForm contestInfo = {null} callback={onSubmit}></ContestInfoForm>
}