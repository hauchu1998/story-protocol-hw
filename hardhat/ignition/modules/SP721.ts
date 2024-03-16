import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const IPARegistry = "0x46fDB3A12556890A73a6e6D888A2fc98c92d96E0";

const SP721Module = buildModule("SP721Module", (m) => {
  const sp721 = m.contract("SP721", [IPARegistry], { id: "sp721" });

  return { sp721 };
});

export default SP721Module;
