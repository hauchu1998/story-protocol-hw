import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "nft" })
export class Nft {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  walletAddress: string;

  @Column({ nullable: false })
  chainId: number;

  @Column({ nullable: false })
  contractAddress: string;

  @Column({ nullable: false })
  tokenId: number;

  @Column()
  ipId: string;

  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
