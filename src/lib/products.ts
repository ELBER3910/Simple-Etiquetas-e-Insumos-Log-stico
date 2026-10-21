import duasColunas from "@/assets/produto-etiqueta-duas-colunas.jpg";
import umaColuna from "@/assets/produto-etiqueta-uma-coluna.jpg";
import resma from "@/assets/produto-etiqueta-resma.jpg";
import envelope from "@/assets/produto-envelope.jpg";
import fita from "@/assets/produto-fita.jpg";
import bolha from "@/assets/produto-plastico-bolha.jpg";

export const products = [
  {
    name: "Etiqueta térmica 40 × 25 mm",
    specification: "2.000 etiquetas por rolo · Duas colunas",
    description: "Etiquetas adesivas térmicas em duas colunas para identificação de produtos, códigos de barras e organização do estoque.",
    image: duasColunas,
    alt: "Exemplo de rolo de etiquetas térmicas brancas em duas colunas",
  },
  {
    name: "Etiqueta térmica 40 × 25 mm",
    specification: "1.000 etiquetas por rolo · Uma coluna",
    description: "Etiquetas adesivas térmicas em uma coluna para identificação de itens, controle de estoque e rotinas de expedição.",
    image: umaColuna,
    alt: "Exemplo de rolo de etiquetas térmicas brancas em uma coluna",
  },
  {
    name: "Etiqueta térmica 100 × 150 mm",
    specification: "Em resma",
    description: "Etiquetas adesivas térmicas em resma, com espaço para dados de envio e códigos de barras. Indicadas para identificação de volumes e pedidos.",
    image: resma,
    alt: "Exemplo de etiquetas térmicas de envio organizadas em resma",
  },
  {
    name: "Envelope de segurança",
    specification: "26 × 36 cm",
    description: "Envelope para acondicionar produtos e documentos, com fechamento adesivo para as rotinas de envio de lojas, e-commerce e centros de distribuição.",
    image: envelope,
    alt: "Exemplo de envelopes de segurança com aba de fechamento adesivo",
  },
  {
    name: "Fita adesiva transparente",
    specification: "45 mm × 100 m",
    description: "Fita transparente em rolo de 100 metros para fechamento de caixas e pacotes, mantendo a identificação da embalagem visível.",
    image: fita,
    alt: "Exemplo de rolo de fita adesiva transparente para embalagem",
  },
  {
    name: "Fita adesiva transparente",
    specification: "45 mm × 50 m",
    description: "Fita transparente em rolo de 50 metros para montagem de embalagens, fechamento de caixas e preparação de pedidos para envio.",
    image: fita,
    alt: "Exemplo de fita adesiva transparente com núcleo de papelão",
  },
  {
    name: "Plástico bolha G",
    specification: "1,30 m × 100 m",
    description: "Rolo de plástico bolha com largura de 1,30 metro para envolver volumes maiores e ajudar a amortecer impactos durante o transporte.",
    image: bolha,
    alt: "Exemplo de rolo de plástico bolha para proteção de volumes grandes",
  },
  {
    name: "Plástico bolha M",
    specification: "65 cm × 100 m",
    description: "Rolo de plástico bolha com largura de 65 centímetros para proteger produtos de médio porte e separar itens dentro das embalagens.",
    image: bolha,
    alt: "Exemplo de plástico bolha para proteção de produtos de médio porte",
  },
  {
    name: "Plástico bolha P",
    specification: "43 cm × 100 m",
    description: "Rolo de plástico bolha com largura de 43 centímetros para envolver objetos menores e proteger peças delicadas na preparação dos pedidos.",
    image: bolha,
    alt: "Exemplo de plástico bolha para embalagem de objetos pequenos",
  },
];