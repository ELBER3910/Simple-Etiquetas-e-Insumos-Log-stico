import { createServerFn } from "@tanstack/react-start";
import { SINGLE_OWNER_ID } from "@/lib/single-owner";
import { CRM_DISCARD_STAGE, crmMoveSchema } from "@/lib/supplier-crm";

export const listCrmSuppliers = createServerFn({ method: "POST" })
  .handler(async () => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const rows = [];
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await db.from("saved_suppliers")
        .select("id,empresa,cnpj,produtopesquisado,cidade,estado,telefone,email,site,atividadeeconomica,crm_stage")
        .eq("user_id", SINGLE_OWNER_ID).order("empresa").order("id").range(offset, offset + 999);
      if (error) throw new Error("Não foi possível carregar as empresas salvas.");
      rows.push(...data);
      if (data.length < 1000) break;
    }
    return rows;
  });

export const moveCrmSupplier = createServerFn({ method: "POST" })
  .inputValidator((input) => crmMoveSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const { data: updated, error } = await db.from("saved_suppliers")
      .update({ crm_stage: data.stage }).eq("id", data.id).eq("user_id", SINGLE_OWNER_ID)
      .select("id,crm_stage").maybeSingle();
    if (error || !updated) throw new Error("Não foi possível mover a empresa. Tente novamente.");
    return updated;
  });

export const saveCrmDiscards = createServerFn({ method: "POST" })
  .handler(async () => {
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
    const { count, error } = await db.from("saved_suppliers")
      .delete({ count: "exact" })
      .eq("user_id", SINGLE_OWNER_ID)
      .eq("crm_stage", CRM_DISCARD_STAGE);
    if (error) throw new Error("Não foi possível excluir as empresas descartadas. Tente novamente.");
    return { count: count ?? 0 };
  });