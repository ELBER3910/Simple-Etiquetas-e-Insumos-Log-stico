import { z } from "zod";

export const CRM_STAGES = [
  { value: "ativos", label: "Empresa CNPJ Ativos" },
  { value: "conversas", label: "Conversas em Andamentos" },
  { value: "fechado", label: "Cliente Fechado" },
  { value: "recuperacao", label: "Descarte" },
] as const;

export const crmStageSchema = z.enum(["ativos", "conversas", "fechado", "recuperacao"]);
export type CrmStage = z.infer<typeof crmStageSchema>;
export const crmMoveSchema = z.object({ id: z.string().uuid(), stage: crmStageSchema });
// Preserve the stored key so existing saved stages remain compatible.
export const CRM_DISCARD_STAGE: CrmStage = "recuperacao";

export const CRM_STAGE_TONES: Record<CrmStage, { border: string; icon: string; card: string }> = {
  ativos: { border: "border-primary", icon: "text-primary", card: "border-border bg-card" },
  conversas: { border: "border-warning", icon: "text-warning-foreground", card: "border-warning-border bg-warning-surface" },
  fechado: { border: "border-success", icon: "text-success-foreground", card: "border-success-border bg-success-surface" },
  recuperacao: { border: "border-destructive", icon: "text-destructive", card: "border-destructive bg-destructive/10" },
};

export function groupCrmSuppliers<T extends { crm_stage: string }>(rows: T[]) {
  return CRM_STAGES.map((stage) => ({ ...stage, suppliers: rows.filter((row) => row.crm_stage === stage.value) }));
}

function normalizeSearchTerm(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

export function crmSearchTerms<T extends { produtopesquisado: string }>(rows: T[]) {
  const seen = new Set<string>();
  const terms: string[] = [];
  for (const row of rows) {
    const term = row.produtopesquisado.trim();
    const key = normalizeSearchTerm(term);
    if (term && !seen.has(key)) {
      seen.add(key);
      terms.push(term);
    }
  }
  return terms.sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function filterCrmBySearch<T extends { produtopesquisado: string }>(rows: T[], term: string) {
  const key = normalizeSearchTerm(term);
  if (!key) return rows;
  return rows.filter((row) => normalizeSearchTerm(row.produtopesquisado) === key);
}