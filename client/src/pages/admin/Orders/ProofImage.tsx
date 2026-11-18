import { cloudflare_url } from "../../../utils/cloudflarePublicURL";

import CloseIcon from '/src/assets/icon/close.svg?react';

type ProofImageType = {
    proof_image_url: string,
    close: () => void;
}

function ProofImage ({
    proof_image_url,
    close
}: ProofImageType) {

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <button onClick={close} className="absolute top-3 right-3 bg-[#fff] rounded-full p-[0.2rem] cursor-pointer hover:bg-[#ff0000] active:bg-[#b90000] transition-all duration-100">
                <CloseIcon className="size-8" />
            </button>
            <img src={`${cloudflare_url}${proof_image_url}`} alt="proof_image" className="object-contain w-full h-full" />
        </div>
    )
}

export default ProofImage;