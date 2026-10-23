import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";

describe("Catálogo informado", () => {
  it("contém os nove itens de embalagem e os seis de limpeza", () => {
    expect(products).toHaveLength(15);
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
      "Galão 5 L",
      "Galão 5 L",
      "Galão 5 L",
      "Galão 5 L",
      "Galão 5 L",
      "8 rolos · 300 m",
    ]);
    expect(products.filter((p) => p.line === "limpeza").map((p) => p.name)).toEqual([
      "Água sanitária",
      "Detergente neutro",
      "Limpador multiuso Campestre",
      "Desinfetante Natureza",
      "Detergente perolado Doveli",
      "Papel higiênico institucional",
    ]);
  });

  it("não disponibiliza valores de venda no catálogo público", () => {
    for (const product of products) {
      expect(Object.keys(product).filter((key) => /price|preco|preço|valor/i.test(key))).toEqual([]);
      expect(Object.values(product).some((value) => /R\$/.test(value))).toBe(false);
    }
  });
});
