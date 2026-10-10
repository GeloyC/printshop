
// import { useNavigate } from "react-router-dom"

// components
// import { useFileContext } from "../../../context/documentPrintContext";
import { useQuery } from "@tanstack/react-query";
import ServiceList from "./ServiceList";
import { getAllService } from "../../../api/service";

function Home () {

    const { data: services=[] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            await getAllService();
        }
    });

    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[2rem]">
            
            <div className='flex flex-col items-center w-full gap-[2rem] pt-[3rem]'>
                <h1 className='text-7xl text-[#272727] text-center font-[900] leading-none'>We print your files,<br/> you pick them up later</h1>
                <span className='text-[18px] text-[#272727] font-bold'>We will handle the printing, you just chill and wait</span>
            </div>

            
            <ServiceList services={services}/>
        </div>
    )
}
export default Home