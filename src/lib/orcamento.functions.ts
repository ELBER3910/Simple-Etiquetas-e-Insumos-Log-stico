import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  empresa: z.string().trim().min(1).max(200),
  nome: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  telefone: z.string().trim().min(1).max(40),
  mensagem: z.string().trim().max(3000).optional().default(""),
});

export const enviarOrcamento = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    try {
      const res = await fetch("https://api.techintelligency.com.br/webhook/projeto-simple-empreendimentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, origem: "site-simple-etiquetas", enviadoEm: new Date().toISOString() }),
      });
      if (!res.ok) {
        console.error("Webhook orçamento falhou", res.status);
        return { ok: false };
      }
      return { ok: true };
    } catch (e) {
      console.error("Webhook orçamento erro", e);
      return { ok: false };
    }
  });
