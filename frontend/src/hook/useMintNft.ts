import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import SP721ABI from "@/abi/SP721.json";

export const useMintWithUri = () => {
  const { data: hash, writeContract } = useWriteContract();

  const mintWithUri = useCallback(
    async (imageUrl: string) => {
      if (!CONTRACT_ADDRESS)
        throw new Error("mintWithUri: Contract is not loaded");
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: SP721ABI,
        functionName: "mintWithUri",
        args: [imageUrl],
      });
    },
    [writeContract]
  );

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return { hash, isLoading, isSuccess, mintWithUri };
};

export const useMintAndRegisterIP = () => {
  const { data: hash, writeContractAsync } = useWriteContract();

  const mintWithUriAndRegisterIP = useCallback(
    async (ipName: string, imageUrl: string) => {
      if (!CONTRACT_ADDRESS)
        throw new Error("mintWithUriAndRegisterIP: Contract is not loaded");
      try {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: SP721ABI,
          functionName: "mintWithUriAndRegisterIP",
          args: [ipName, imageUrl],
        });
        console.log("success");
      } catch (e) {
        console.error("mintWithUriAndRegisterIP error: ", e);
      }
    },
    [writeContractAsync]
  );

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return { hash, isLoading, isSuccess, mintWithUriAndRegisterIP };
};
