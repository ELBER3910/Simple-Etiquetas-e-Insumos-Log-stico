import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const N8N_WEBHOOK_URL = "https://api.techintelligency.com.br/webhook-test/captura-scrapeer";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

function toText(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

type Rows = Record<string, string>[] | null;

export const enviarBusca = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        produto: z.string().trim().min(1).max(200),
        tipoFornecedor: z.enum(["Todos", "Fabricantes", "Distribuidores", "Atacadistas", "Revendedores"]),
        abrangencia: z.enum(["Brasil", "Estado", "Cidade"]),
        estado: z.string().trim().max(2),
        cidade: z.string().trim().max(200),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const estado = data.abrangencia === "Brasil" ? "" : data.estado;
    const cidade = data.abrangencia === "Cidade" ? data.cidade : "";
    if (data.abrangencia !== "Brasil" && !estado)
      return { ok: false, error: "Selecione o estado.", rows: null as Rows, total: 0 };
    if (data.abrangencia === "Cidade" && !cidade)
      return { ok: false, error: "Informe a cidade.", rows: null as Rows, total: 0 };
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produto: data.produto,
          tipoFornecedor: data.tipoFornecedor,
          abrangencia: data.abrangencia,
          estado,
          cidade,
        }),
      });
      const text = await res.text();
      if (!res.ok) {
        console.error(`n8n webhook failed [${res.status}]: ${text}`);
        return { ok: false, error: `O fluxo do n8n respondeu com erro (${res.status}).`, rows: null as Rows, total: 0 };
      }
      let body: unknown = null;
      try { body = JSON.parse(text); } catch { body = null; }
      const b = (Array.isArray(body) ? body[0] : body) as { empresas?: unknown; total?: unknown } | null;
      const lista = Array.isArray(b?.empresas)
        ? (b!.empresas as Record<string, unknown>[])
        : Array.isArray(body) ? (body as Record<string, unknown>[]) : [];
      const rows = lista.map((e) => {
        const r: Record<string, string> = {};
        for (const [k, v] of Object.entries(e ?? {})) r[norm(k)] = toText(v);
        return r;
      });
      const t = Number(b?.total);
      return { ok: true, error: null, rows, total: Number.isFinite(t) ? t : rows.length };
    } catch (err) {
      console.error("n8n webhook error", err);
      return { ok: false, error: "Não foi possível falar com o fluxo do n8n.", rows: null as Rows, total: 0 };
    }
  });
