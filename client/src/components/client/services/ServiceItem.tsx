import { Link } from "react-router-dom";


/*
* Service Item requirements
* 1. title
* 2. Thumbnail
* 3. service name slug ex. 'Document Print' turns to document_print 
*/

function ServiceItem () {

    return (
        <Link to={'/service/slug'} className={`group relative grid grid-rows-[auto_auto] w-full h-[250px] rounded-[8px] bg-[#ffc36d]/0 hover:bg-[#ffdca5] p-[0.5rem] transition-all duration-100`}>
            <div className="flex w-full h-[200px] bg-[#f2f2f2] rounded-[5px] overflow-hidden z-10">
                <img src="/public/samples-deletelater/985797580.png" alt="" className="w-full h-full"/>
            </div>

            <div className="flex flex-col justify-center w-full h-full py-[0.5rem] z-10">
                <span className="text-[18px] text-[#292929] text-wrap font-bold transition-all duration-100">Document Print</span>
            </div>
        </Link>
    )
}


export default ServiceItem