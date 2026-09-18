import { useEffect, useState } from "react";
import { renderAsync } from "docx-preview";
import html2canvas from "html2canvas";

import type { ThumbnailType } from "./DocumentThumbnail";

function ViewDocx ({ file }:ThumbnailType) {
    
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        let cancelled = false;

        const renderThumbnail = async () => {

            setLoading(true);
            setError(false);
            setThumbnail(null);

            const container = document.createElement("div");

            container.style.position = "fixed";
            container.style.left = "-10000px";
            container.style.top = "0";
            container.style.width = "794px";
            container.style.background = "white";

            document.body.appendChild(container);

            try {

                const buffer = await file.arrayBuffer();

                await renderAsync(
                    buffer,
                    container,
                    undefined,
                    {
                        inWrapper: false,
                        breakPages: true,
                    }
                );

                if (cancelled) return;

                const page = container.querySelector(
                    ".docx"
                ) as HTMLElement | null;

                if (!page) {
                    throw new Error("No DOCX page found");
                }

                const canvas = await html2canvas(page, {
                    backgroundColor: "#ffffff",
                    scale: 1,
                    useCORS: true,
                });

                if (cancelled) return;

                setThumbnail(canvas.toDataURL("image/png"));

            } catch (error) {

                console.error("DOCX thumbnail failed:", error);

                if (!cancelled) {
                    setError(true);
                }

            } finally {

                container.remove();

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        renderThumbnail();

        return () => {
            cancelled = true;
        };

    }, [file]);

    if (loading) {
        return (
            <div className="flex h-full w-[200px] shrink-0 items-center justify-center text-[12px] text-[#292929]/75 font-bold bg-[#ffc36d]/50">
                Generating...
            </div>
        );
    }

    if (error || !thumbnail || thumbnail === 'data:,') {
        return (
            <div className="flex h-full w-[200px] shrink-0 items-center justify-center text-[12px] bg-[#ffc36d]/50">
                Preview unavailable
            </div>
        );
    }

    return (
        <div className="w-[200px] h-full bg-white">
            <img
                src={thumbnail}
                alt="DOCX document thumbnail"
                className="h-full w-full object-cover"
            />
        </div>
    );
}

export default ViewDocx