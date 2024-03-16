"use client";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import Navbar from "@/components/navbar";
import ImageGeneration from "@/components/imageGeneration";
import { useMintWithUri, useMintAndRegisterIP } from "@/hook/useMintNft";
import { useNftBalanceOf } from "@/hook/useUserData";
import { toast } from "sonner";
import Loading from "@/components/loading";

export default function Mint() {
  const {
    hash: mintWithUriHash,
    mintWithUri,
    isLoading: isMintLoading,
    isSuccess: isMintSuccess,
  } = useMintWithUri();
  const {
    hash: mintWithUriAndRegisterIPHash,
    mintWithUriAndRegisterIP,
    isLoading: isMintAndRegisterLoading,
    isSuccess: isMintAndRegisterSuccess,
  } = useMintAndRegisterIP();
  const { refetchNftBalanceOf } = useNftBalanceOf();

  const defaultImageUrl =
    "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg";
  const [imageUrl, setImageUrl] = useState<string>("");
  const [withIp, setWithIp] = useState<boolean>(false);

  const handleMintNft = async () => {
    console.log("handleMintNft: ", imageUrl, withIp);
    try {
      if (withIp) {
        await mintWithUriAndRegisterIP("TestIP", imageUrl);
      } else {
        await mintWithUri(imageUrl);
      }

      await refetchNftBalanceOf();
    } catch (e) {
      console.error("mint nft error: ", e);
      toast.error("failed minted");
    }
  };

  useEffect(() => {
    if ((withIp && isMintAndRegisterSuccess) || isMintSuccess) {
      setImageUrl("");
      toast.success("successfully minted");
    }
  }, [isMintAndRegisterSuccess, isMintSuccess, withIp]);

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
            {(isMintLoading || isMintAndRegisterLoading) && (
              <Loading className="mt-3" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
