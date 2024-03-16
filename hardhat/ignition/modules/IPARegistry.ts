import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const IPAssetRegistrty = "0x292639452A975630802C17c9267169D93BD5a793";
const IPResolver = "0x3809f4128B0B33AFb17576edafD7D4F4E2ABE933";

const IPARegistrarModule = buildModule("IPARegistrarModule", (m) => {
  const IPARegistrar = m.contract("IPARegistrar", [IPAssetRegistrty, IPResolver], { id: "iparegistrar" });

  return { IPARegistrar };
});

export default IPARegistrarModule;
