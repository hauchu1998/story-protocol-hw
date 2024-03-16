import dynamic from "next/dynamic";
import Link from "next/link";

const ConnectWallet = dynamic(() => import("./connectWallet"), { ssr: false });

const Navbar = () => {
  return (
    <div className="grid grid-cols-3 w-full py-3">
      <div className="flex justify-center items-center">
        Welcome!Story Protocol
      </div>
      <div className="flex justify-center items-center gap-5">
        <Link className="hover:text-purple-500" href="/mint">
          Mint
        </Link>
        <Link className="hover:text-purple-500" href="/collection">
          Collection
        </Link>
      </div>
      <div className="flex justify-end items-center px-5">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
