"use client";

import { useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Popover from "@mui/material/Popover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useChainId, useSwitchChain } from "wagmi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NetworkIds, networks } from "@/constants/networks";

const SwitchNetwork = () => {
  const [dropDownFlag, setDropDownFlag] = useState<HTMLButtonElement | null>(
    null
  );
  const isMobile = useMediaQuery("(max-width:640px)");
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const networkDrop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropDownFlag(event.currentTarget);
  };

  const handleSwitchChain = async (chainId: number) => {
    setDropDownFlag(null);
    if (switchChainAsync) {
      await switchChainAsync({ chainId });
      // show toasted message
    }
  };

  useEffect(() => {
    setDropDownFlag(dropDownFlag);
  }, [dropDownFlag, setDropDownFlag]);

  return (
    <div>
      <Button
        id="network-dropdown-button"
        aria-controls={dropDownFlag ? "network-dropdown" : undefined}
        aria-haspopup="true"
        aria-expanded={dropDownFlag ? "true" : undefined}
        aria-describedby={dropDownFlag ? "network-dropdown" : undefined}
        className="hidden sm:flex sm:items-center sm:gap-[8px]"
        disableRipple={true}
        onClick={networkDrop}
      >
        <Box className="bg-pageBgColor w-[24px] h-[24px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center">
          <Image
            className="rounded-full"
            src={networks[NetworkIds.Sepolia]?.logo}
            alt="fuji"
            width={40}
            height={40}
          />
        </Box>
        <div className="w-[16px] h-[9px] flex items-center justify-center">
          <Icon
            component={KeyboardArrowDownIcon}
            className="text-whiteIconColor block w-fit"
          ></Icon>
        </div>
      </Button>
      <Popover
        id="network-dropdown"
        open={Boolean(dropDownFlag)}
        anchorEl={dropDownFlag}
        onClose={() => setDropDownFlag(null)}
        anchorReference={isMobile ? "anchorPosition" : "anchorEl"}
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
        <div className="flex flex-col bg-black text-white px-8 py-3 text-xl">
          <div className="flex justify-between items-center text-2xl lg:text-3xl py-2">
            <div>Network</div>
            {isMobile && (
              <div onClick={() => setDropDownFlag(null)}>
                <ClearIcon />
              </div>
            )}
          </div>

          {Object.entries(networks)
            .reverse()
            .map(([id, chain]) => (
              <div
                className="flex items-center gap-x-[15px] text-17 lg:text-20 py-2 lg:py-3 px-15 lg:px-25"
                key={id}
              >
                <Avatar
                  sx={{
                    width: "38px",
                    height: "38px",
                  }}
                  className="rounded-full"
                  src={chain.logo}
                />
                <p className="mr-auto">{chain.name}</p>
                <div className="relative">
                  <div
                    className="flex px-15 py-3 rounded-lg cursor-pointer items-center"
                    onClick={() => handleSwitchChain(Number(id))}
                  >
                    {chainId === Number(id) ? (
                      <span className="text-orange-500">Connected</span>
                    ) : (
                      <span>Connect</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Popover>
    </div>
  );
};

export default SwitchNetwork;
