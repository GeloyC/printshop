import ViewDocx from "./ViewDocx";
import ViewPDF from "./ViewPDF"

export type ThumbnailType = {
    file: File
}


function DocumentThumbnail ({ file }:ThumbnailType) {

    const filetype = 'application/pdf';

    return (
        <div className="flex justify-center items-center h-full w-full scale-120">
            {file.type !== filetype ? (
                <ViewDocx file={file} />
            ):(
                <ViewPDF file={file} />
            )}
        </div>
    )
}

export default DocumentThumbnail;