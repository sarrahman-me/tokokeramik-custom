/* eslint-disable @next/next/no-img-element */
"use client";
import { FaTrash } from "react-icons/fa6";

/**
 * Komponen FileInput digunakan untuk mengunggah file dan, jika diaktifkan, menampilkan pratinjau file gambar.
 *
 * @param {string} label - Label yang ditampilkan di atas elemen input file.
 * @param {string} error - Pesan kesalahan yang ditampilkan jika terjadi kesalahan validasi.
 * @param {function} setFile - Fungsi yang dipanggil saat file dipilih untuk menyimpan file (dalam format base64 as string[]).
 * @param {boolean} previewFile - Jika benar, akan menampilkan pratinjau file gambar.
 */

interface FileInputProps {
  label?: string;
  error?: string;
  setFile: (file: string) => void;
  file: string;
  acceptFormat?: string;
}

const FileInput = ({
  label,
  error,
  setFile,
  file,
  acceptFormat,
}: FileInputProps) => {
  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // const nameFile = file.name;
      // const typeFile = file.type;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        setFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFileType = (base64String: string): string => {
    if (
      base64String.startsWith("data:application/pdf;base64,") ||
      base64String.includes("s3.amazonaws.com/pdf")
    ) {
      return "application/pdf";
    } else if (
      base64String.startsWith("data:video/mp4;base64,") ||
      base64String.startsWith("s3.amazonaws.com/video")
    ) {
      return "video/mp4";
    } else {
      return "image";
    }
  };

  const fileType = getFileType(file);

  const renderPreview = () => {
    if (fileType === "image") {
      return (
        <img
          src={file}
          className="object-contain max-h-28 md:max-h-[155px] border"
          alt={label || ""}
        />
      );
    } else if (fileType === "application/pdf") {
      return (
        <embed src={file} type="application/pdf" width="100%" height="500px" />
      );
    } else if (fileType === "video/mp4") {
      return (
        <video
          src={file}
          controls
          className="object-contain max-h-28 md:max-h-[155px] border"
        />
      );
    } else {
      return null;
    }
  };

  //   "classNameFileInput" adalah style class tailwind untuk file input
  const classNameFileInput = `block w-full text-sm text-slate-500 file:cursor-pointer
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-primary-50 file:text-primary-700
        hover:file:bg-primary-100`;

  return (
    <div className="space-y-3">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm md:text-base font-medium text-primary-700"
        >
          {label}
        </label>
      )}
      <input
        onChange={handleFileChange}
        id="file-input"
        type="file"
        accept={acceptFormat}
        className={classNameFileInput}
      />
      {file && (
        <div className="flex">
          <div className="relative">
            <span className="absolute right-1 top-1">
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => setFile("")}
              />
            </span>
            {renderPreview()}
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
