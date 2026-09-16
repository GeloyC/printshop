
/*
* ServiceClient component is reusable across different services
* ServiceClient component must require a urlParams 'slug' to identify which service to display
* TODO: create helper functions that will be called according to service selected.
*/

import DisplayFiles from "./DisplayFiles"
import { useFileContext } from "../../../context/documentContext"

function ServiceClient () {

    const { files, setFiles } = useFileContext();

    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[1rem] py-[2rem] ">
            <span className="text-[36px] text-[#292929] font-bold leading-none">Document Print</span>
            <p>Display the description of the service at this section</p>

            <DisplayFiles 
                files={files}
                setFiles={setFiles}
            />


        </div>
    )
}

export default ServiceClient