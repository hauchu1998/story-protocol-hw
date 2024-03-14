"use client";
import { useState } from "react";
import { Switch } from "@mui/material";
import Navbar from "@/components/navbar";
import ImageGeneration from "@/components/imageGeneration";

export default function Mint() {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg"
  );
  const [withIp, setWithIp] = useState<boolean>(false);
  return (
    <main className="flex min-h-screen flex-col items-center px-24 bg-indigo-200">
      <Navbar />
      <div className="w-[40%] flex flex-col items-center">
        <ImageGeneration imageUrl={imageUrl} setImageUrl={setImageUrl} />
        {imageUrl && (
          <div className="mt-5 flex flex-col items-center">
            <div className="flex gap-3 items-center">
              <div className="text-xs">with Story Protocol</div>
              <Switch
                aria-label="mint with IP"
                onClick={() => setWithIp((prev) => !prev)}
              />
            </div>
            <button className="mt-3 bg-orange-500 rounded-lg px-3 py-1 text-lg">
              Mint
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
