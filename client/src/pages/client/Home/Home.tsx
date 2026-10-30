
// components
import ServiceList from "./ServiceList";
import { useServices } from "../../../hooks/services/useServices";

function Home () {

    const { data: services=[] } = useServices();
    console.log('check useServices: ', services);

    return (
        <div className="flex flex-col w-full h-full items-center justify-start gap-[2rem]">
            
            <div className='flex flex-col items-center justify-center w-full gap-[2rem] pt-[3rem] min-h-[400px]'>
                <h1 className='text-8xl text-[#292929] text-center font-[900] leading-none'>We print your files,<br/> you pick them up later</h1>
                <span className='text-2xl text-[#fff] font-[500] opacity-90'>We will handle the printing, you just chill and wait</span>
            </div>

            
            <ServiceList services={services}/>
        </div>
    )
}
export default Home 