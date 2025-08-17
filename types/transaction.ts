// Base entity type for addresses with entity information
interface EntityInfo {
  entity?: string | null;
  entity_logo?: string | null;
  address: string;
  address_label: string | null;
}

// Token information
interface TokenInfo {
  address: string;
  address_label: string | null;
  token_name: string;
  token_logo: string | null;
  token_symbol: string;
}

// ERC20 Transfer
interface ERC20Transfer {
  token_name: string;
  token_symbol: string;
  token_logo: string | null;
  token_decimals: string;
  from_address_entity: string | null;
  from_address_entity_logo: string | null;
  from_address: string;
  from_address_label: string | null;
  to_address_entity: string | null;
  to_address_entity_logo: string | null;
  to_address: string;
  to_address_label: string | null;
  address: string;
  log_index: number;
  value: string;
  possible_spam: boolean;
  verified_contract: boolean;
  security_score: number | null;
  direction: "send" | "receive";
  value_formatted: string;
}

// Native Transfer (ETH)
interface NativeTransfer {
  from_address_entity: string | null;
  from_address_entity_logo: string | null;
  from_address: string;
  from_address_label: string | null;
  to_address_entity: string | null;
  to_address_entity_logo: string | null;
  to_address: string;
  to_address_label: string | null;
  value: string;
  value_formatted: string;
  direction: "send" | "receive";
  internal_transaction: boolean;
  token_symbol: string;
  token_logo: string;
}

// NFT Transfer (placeholder - empty arrays in examples)
// Structure to be defined when NFT transfers are present
type NFTTransfer = Record<string, unknown>;

// Contract Interactions
interface ContractApproval {
  value: string;
  value_formatted: string;
  token: TokenInfo;
  spender: EntityInfo;
}

interface ContractInteractions {
  approvals?: ContractApproval[];
  // Other contract interactions can be added here
}

// Main Transaction type
export type Transaction = {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address_entity: string | null;
  from_address_entity_logo: string | null;
  from_address: string;
  from_address_label: string | null;
  to_address_entity: string | null;
  to_address_entity_logo: string | null;
  to_address: string;
  to_address_label: string | null;
  value: string;
  gas: string;
  gas_price: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: string | null;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transaction_fee: string;
  method_label: string | null;
  nft_transfers: NFTTransfer[];
  erc20_transfers: ERC20Transfer[];
  native_transfers: NativeTransfer[];
  contract_interactions?: ContractInteractions;
  summary: string;
  possible_spam: boolean;
  category:
    | "token swap"
    | "receive"
    | "token receive"
    | "approve"
    | "send"
    | "token send"
    | "withdraw"
    | "airdrop"
    | "contract interaction"
    | "nft receive";
};
