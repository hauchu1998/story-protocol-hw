"use client";
import { generateImage } from "@/api/generateImage";
import Image from "next/image";
import { useState, Dispatch, SetStateAction } from "react";
import Loading from "./loading";
import Link from "next/link";

const ImageGeneration = ({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [style, setStyle] = useState<string>("");

  const options = ["none", "animated", "portrait", "cyberpunk"];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPrompt(e.target.value);
    setError("");
  };

  const handleStyleChange = (option: string) => {
    if (option === "none") {
      setStyle("");
      return;
    }
    setStyle(option);
  };

  const handleGenerateImage = async () => {
    setIsLoading(true);
    setError("");
    try {
      const description = style === "none" ? "" : " in the style of " + style;
      const url = await generateImage(prompt + description);
      if (url) setImageUrl(url);
      setIsLoading(false);
    } catch (error) {
      console.error("generate image error: ", error);
      setError("Failed to generate image");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full flex flex-col items-center">
      <div className="w-full text-center">Enter your prompt</div>
      <div className="mt-3">
        {options.map((option) => {
          return (
            <button
              key={option}
              className={`${
                style === option || (!style && option === "none")
                  ? "bg-indigo-500 text-white"
                  : "text-indigo-500"
              } px-2 text-sm rounded-full`}
              onClick={() => handleStyleChange(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
      <textarea
        className="mt-3 rounded-lg px-3 py-1 w-full bg-indigo-200 border-2 border-indigo-500 text-sm"
        rows={6}
        onChange={handleInputChange}
        placeholder="Enter your prompt here..."
        value={prompt}
      />
      <button
        className="mt-3 bg-indigo-500 px-3 py-1 rounded-full text-white hover:text-black"
        onClick={handleGenerateImage}
      >
        Generate Image
      </button>

      {isLoading ? (
        <Loading className="mt-3" />
      ) : imageUrl ? (
        <div className="mt-3 flex flex-col items-center">
          <Image
            src={imageUrl}
            alt="generated image"
            width={500}
            height={500}
          />
          <Link
            className="mt-3 text-indigo-300 hover:text-indigo-700 text-xs text-center underline"
            href={imageUrl}
          >
            Image Link
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      {error && <div className="mt-3 text-red-500">{error}</div>}
    </div>
  );
};

export default ImageGeneration;
