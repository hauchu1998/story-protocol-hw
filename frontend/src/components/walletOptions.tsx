"use client";
import { Connector } from "wagmi";
import { useEffect, useState } from "react";
import Image from "next/image";

interface WalletOptionProps {
  className?: string;
  icon: string;
  connector: Connector;
  onClick: () => void;
}

const WalletOption = ({
  className,
  icon,
  connector,
  onClick,
}: WalletOptionProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);
  return (
    <div className="w-full rounded-full">
      <button
        className={`px-20 w-full flex items-center gap-5 ${className}`}
        disabled={!ready}
        onClick={onClick}
      >
        <Image src={icon} alt={connector.name} width={50} height={50} />
        <div className="w-full text-center">{connector.name}</div>
      </button>
    </div>
  );
};

export default WalletOption;
