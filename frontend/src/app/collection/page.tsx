"use client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useOwnerOf, useTokenUriOf } from "@/hook/useNftData";
import { useNftBalanceOf } from "@/hook/useUserData";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import Navbar from "@/components/navbar";
import NftCard from "@/components/nftCard";

const Collection = () => {
  const { address } = useAccount();
  const { balanceOf } = useNftBalanceOf();
  return (
    <div className="flex min-h-screen flex-col items-center px-24 bg-indigo-200 pb-20">
      <Navbar />
      <div className="mt-5 w-full text-center">Check Out Your Collection</div>
      <div className="mt-8 w-[75%] grid grid-cols-5 gap-5">
        {!!balanceOf &&
          Array.from({ length: balanceOf })
            .fill(0)
            .map((_, index) => {
              return <NftCard key={CONTRACT_ADDRESS + index} index={index} />;
            })}
      </div>
    </div>
  );
};

export default Collection;
