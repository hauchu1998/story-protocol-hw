import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const IPAssetRegistrty = "0x292639452A975630802C17c9267169D93BD5a793";
const IPResolver = "0x3809f4128B0B33AFb17576edafD7D4F4E2ABE933";
const IPARegistry = "0x0f1Ea73cECA9EC2C90B983483FFC3Ac45DAd0CC0";

const SP721Module = buildModule("SP721Module", (m) => {
  const sp721 = m.contract("SP721", [IPARegistry]);

  return { sp721 };
});

export default SP721Module;
