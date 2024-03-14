"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Popover from "@mui/material/Popover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Connector,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from "wagmi";
import Blockies from "react-blockies";
import { shortAddress } from "@/utils/address";
import { pressStart2P } from "@/app/layout";
import { useMediaQuery } from "@mui/material";
import { formatUnits } from "viem";
import SwitchNetwork from "./switchNetwork";
import WalletOption from "./walletOptions";

const ConnectWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [dropDownFlag, setDropDownFlag] = useState<HTMLButtonElement | null>(
    null
  );
  const { address, chainId, isConnected } = useAccount();
  const { data: balance } = useBalance({ chainId, address });
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  const isMobile = useMediaQuery("(max-width:640px)");
  const accountDrop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropDownFlag(event.currentTarget);
  };

  const walletColors: { [key: string]: { color: string; icon: string } } = {
    MetaMask: {
      color: "bg-orange-600",
      icon: "/metamask.png",
    },
    WalletConnect: {
      color: "bg-blue-600",
      icon: "/walletconnect.ico",
    },
  };

  const handleConnectWallet = (connector: Connector) => {
    connect({ connector });
    setShowModal(false);
  };

  return (
    <div className="flex gap-3 items-center">
      <SwitchNetwork />
      {!isConnected ? (
        <div onClick={() => setShowModal(true)}>Connect Wallet</div>
      ) : (
        <div>
          <Button
            id="account-dropdown-button"
            aria-controls={dropDownFlag ? "account-dropdown" : undefined}
            aria-haspopup="true"
            aria-expanded={dropDownFlag ? "true" : undefined}
            aria-describedby={dropDownFlag ? "account-dropdown" : undefined}
            disableRipple={true}
            onClick={accountDrop}
          >
            <div className="flex items-center gap-2">
              <Box
                className={`rounded-full flex items-center justify-center gap-3 ${pressStart2P.className} text-black`}
              >
                <Blockies
                  data-testid="avatar"
                  seed={address?.toLowerCase() || ""}
                  scale={4}
                  size={8}
                  className="rounded-full"
                />
                {shortAddress(address as string)}
              </Box>
              <div className="w-[16px] h-[9px] flex items-center justify-center">
                <Icon
                  component={KeyboardArrowDownIcon}
                  className="text-whiteIconColor block w-fit"
                ></Icon>
              </div>
            </div>
          </Button>
          <Popover
            id="account-dropdown"
            open={Boolean(dropDownFlag)}
            anchorEl={dropDownFlag}
            onClose={() => setDropDownFlag(null)}
            anchorPosition={
              isMobile
                ? { top: window.innerHeight, left: 0 }
                : { top: NaN, left: NaN }
            }
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            disableScrollLock={true}
            sx={
              !isMobile
                ? {
                    "& .MuiPopover-paper": {
                      borderRadius: "35px",
                      marginLeft: "5px",
                    },
                  }
                : {
                    "& .MuiPopover-paper": {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopLeftRadius: "35px",
                      borderTopRightRadius: "35px",
                      left: "0px !important",
                      maxWidth: "none !important",
                    },
                  }
            }
          >
            <div className="flex flex-col bg-black text-white px-8 py-3 ">
              <div className="flex justify-between items-center py-2">
                <div>Account</div>
                <div
                  className="text-white p-2 border border-white rounded-lg hover:bg-white hover:text-black"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </div>
                {isMobile && (
                  <div onClick={() => setDropDownFlag(null)}>
                    <ClearIcon />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div>
                  {balance ? formatUnits(balance.value, balance.decimals) : "0"}{" "}
                  ETH
                </div>
              </div>
            </div>
          </Popover>
        </div>
      )}
      {showModal && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center ">
          <div className="w-[30%] flex flex-col items-center px-8 py-5 border-2 border-white rounded-md gap-y-3">
            <div className="w-full text-center relative text-3xl">
              Choose wallet
              <div
                onClick={() => setShowModal(false)}
                className="absolute top-1 right-1 flex"
              >
                <ClearIcon />
              </div>
            </div>

            {connectors.map((connector) => (
              <WalletOption
                key={connector.uid}
                className={`w-full ${
                  walletColors[connector.name].color
                }  text-white text-2xl rounded-full p-2`}
                icon={walletColors[connector.name].icon}
                connector={connector}
                onClick={() => handleConnectWallet(connector)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
