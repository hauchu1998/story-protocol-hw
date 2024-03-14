import dynamic from "next/dynamic";

const ConnectWallet = dynamic(() => import("./connectWallet"), { ssr: false });

const Navbar = () => {
  return (
    <div className="grid grid-cols-3 w-full py-3">
      <div className="flex justify-center items-center">Welcome!</div>
      <div className="flex justify-center items-center">Story Protocol</div>
      <div className="flex justify-end items-center px-5">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
