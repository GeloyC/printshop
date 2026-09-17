import AddIcon from '/src/assets/icon/add.svg?react'

interface Prop {
    handleAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AddFileButton ({ handleAddFiles }: Prop) {

    return (
        <>
            <input type="file" name="service_addmore" id="service_addmore" accept={'.doc, .docx, .pdf'} multiple hidden onChange={handleAddFiles} />

            <label htmlFor="service_addmore"
            className="flex items-center justify-center gap-[0.3rem] cursor-pointer px-[1rem] p-[0.75rem] bg-[#292929] hover:bg-[#292929]/80 active:bg-[#292929]"
            >
                <AddIcon className="size-5" color="#fff" />
                <span className='text-[#fff]'>Add files</span>
            </label>
        </>
    )
}

export default AddFileButton