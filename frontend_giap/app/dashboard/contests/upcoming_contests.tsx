import { contestInfoI } from "@/backend_api/contests"
import ContestList from "./contest_list"
export default function UpcomingContests({
    contestsInfo, 
    currentDate
}: { 
    contestsInfo: contestInfoI[], 
    currentDate: Date
}): JSX.Element { 

    return (
        <ContestList 
            listTitle="Upcoming contests" 
            contestsInfo={contestsInfo} 
            startDateRange={[currentDate, null]}
            endDateRange={[null, null]} 
        >
        </ContestList>
    )
}