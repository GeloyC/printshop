import { Link, useNavigate } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-no-tail.svg?react' 

type ReturnButtonProp = {
    path?: string
    color?: string
}

function ReturnButton ({
    path,
    color = "#292929"
}: ReturnButtonProp) {
    const navigate = useNavigate();
    
    return (
        <>
            {path ? (
                <Link to={path}
                    className="cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent rounded-full"
                >
                    <Arrow className="size-6" color={color} />
                </Link>
            ):(
                <button onClick={()=>navigate(-1)}
                    className="cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent rounded-full">
                    <Arrow className="size-6" color={color} />
                </button>
            )}
        </>
    )
}

export default ReturnButton;