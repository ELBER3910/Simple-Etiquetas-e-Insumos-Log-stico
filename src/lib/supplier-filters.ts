export type SupplierRow = Record<string, string>;

export const SUPPLIER_COLUMNS = [
  { label: "Empresa", keys: ["empresa", "nomefantasia", "razaosocial"] },
  { label: "CNPJ", keys: ["cnpj"] },
  { label: "Produto pesquisado", keys: ["produtopesquisado", "produto"] },
  { label: "Cidade", keys: ["cidade", "municipio"] },
  { label: "Estado", keys: ["estado", "uf"] },
  { label: "Telefone", keys: ["telefone", "telefone1"] },
  { label: "E-mail", keys: ["email"] },
  { label: "Site", keys: ["site", "website"] },
  { label: "Atividade econômica", keys: ["atividadeeconomica", "atividade", "cnaedescricao"] },
  { label: "Situação cadastral", keys: ["situacaocadastral", "situacao"] },
  { label: "Status de verificação", keys: ["statusverificacaoproduto", "statusverificacao", "verificacaoproduto", "status"] },
];

export const supplierCell = (row: SupplierRow, keys: string[]) => keys.map((key) => row[key]).find(Boolean) ?? "";
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

export function isActiveSupplier(row: SupplierRow) {
  return ["ativa", "ativo", "2", "02", "2ativa", "02ativa", "ativa2", "ativa02"].includes(normalize(supplierCell(row, ["situacaocadastral", "situacao"])));
}

export const PRINT_COLUMNS = SUPPLIER_COLUMNS.slice(0, 7);
export const SAVE_COLUMNS = SUPPLIER_COLUMNS.slice(0, 9);

export function suppliersToSave(rows: SupplierRow[]) {
  return rows.filter(isActiveSupplier).map((row) => Object.fromEntries(
    SAVE_COLUMNS.map((column) => [column.keys[0], supplierCell(row, column.keys)]),
  ));
}

export function suppliersToPrint(rows: SupplierRow[], filters: Record<string, string>) {
  return filterSuppliers(rows, filters).filter(isActiveSupplier).map((row) => PRINT_COLUMNS.map((column) => supplierCell(row, column.keys)));
}

export function filterSuppliers(rows: SupplierRow[], filters: Record<string, string>) {
  return rows.filter((row) => SUPPLIER_COLUMNS.every((column) => {
    const query = normalize(filters[column.label] ?? "");
    return !query || normalize(supplierCell(row, column.keys)).includes(query);
  }));
}

export function supplierMetrics(rows: SupplierRow[]) {
  const cnpjs = new Set<string>();
  const activeCnpjs = new Set<string>();
  const phones = new Set<string>();
  const emails = new Set<string>();
  for (const row of rows) {
    const cnpj = supplierCell(row, ["cnpj"]).replace(/\D/g, "");
    if (cnpj.length !== 14) continue;
    cnpjs.add(cnpj);
    if (!isActiveSupplier(row)) continue;
    activeCnpjs.add(cnpj);
    const phone = supplierCell(row, ["telefone", "telefone1"]).replace(/\D/g, "");
    const email = supplierCell(row, ["email"]).trim().toLowerCase();
    if (phone.length >= 10) phones.add(phone);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) emails.add(email);
  }
  return { cnpjs: cnpjs.size, activeCnpjs: activeCnpjs.size, phones: phones.size, emails: emails.size };
}