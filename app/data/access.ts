export type RoleInterne = "CRE" | "RRE" | "DRE" | "DIRECTION CO";

export type AccesInterne = {
  nom: string;
  email: string;
  role: RoleInterne;
  campus: string;
};

export const accesInternes: AccesInterne[] = [
  { nom: "SEGHIR Mélissa", email: "mseghir@eductive-lille.fr", role: "RRE", campus: "EDUCTIVE LILLE VAUBAN" },
  { nom: "MERGAT Julie", email: "jmergnat@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE VAUBAN" },
  { nom: "DEMASSIEUX Marine", email: "mdemassieux@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE VAUBAN" },
  { nom: "KUNTZSCH Emma", email: "ekuntzsch@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE VAUBAN" },

  { nom: "PEREZ Emilie", email: "eperez@eductive-aix.fr", role: "RRE", campus: "EDUCTIVE AIX-EN-PROVENCE" },
  { nom: "DOMINGUES Elisa", email: "edomingues@eductive-aix.fr", role: "CRE", campus: "EDUCTIVE AIX-EN-PROVENCE" },
  { nom: "KERMOUN Clara", email: "ckermoun@eductive-aix.fr", role: "CRE", campus: "EDUCTIVE AIX-EN-PROVENCE" },
  { nom: "ZARB-CHAPERON Julia", email: "jzarb@eductive-aix.fr", role: "CRE", campus: "EDUCTIVE AIX-EN-PROVENCE" },
  { nom: "L'HOMME Angélique", email: "alhomme@eductive-aix.fr", role: "CRE", campus: "EDUCTIVE AIX-EN-PROVENCE" },
  { nom: "LERNON Pauline", email: "plernon2@eductive-aix.fr", role: "CRE", campus: "EDUCTIVE AIX-EN-PROVENCE" },

  { nom: "DE BATTISTI Manon", email: "mdebattisti01@eductive-bordeaux.fr", role: "CRE", campus: "EDUCTIVE BORDEAUX" },
  { nom: "SOULAS Jeanne-Marie", email: "jsoulas@eductive-bordeaux.fr", role: "CRE", campus: "EDUCTIVE BORDEAUX" },

  { nom: "FONTANEL Laura", email: "lfontanel2@eductive-grenoble.fr", role: "RRE", campus: "EDUCTIVE GRENOBLE" },
  { nom: "PARRINELLO Eléonore", email: "eparrinello@eductive-grenoble.fr", role: "CRE", campus: "EDUCTIVE GRENOBLE" },
  { nom: "TRAN Alice", email: "atran19@eductive-grenoble.fr", role: "CRE", campus: "EDUCTIVE GRENOBLE" },
  { nom: "KUENZI Jimmy", email: "jkuenzi@eductive-grenoble.fr", role: "CRE", campus: "EDUCTIVE GRENOBLE" },

  { nom: "BOSTYN Franck", email: "fbostyn@eductive-lille.fr", role: "DRE", campus: "EDUCTIVE LILLE LIBERTE" },
  { nom: "GAUDET Eloise", email: "egaudet@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE LIBERTE" },
  { nom: "BERNARD Celine", email: "cbernard33@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE LIBERTE" },
  { nom: "QUINAUX Flore", email: "fquinaux1@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE LIBERTE" },
  { nom: "BISSON Amélie", email: "abisson5@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE LIBERTE" },
  { nom: "FACHE Sebastien", email: "sfache2@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE LIBERTE" },
  { nom: "LE FLAO Lieven", email: "lleflao@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLE LIBERTE" },

  { nom: "OUABEL Andy", email: "aouabel@eductive-lille.fr", role: "DRE", campus: "EDUCTIVE LILLENIUM" },
  { nom: "VANDENHEEDE Jeremy", email: "jvandenheede@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLENIUM" },
  { nom: "DEMOUSTIER Manon", email: "mdemoustier@eductive-lille.fr", role: "CRE", campus: "EDUCTIVE LILLENIUM" },

  { nom: "BRUSSEAU Sonny", email: "sbrusseau@eductive-lyon.fr", role: "DRE", campus: "EDUCTIVE LYON" },
  { nom: "CARUSO Gloria", email: "g.caruso@sciences-u.fr", role: "CRE", campus: "EDUCTIVE LYON" },
  { nom: "EL YATTIOUI El Hadi", email: "eh.elyattioui@sciences-u.fr", role: "CRE", campus: "EDUCTIVE LYON" },
  { nom: "TEISSIER Ilona", email: "i.teissier@sciences-u.fr", role: "CRE", campus: "EDUCTIVE LYON" },
  { nom: "REMILI Yasmine", email: "y.remili@sciences-u.fr", role: "CRE", campus: "EDUCTIVE LYON" },
  { nom: "CHANFRAY Bruno", email: "b.chanfray@sciences-u.fr", role: "CRE", campus: "EDUCTIVE LYON" },
  { nom: "MILLARD Ludivine", email: "l.millard@sciences-u.fr", role: "CRE", campus: "EDUCTIVE LYON" },
  { nom: "TSAO Alban", email: "a.tsao@sciences-u.fr", role: "RRE", campus: "EDUCTIVE LYON" },

  { nom: "DIAGNE Fatimata", email: "fdiagne14@eductive-lyon.fr", role: "CRE", campus: "SU LYON" },
  { nom: "ADAM Marion", email: "m.adam@sciences-u.fr", role: "CRE", campus: "SU LYON" },
  { nom: "PAYET MORICE Sandra", email: "spayetmorice@eductive-lyon.fr", role: "CRE", campus: "SU LYON" },
  { nom: "BENJAMIN Shanika", email: "s.benjamin@sciences-u.fr", role: "CRE", campus: "SU LYON" },
  { nom: "ORTIZ Loic", email: "l.ortiz@sciences-u.fr", role: "RRE", campus: "SU LYON" },
  { nom: "THOLOZAN Noemie", email: "n.tholozan@sciences-u.fr", role: "CRE", campus: "SU LYON" },
  { nom: "CUINET Agathe", email: "acuinet@eductive-lyon.fr", role: "CRE", campus: "SU LYON" },
  { nom: "ESTRAGNAT Célia", email: "c.estragnat@2iacademy.com", role: "CRE", campus: "SU LYON" },

  { nom: "PELOSO Dylan", email: "dpeloso@eductive-nantes.fr", role: "CRE", campus: "EDUCTIVE NANTES" },
  { nom: "SCHMID Thomas", email: "tschmid1@eductive-nantes.fr", role: "CRE", campus: "EDUCTIVE NANTES" },
  { nom: "PETEL Mathis", email: "mpetel@eductive-nantes.fr", role: "CRE", campus: "EDUCTIVE NANTES" },

  { nom: "LABYED Imane", email: "ilabyed@eductive-reims.fr", role: "RRE", campus: "EDUCTIVE REIMS" },
  { nom: "DUCROCQ Adeline", email: "aducrocq@eductive-reims.fr", role: "CRE", campus: "EDUCTIVE REIMS" },
  { nom: "BONOT Fanny", email: "fbonot@eductive-reims.fr", role: "CRE", campus: "EDUCTIVE REIMS" },
  { nom: "BATTEUX Alexia", email: "abatteux@eductive-reims.fr", role: "CRE", campus: "EDUCTIVE REIMS" },
  { nom: "DUCORNET Damien", email: "dducornet@eductive-reims.fr", role: "CRE", campus: "EDUCTIVE REIMS" },
  { nom: "CHOUVIER Jonathan", email: "jchouvier@eductive-reims.fr", role: "CRE", campus: "EDUCTIVE REIMS" },
  { nom: "OLIVEIRA Théa", email: "toliveira@eductive-reims.fr", role: "CRE", campus: "EDUCTIVE REIMS" },

  { nom: "ARRAR Hadria", email: "harrar@eductive-toulon.fr", role: "DRE", campus: "EDUCTIVE TOULON" },
  { nom: "CHAUVIN Raphael", email: "rchauvin@eductive-toulon.fr", role: "RRE", campus: "EDUCTIVE TOULON" },

  { nom: "MONTENS Charlène", email: "cmontens@eductive-rennes.fr", role: "RRE", campus: "EDUCTIVE RENNES" },
  { nom: "ESNAULT Romain", email: "resnault1@eductive-rennes.fr", role: "CRE", campus: "EDUCTIVE RENNES" },

  { nom: "CRAMAUSSEL Pauline", email: "pcramaussel@reseau-ges.fr", role: "DRE", campus: "EDUCTIVE TOULOUSE ET SKOLAE MONTPELLIER" },
  { nom: "RAINAUD Elodie", email: "erainaud@eductive-toulouse.fr", role: "CRE", campus: "EDUCTIVE TOULOUSE" },
  { nom: "GARRIDO Laure", email: "lgarrido@eductive-toulouse.fr", role: "CRE", campus: "EDUCTIVE TOULOUSE" },
  { nom: "MASTON Léane", email: "lmaston1@eductive-toulouse.fr", role: "CRE", campus: "EDUCTIVE TOULOUSE" },

  { nom: "DE FREITAS Clara", email: "cdefreitas@reseau-ges.fr", role: "RRE", campus: "ESC PARIS" },
  { nom: "COADOU Lucille", email: "lcoadou@reseau-ges.fr", role: "CRE", campus: "ESC PARIS" },
  { nom: "IDRISSI KAITOUNI Wième", email: "widrissikaitouni@efet.fr", role: "CRE", campus: "ESC PARIS" },

  { nom: "STABILE Marine", email: "mstabile@eimlp.fr", role: "RRE", campus: "EIML PARIS" },
  { nom: "MOUJABBER Rita", email: "rmoujabber@eimlp.fr", role: "CRE", campus: "EIML PARIS" },
  { nom: "DECONFIN Levi", email: "ldeconfin@eimlp.fr", role: "CRE", campus: "EIML PARIS" },
  { nom: "LIBERT Magalie", email: "mlibert@eimlp.fr", role: "CRE", campus: "EIML PARIS" },
  { nom: "BEL Sofia", email: "sbel@eimlp.fr", role: "CRE", campus: "EIML PARIS" },
  { nom: "MOINE Samuel", email: "smoine@eimlp.fr", role: "CRE", campus: "EIML PARIS" },

  { nom: "VURPILLAT Adrien", email: "avurpillat@skolae.fr", role: "DRE", campus: "ESGI PARIS" },
  { nom: "MANSOURI Dylan", email: "dmansouri@esgi.fr", role: "RRE", campus: "ESGI PARIS" },
  { nom: "BOUKHATEM Nouella", email: "nboukathem@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "MICHEL Clémence", email: "cmichel@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "BESCHE Raphael", email: "rbesche@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "FIGARD Lola", email: "lfigard@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "KERROUCHI Yanis", email: "ykerrouchi@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "MALEBO Francoise", email: "fmalebo@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "BOUGUERN Théo", email: "tbouguern1@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "COUTENCEAU Joel", email: "jcoutenceau3@esgi.fr", role: "CRE", campus: "ESGI PARIS" },
  { nom: "GHANSI Joel", email: "jghansi@esgi.fr", role: "CRE", campus: "ESGI PARIS" },

  { nom: "BOUTREAU Cédric", email: "cboutreau@skolae.fr", role: "RRE", campus: "ESIS PARIS ET ISA PARIS" },
  { nom: "MENEGAZZI Antoine", email: "amenegazzi@skolae.fr", role: "CRE", campus: "ESIS PARIS" },
  { nom: "GOIDEN Yuvarassen", email: "ygoinden5@skolae.fr", role: "CRE", campus: "ESIS PARIS" },

  { nom: "DIDIER Patricia", email: "pdidier@cfpj.com", role: "RRE", campus: "CFPJ PARIS ET ECOLE W PARIS" },
  { nom: "GUEST Marie", email: "mguest@reseau-ges.fr", role: "RRE", campus: "ISFJ PARIS" },
  { nom: "MOSCATELLI Laura", email: "lmoscatelli@skolae.fr", role: "CRE", campus: "ISFJ PARIS" },
  { nom: "FREDERIC Alexandre", email: "afrederic2@reseau-ges.fr", role: "CRE", campus: "ISFJ PARIS" },
  { nom: "EL BAZ Sarah", email: "selbaz17@skolae.fr", role: "CRE", campus: "ISFJ PARIS" },

  { nom: "BAKKI Nora", email: "nbakki@engde.fr", role: "RRE", campus: "ENGDE ET EFAB PARIS" },
  { nom: "KABOUCHE Nawfel", email: "nkabouche2@reseau-ges.fr", role: "CRE", campus: "ENGDE ET EFAB PARIS" },
  { nom: "QUIFOUMA Argan", email: "aquifouma1@skolae.fr", role: "CRE", campus: "ENGDE ET EFAB PARIS" },
  { nom: "GOBLE Urielle", email: "ugoble1@skolae.fr", role: "CRE", campus: "ENGDE ET EFAB PARIS" },

  { nom: "RODITI Mathieu", email: "mathieu.roditi@modart-paris.com", role: "CRE", campus: "MODART PARIS" },
  { nom: "TORELINO Yohanna", email: "yohanna.torelino@modart-paris.com", role: "CRE", campus: "MODART PARIS" },
  { nom: "GHENASSIA Julie", email: "julie.ghenassia@modart-paris.com", role: "CRE", campus: "MODART PARIS" },
  { nom: "CHIMBI Sofia", email: "schimbi@skolae.fr", role: "CRE", campus: "MODART PARIS" },

  { nom: "JONQUAIS Alexandre", email: "ajonquais@ppa.fr", role: "DRE", campus: "PPA PARIS" },
  { nom: "BONORON Sarah", email: "sbonoron@ppa.fr", role: "RRE", campus: "PPA PARIS" },
  { nom: "MBANGA PAMBE Pierre Enzo", email: "pmbangapambe@skolae.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "NDOH MINKO Michel", email: "mndohminko@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "BURRY Victoria", email: "vburry@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "MILOUD Ines", email: "imiloud@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "KERVELLA Camille", email: "ckervella@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "PIERNO Naomie", email: "npierno@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "FASSOULI Lina", email: "lfassouli@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "BRUNEAU Océane", email: "obruneau@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "CHAUVET Audrey", email: "achauvet@ppa.fr", role: "RRE", campus: "PPA PARIS" },
  { nom: "BASSIL Jeremy", email: "jbassil@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "TEVARAYAR Helene", email: "htevarayar@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "SAGOVA Yasmina", email: "ysagova@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "ARES Cedric", email: "cares@ppa.fr", role: "RRE", campus: "PPA PARIS" },
  { nom: "JUSSY Romane", email: "rjussy@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "DE PILLOT Josserand", email: "jdepillot@ppa.fr", role: "CRE", campus: "PPA PARIS" },
  { nom: "BOUALI Rayane", email: "rbouali@ppa.fr", role: "CRE", campus: "PPA PARIS" },

  { nom: "GUILLOT Manon", email: "mguillot13@skolae.fr", role: "RRE", campus: "ECITV ET ESUPCOM PARIS" },
  { nom: "REINIE Océane", email: "oreinie@skolae.fr", role: "CRE", campus: "ICAN PARIS" },
  { nom: "PREAP Keossey", email: "kpreap@skolae.fr", role: "CRE", campus: "ICAN PARIS" },
  { nom: "BERNIER Edgar", email: "ebernier6@reseau-ges.fr", role: "CRE", campus: "ECITV PARIS" },
  { nom: "GOUAICHAULT Maeline", email: "mgouaichault@skolae.fr", role: "CRE", campus: "ECITV PARIS" },
  { nom: "ROUSSELLE Virginie", email: "vrousselle1@eductive-paris.fr", role: "CRE", campus: "IDRI PARIS" },

  { nom: "PIGACHE Amandine", email: "apigache@skolae.fr", role: "CRE", campus: "SKOLAE ROUEN ET LE HAVRE" },
  { nom: "EKO VIEIRA Emmanuel", email: "eekovieira1@skolae.fr", role: "CRE", campus: "SKOLAE ROUEN ET LE HAVRE" },
  { nom: "RIFFLART Cassandra", email: "crifflart01@skolae.fr", role: "CRE", campus: "SKOLAE ROUEN ET LE HAVRE" },
  { nom: "CHOUAY Mohamed", email: "mchouay@skolae.fr", role: "CRE", campus: "SKOLAE NICE" },
  { nom: "CALLAIS Caroline", email: "ccallais@skolae-montpellier.fr", role: "CRE", campus: "SKOLAE MONTPELLIER" },

  { nom: "FOURRIER Chloe", email: "cfourrier@skolae.fr", role: "DIRECTION CO", campus: "DIRECTION COMMERCIALE" },
  { nom: "MEYER Gaelle", email: "gmeyer@skolae.fr", role: "DIRECTION CO", campus: "DIRECTION COMMERCIALE" },
  { nom: "GASQUET Marie", email: "mgasquet@skolae.fr", role: "DIRECTION CO", campus: "DIRECTION COMMERCIALE" },
  { nom: "CORCELLE Xavier", email: "xcorcelle1@skolae.fr", role: "DIRECTION CO", campus: "DIRECTION COMMERCIALE" },
  { nom: "NAUDE Antony", email: "anaude4@skolae.fr", role: "DIRECTION CO", campus: "DIRECTION COMMERCIALE" },
  { nom: "OUDOMPHONG Arthur", email: "aoudomphong1@skolae.fr", role: "DIRECTION CO", campus: "DIRECTION COMMERCIALE" },
];

export function trouverAcces(email: string) {
  return accesInternes.find(
    (personne) => personne.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export function peutVoirTousLesCampus(role: RoleInterne) {
  return role === "DRE" || role === "DIRECTION CO";
}