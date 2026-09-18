import ViewDocx from "./ViewDocx";
import ViewPDF from "./ViewPDF"

export type ThumbnailType = {
    file: File
}


function DocumentThumbnail ({ file }:ThumbnailType) {

    const isPDF = file.type === "application/pdf";

    return (
        <div className="flex justify-center items-center h-[200px] w-full scale-100">
            {isPDF ? (
                <ViewPDF file={file} />
            ):(
                <ViewDocx file={file} />
            )}
        </div>
    )
}

export default DocumentThumbnail;