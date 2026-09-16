
// import { useNavigate } from "react-router-dom"

// components
// import { useFileContext } from "../../../context/documentPrintContext";
import ServiceList from "./ServiceList";

function Home () {

    // const navigate = useNavigate();
    // const { setFiles } = useFileContext();

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     try {

    //         const file = e.target.files;
    //         if (!file) return;

    //         if (file.length >= 0) {
    //             setFiles(Array.from(file).map((file) => ({
    //                 filename: file.name,
    //                 file: file
    //             })));

    //             navigate("/document-print/setup");
    //         }
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[2rem]">
            
            <div className='flex flex-col items-center w-full gap-[2rem] pt-[3rem]'>
                {/* <span className='text-[14px] text-[#ff6b00] font-bold bg-[#ff6b00]/15 px-[1rem] py-[0.5rem]'>DOCUMENT PRINT</span> */}
                <h1 className='text-7xl text-[#272727] text-center font-[900] leading-none'>We print your documents,<br/> you pick them up later</h1>
                <span className='text-[18px] text-[#272727] font-bold'>We will handle the printing, you just chill and wait</span>
            </div>


            <ServiceList />
        </div>
    )
}
export default Home