import AddIcon from '/src/assets/icon/add.svg?react'

interface Prop {
    handleAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AddFileButton ({ handleAddFiles }: Prop) {

    return (
        <>
            <input type="file" name="service_addmore" id="service_addmore" accept={'.doc, .docx, .pdf'} multiple hidden onChange={handleAddFiles} />

            <label htmlFor="service_addmore"
            className="py-[0.3rem] px-[0.5rem] cursor-pointer hover:bg-[#ffdca5] active:bg-transparent rounded-[5px] transition-all duration-100"
            >
                <span className='text-[14px] text-[#292929] font-bold leading-none'>Add files</span>
            </label>
        </>
    )
}

export default AddFileButton