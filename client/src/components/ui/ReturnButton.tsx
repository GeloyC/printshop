import { Link, useNavigate } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-no-tail.svg?react' 

type ReturnButtonProp = {
    path?: string
}

function ReturnButton ({
    path
}: ReturnButtonProp) {
    const navigate = useNavigate();
    
    return (
        <>
            {path ? (
                <Link to={path}
                    className="cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent rounded-full"
                >
                    <Arrow className="size-6" color="#292929" />
                </Link>
            ):(
                <button onClick={()=>navigate(-1)}
                    className="cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent rounded-full">
                    <Arrow className="size-6" color="#292929" />
                </button>
            )}
        </>
    )
}

export default ReturnButton;