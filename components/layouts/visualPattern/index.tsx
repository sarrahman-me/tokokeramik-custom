"use client";
import { Select, TipsText } from "@/components/commons";
//import Image from "next/image";
import React, { useState } from "react";

type VisualPatternProps = {
  imageUrl: string;
};

export default function VisualPattern({ imageUrl }: VisualPatternProps) {
  const [natColor, setNatColor] = useState("#ababab");
  const [natGap, setNatGap] = useState("2px");
  const [gridSize, setGridSize] = useState(4);

  const handleNatColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNatColor(e.target.value);
  };

  const gridStyles = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gap: natGap,
    backgroundColor: natColor,
  };

  const renderImagePatterns = () => {
    const imagePatterns = [];
    const totalImages = gridSize * gridSize;
    for (let i = 0; i < totalImages; i++) {
      imagePatterns.push(<ImagePattern key={i} imageUrl={imageUrl} />);
    }
    return imagePatterns;
  };

  return (
    <div className="bg-white border rounded-md p-1 md:p-2 space-y-3">
      <p className="bg-secondary text-primary-900 p-0.5 rounded-md font-medium text-lg">
        Simulasi Pola
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div
          className="w-full grid m-1 relative object-cover"
          style={gridStyles}
        >
          {renderImagePatterns()}
        </div>
        <div className="space-y-5 p-2">
          <TipsText text="Klik untuk memutar gambar" />

          <form className="space-y-5 p-2">
            <span className="flex items-center space-x-3">
              <label
                htmlFor={natColor}
                className="block text-sm font-medium text-primary-700"
              >
                Warna Nat:
              </label>
              <input
                type="color"
                id="natColor"
                name="natColor"
                value={natColor}
                onChange={handleNatColorChange}
              />
            </span>
            <Select
              label="Jarak Nat:"
              setValue={setNatGap}
              value={natGap}
              staticData
              lists={[
                { size: "1 ml", value: "1px" },
                { size: "2 ml", value: "2px" },
                { size: "3 ml", value: "3px" },
                { size: "4 ml", value: "4px" },
              ]}
              keyValue={{
                key: "value",
                value: "size",
              }}
            />
            <Select
              label="Ukuran Grid:"
              setValue={(v) => setGridSize(Number(v))}
              value={gridSize}
              staticData
              lists={[
                { size: "4 x 4", value: 4 },
                { size: "6 x 6", value: 6 },
                { size: "8 x 8", value: 8 },
              ]}
              keyValue={{
                key: "value",
                value: "size",
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

type ImagePatternProps = {
  imageUrl: string;
};

const ImagePattern = ({ imageUrl }: ImagePatternProps) => {
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  // menghilangkan fungsi klik kanan pada gambar
  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  return (
    <img
      onContextMenu={handleKlikKanan}
      src={
        imageUrl ||
        "https://ik.imagekit.io/sarrahmanme/No-Image-Placeholder.svg.png?updatedAt=1701908821050"
      }
      onClick={handleRotate}
      alt="produk"
      className="cursor-pointer"
      width={300}
      height={300}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
};
