import { useNavigate } from "react-router-dom";

import Arrow from '/src/assets/icon/arrow-no-tail.svg?react' 

function ReturnButton () {
    const navigate = useNavigate();
    return (
        <button onClick={()=>navigate(-1)}
            className="cursor-pointer hover:bg-[#B1B2B5]/50 active:bg-transparent rounded-full">
            <Arrow className="size-6" color="#292929" />
        </button>
    )
}

export default ReturnButton;