import duasColunas from "@/assets/produto-etiqueta-duas-colunas.jpg";
import umaColuna from "@/assets/produto-etiqueta-uma-coluna.jpg";
import resma from "@/assets/produto-etiqueta-resma.jpg";
import envelope from "@/assets/produto-envelope.jpg";
import fita from "@/assets/produto-fita.jpg";
import bolha from "@/assets/produto-plastico-bolha.jpg";
import aguaSanitaria from "@/assets/produto-agua-sanitaria.jpg.asset.json";
import detergenteNeutro from "@/assets/produto-detergente-neutro.jpg.asset.json";
import limpadorMultiuso from "@/assets/produto-limpador-multiuso.jpg.asset.json";
import desinfetante from "@/assets/produto-desinfetante-natureza.jpg.asset.json";
import detergentePerolado from "@/assets/produto-detergente-perolado.jpg.asset.json";
import papelHigienico from "@/assets/produto-papel-higienico.jpg.asset.json";

export type ProductLine = "embalagem" | "limpeza";

export const products = [
  {
    name: "Etiqueta térmica 40 × 25 mm",
    specification: "2.000 etiquetas por rolo · Duas colunas",
    description: "Etiquetas adesivas térmicas em duas colunas para identificação de produtos, códigos de barras e organização do estoque.",
    image: duasColunas,
    alt: "Exemplo de rolo de etiquetas térmicas brancas em duas colunas",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Etiqueta térmica 40 × 25 mm",
    specification: "1.000 etiquetas por rolo · Uma coluna",
    description: "Etiquetas adesivas térmicas em uma coluna para identificação de itens, controle de estoque e rotinas de expedição.",
    image: umaColuna,
    alt: "Exemplo de rolo de etiquetas térmicas brancas em uma coluna",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Etiqueta térmica 100 × 150 mm",
    specification: "Em resma",
    description: "Etiquetas adesivas térmicas em resma, com espaço para dados de envio e códigos de barras. Indicadas para identificação de volumes e pedidos.",
    image: resma,
    alt: "Exemplo de etiquetas térmicas de envio organizadas em resma",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Envelope de segurança",
    specification: "26 × 36 cm",
    description: "Envelope para acondicionar produtos e documentos, com fechamento adesivo para as rotinas de envio de lojas, e-commerce e centros de distribuição.",
    image: envelope,
    alt: "Exemplo de envelopes de segurança com aba de fechamento adesivo",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Fita adesiva transparente",
    specification: "45 mm × 100 m",
    description: "Fita transparente em rolo de 100 metros para fechamento de caixas e pacotes, mantendo a identificação da embalagem visível.",
    image: fita,
    alt: "Exemplo de rolo de fita adesiva transparente para embalagem",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Fita adesiva transparente",
    specification: "45 mm × 50 m",
    description: "Fita transparente em rolo de 50 metros para montagem de embalagens, fechamento de caixas e preparação de pedidos para envio.",
    image: fita,
    alt: "Exemplo de fita adesiva transparente com núcleo de papelão",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Plástico bolha G",
    specification: "1,30 m × 100 m",
    description: "Rolo de plástico bolha com largura de 1,30 metro para envolver volumes maiores e ajudar a amortecer impactos durante o transporte.",
    image: bolha,
    alt: "Exemplo de rolo de plástico bolha para proteção de volumes grandes",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Plástico bolha M",
    specification: "65 cm × 100 m",
    description: "Rolo de plástico bolha com largura de 65 centímetros para proteger produtos de médio porte e separar itens dentro das embalagens.",
    image: bolha,
    alt: "Exemplo de plástico bolha para proteção de produtos de médio porte",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Plástico bolha P",
    specification: "43 cm × 100 m",
    description: "Rolo de plástico bolha com largura de 43 centímetros para envolver objetos menores e proteger peças delicadas na preparação dos pedidos.",
    image: bolha,
    alt: "Exemplo de plástico bolha para embalagem de objetos pequenos",
    line: "embalagem" as ProductLine,
  },
  {
    name: "Água sanitária",
    specification: "Galão 5 L",
    description: "Água sanitária em galão de 5 litros para limpeza pesada e desinfecção de pisos, banheiros e áreas comuns de fábricas, depósitos e escritórios.",
    image: aguaSanitaria.url,
    alt: "Galão de água sanitária de 5 litros com rótulo azul",
    line: "limpeza" as ProductLine,
  },
  {
    name: "Detergente neutro",
    specification: "Galão 5 L",
    description: "Detergente neutro em galão de 5 litros para a limpeza geral de superfícies, utensílios e equipamentos, sem manchar e sem cheiro forte.",
    image: detergenteNeutro.url,
    alt: "Galão azul de detergente neutro de 5 litros",
    line: "limpeza" as ProductLine,
  },
  {
    name: "Limpador multiuso Campestre",
    specification: "Galão 5 L",
    description: "Limpador multiuso com aroma campestre em galão de 5 litros para pisos, bancadas e superfícies laváveis do dia a dia da operação.",
    image: limpadorMultiuso.url,
    alt: "Galão roxo de limpador multiuso Campestre de 5 litros",
    line: "limpeza" as ProductLine,
  },
  {
    name: "Desinfetante Natureza",
    specification: "Galão 5 L",
    description: "Desinfetante com fragrância Natureza em galão de 5 litros para desinfecção de pisos e ambientes, deixando o cheiro de limpeza por mais tempo.",
    image: desinfetante.url,
    alt: "Galão verde de desinfetante Natureza de 5 litros",
    line: "limpeza" as ProductLine,
  },
  {
    name: "Detergente perolado Doveli",
    specification: "Galão 5 L",
    description: "Detergente perolado Doveli em galão de 5 litros, de alta espuma, para a limpeza de louças, bancadas e equipamentos da cozinha e do refeitório.",
    image: detergentePerolado.url,
    alt: "Galão rosa de detergente perolado Doveli de 5 litros",
    line: "limpeza" as ProductLine,
  },
  {
    name: "Papel higiênico institucional",
    specification: "8 rolos · 300 m",
    description: "Papel higiênico institucional em pacote com 8 rolos de 300 metros, para banheiros de fábricas, escritórios e centros de distribuição.",
    image: papelHigienico.url,
    alt: "Pacote de papel higiênico institucional com rolos de 300 metros",
    line: "limpeza" as ProductLine,
  },
];
