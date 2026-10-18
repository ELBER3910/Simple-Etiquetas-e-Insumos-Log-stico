import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";

describe("Catálogo informado", () => {
  it("contém os nove produtos do anexo", () => {
    expect(products).toHaveLength(9);
    expect(products.map(({ specification }) => specification)).toEqual([
      "2.000 etiquetas por rolo · Duas colunas",
      "1.000 etiquetas por rolo · Uma coluna",
      "Em resma",
      "26 × 36 cm",
      "45 mm × 100 m",
      "45 mm × 50 m",
      "1,30 m × 100 m",
      "65 cm × 100 m",
      "43 cm × 100 m",
    ]);
  });

  it("não disponibiliza valores de venda no catálogo público", () => {
    for (const product of products) {
      expect(Object.keys(product).filter((key) => /price|preco|preço|valor/i.test(key))).toEqual([]);
      expect(Object.values(product).some((value) => /R\$/.test(value))).toBe(false);
    }
  });
});