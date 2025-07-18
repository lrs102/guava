import { useRef } from "react";

type Props = {
    onImagesSelected: (files: FileList) => void;
    acceptMultiple?: boolean;
};

export default function ImageUploader({ onImagesSelected, acceptMultiple = true }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="my-4">
            <button
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Upload Image{acceptMultiple ? "s" : ""}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple={acceptMultiple}
                className="hidden"
                onChange={(e) => e.target.files && onImagesSelected(e.target.files)}
            />
        </div>
    );
}