import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { suppliersToSave } from "@/lib/supplier-filters";
import { SINGLE_OWNER_ID } from "@/lib/single-owner";

export const saveSuppliers = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ rows: z.array(z.record(z.string().max(5000))).min(1).max(5000) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const records = suppliersToSave(data.rows);
    if (!records.length) return { ok: false, count: 0, error: "Nenhuma empresa com situação cadastral ativa para salvar." };
    const unique = [...new Map(records.map((record) => [JSON.stringify([record.cnpj, record.produtopesquisado]), { ...record, user_id: SINGLE_OWNER_ID }])).values()];
    const { data: saved, error } = await supabaseAdmin.from("saved_suppliers")
      .upsert(unique, { onConflict: "user_id,cnpj,produtopesquisado" }).select("id");
    if (error) return { ok: false, count: 0, error: "Não foi possível salvar os dados. Tente novamente." };
    return { ok: true, count: saved.length, error: null };
  });
