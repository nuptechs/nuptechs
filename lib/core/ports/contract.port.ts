/**
 * ContractPort — Abstração para persistência e operações de contratos SaaS.
 * Negócio NUNCA importa DB diretamente — só este port.
 */

export type ContractStatus =
  | "draft"
  | "sent"
  | "signed"
  | "active"
  | "cancelled"
  | "expired";

export type ContractClientType = "pj" | "pf";

export type ContractSystem = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type Contract = {
  id: number;
  publicToken: string;
  status: ContractStatus;

  clientType: ContractClientType;
  clientName: string;
  clientFantasyName: string | null;
  clientDocument: string;
  clientEmail: string | null;
  clientPhone: string | null;
  clientAddress: string | null;
  clientNumber: string | null;
  clientComplement: string | null;
  clientNeighborhood: string | null;
  clientCity: string | null;
  clientState: string | null;
  clientZip: string | null;

  representativeName: string | null;
  representativeRg: string | null;
  representativeCpf: string | null;
  representativeRole: string | null;

  systems: string[];
  customSystem: string | null;

  monthlyValueCents: number;
  paymentDay: number;
  loyaltyMonths: number;
  earlyTerminationFeeMonths: number;
  customizationDeadlineDays: number;

  signedAt: Date | null;
  startDate: Date | null;
  loyaltyEndDate: Date | null;

  createdBy: string;
  createdByName: string | null;
  notes: string | null;
  clausesSnapshot: unknown;

  createdAt: Date;
  updatedAt: Date;
};

export type ContractCreateInput = Omit<
  Contract,
  | "id"
  | "publicToken"
  | "status"
  | "signedAt"
  | "startDate"
  | "loyaltyEndDate"
  | "createdAt"
  | "updatedAt"
  | "clausesSnapshot"
> & {
  status?: ContractStatus;
  startDate?: Date | null;
};

export type ContractFilters = {
  status?: ContractStatus | ContractStatus[];
  search?: string;
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export type ContractStats = {
  total: number;
  byStatus: Record<ContractStatus, number>;
  totalMonthlyRevenueCents: number;
  thisMonth: number;
};

export type ContractTimelineEntry = {
  id: number;
  contractId: number;
  action: string;
  detail: string | null;
  performedBy: string | null;
  performedByName: string | null;
  metadata: unknown;
  createdAt: Date;
};

export abstract class ContractPort {
  abstract findAll(
    filters?: ContractFilters,
    limit?: number,
    offset?: number
  ): Promise<Contract[]>;

  abstract count(filters?: ContractFilters): Promise<number>;

  abstract findById(id: number): Promise<Contract | null>;

  abstract findByToken(token: string): Promise<Contract | null>;

  abstract create(input: ContractCreateInput): Promise<Contract>;

  abstract update(
    id: number,
    patch: Partial<ContractCreateInput> & { status?: ContractStatus },
    performedBy: string,
    performedByName?: string | null
  ): Promise<Contract>;

  abstract updateStatus(
    id: number,
    status: ContractStatus,
    performedBy: string,
    performedByName?: string | null
  ): Promise<Contract>;

  abstract delete(id: number): Promise<void>;

  abstract getStats(): Promise<ContractStats>;

  // Catálogo de sistemas
  abstract listSystems(activeOnly?: boolean): Promise<ContractSystem[]>;

  // Timeline
  abstract getTimeline(contractId: number): Promise<ContractTimelineEntry[]>;

  abstract addTimelineEntry(entry: {
    contractId: number;
    action: string;
    detail?: string | null;
    performedBy?: string | null;
    performedByName?: string | null;
    metadata?: unknown;
  }): Promise<void>;
}
