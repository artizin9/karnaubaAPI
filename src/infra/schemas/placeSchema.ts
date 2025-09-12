import { z } from "zod";

export enum SubLocation {
  SEDE = "SEDE",
  PE_DA_SERRA = "PÉ_DA_SERRA",
  VARZEA_DA_CRUZ = "VÁRZEA_DA_CRUZ",
  MIRIM = "MIRIM",
  GREGORIO = "GREGÓRIO",
  CONTENDAS = "CONTENDAS",
  TANGENTE = "TANGENTE",
  AIUA = "AIUA",
  IPAGUACU_MIRIM = "IPAGUAÇU_MIRIM",
  CACIMBA_VELHA = "CACIMBA_VELHA",
  ARARINHA = "ARARINHA",
  ARRAIAL = "ARRAIAL",
  BAIXIO = "BAIXIO",
  CACIMBINHA = "CACIMBINHA",
  CAMPESTRE = "CAMPESTRE",
  CASA_FORTE = "CASA_FORTE",
  CURU = "CURÚ",
  FAZENDINHA = "FAZENDINHA",
  GROSSOS = "GROSSOS",
  JATOBA = "JATOBÁ",
  MADEIRO = "MADEIRO",
  MERUOQUINHA = "MERUOQUINHA",
  MORGADO = "MORGADO",
  PASSAGEM = "PASSAGEM",
  PAUS_BRANCO = "PAUS_BRANCO",
  RAIZ = "RAIZ",
  RIACHAO_DOS_FARIAS = "RIACHÃO_DOS_FARIAS",
  RIACHO_FUNDO = "RIACHO_FUNDO",
  RIO_DO_CANTO = "RIO_DO_CANTO",
  SALGADINHO = "SALGADINHO",
  SANTA_LUZIA = "SANTA_LUZIA",
  SANTO_AMARO = "SANTO_AMARO",
  SAO_DAMIAO = "SÃO_DAMIÃO",
  TAPERA_ALTA = "TAPERA_ALTA",
  TAPERA_BAIXA = "TAPERA_BAIXA",
  TERRA_NOVA = "TERRA_NOVA",
  TRAPIA = "TRAPIÁ",
  VASSOURAS = "VASSOURAS",
  VAZEA_DA_CRUZ = "VAZEA_DA_CRUZ",
  MUMBABA = "MUMBABA",
  PADRE_LINHARES = "PADRE_LINHARES",
  TUINA = "TUÍNA"
}


export const placeSchema = z.object({
  name: z.string({ required_error: "Name is required" }).regex(/^[^<>]*$/, "Sem tags HTML"),
  location: z.string({ required_error: "Location is required" }).regex(/^[^<>]*$/, "Sem tags HTML"),
  description: z.string({ required_error: "Description is required" }).regex(/^[^<>]*$/, "Sem tags HTML"),
  photoURLs: z.array(z.string()),
  category: z.enum(['RESTAURANT', 'HOTEL', 'TOURIST_ATTRACTIONS', 'LANDSCAPE', 'HOSTING']),
  phone: z.string().max(15).regex(/^[^<>]*$/, "Sem tags HTML").optional(),
  instagram: z.string().regex(/^[^<>]*$/, "Sem tags HTML").optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  subLocation: z.nativeEnum(SubLocation)
});



