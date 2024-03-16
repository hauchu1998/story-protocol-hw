"use client";
import { useState } from "react";
import { Switch } from "@mui/material";
import Navbar from "@/components/navbar";
import ImageGeneration from "@/components/imageGeneration";
import { useMintWithUri, useMintAndRegisterIP } from "@/hook/useMintNft";
import { useNftBalanceOf } from "@/hook/useUserData";

export default function Mint() {
  const {
    hash: mintWithUriHash,
    mintWithUri,
    isLoading: isMintLoading,
  } = useMintWithUri();
  const {
    hash: mintWithUriAndRegisterIPHash,
    mintWithUriAndRegisterIP,
    isLoading: isMintAndRegisterLoading,
  } = useMintAndRegisterIP();
  const { refetchNftBalanceOf } = useNftBalanceOf();

  const [imageUrl, setImageUrl] = useState<string>(
    "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg"
  );
  const [withIp, setWithIp] = useState<boolean>(false);

  const handleMintNft = async () => {
    console.log("handleMintNft: ", imageUrl, withIp);
    try {
      if (withIp) {
        mintWithUriAndRegisterIP("TestIP", imageUrl);
      } else {
        mintWithUri(imageUrl);
      }
    } catch (e) {
      console.error("mint nft error: ", e);
    }
    setImageUrl(
      "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg"
    );
    refetchNftBalanceOf();
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-24 bg-indigo-200 pb-20">
      <Navbar />
      <div className="w-[40%] flex flex-col items-center">
        <ImageGeneration imageUrl={imageUrl} setImageUrl={setImageUrl} />
        {imageUrl && (
          <div className="mt-3 flex flex-col items-center">
            <div className="flex gap-3 items-center">
              <div className="text-xs">with Story Protocol</div>
              <Switch
                aria-label="mint with IP"
                onClick={() => setWithIp((prev) => !prev)}
              />
            </div>
            <button
              className="mt-3 bg-orange-500 rounded-lg px-3 py-1 text-lg"
              onClick={handleMintNft}
              disabled={isMintLoading || isMintAndRegisterLoading}
            >
              Mint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
