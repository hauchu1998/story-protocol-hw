"use client";
import Image from "next/image";
import { useTokenUriOf, useTokenOfOwnerByIndex } from "@/hook/useNftData";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import useStoryIPOf from "@/hook/useStoryProtocol";
import { shortAddress } from "@/utils/address";
import { CONTRACT_ADDRESS } from "@/constants/contract";

const NftCard = ({ index }: { index: number }) => {
  const { tokenId } = useTokenOfOwnerByIndex(index);
  const { tokenUri } = useTokenUriOf(tokenId);
  const { ipId, isRegistered, refetchIpAccount, refetchIsRegistered } =
    useStoryIPOf(tokenId);
  const [isError, setIsError] = useState(false);

  const handleRegisterIP = async () => {
    const body = {
      contractAddress: CONTRACT_ADDRESS,
      tokenId,
    };
    console.log(body);
    const res = await fetch("http://localhost:3006/storyprotocol/registerip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    await refetchIpAccount();
    await refetchIsRegistered();
  };

  return (
    <div className="flex flex-col items-center">
      {tokenUri && !isError ? (
        <Image
          src={tokenUri}
          alt="nft image"
          width={200}
          height={200}
          onError={(e) => {
            setIsError(true);
          }}
        />
      ) : isError ? (
        <Image src="/image404.jpeg" alt="nft image" width={200} height={200} />
      ) : (
        <Skeleton variant="rectangular" width={200} height={200} />
      )}
      <div className="mt-3 text-center text-xs">
        <div>Token ID: {tokenId.toString()}</div>
        <div>
          IP ID:{" "}
          {isRegistered ? shortAddress(ipId).toString() : "Not Registered"}
        </div>
        <button
          className="mt-3 bg-orange-500 rounded-lg px-3 py-1"
          onClick={handleRegisterIP}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default NftCard;
