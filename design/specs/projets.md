# Projets

- **Node id** : `2:2266` · **Type** : FRAME · **Taille** : 1440×1534 px
- **Fond** : #f9fafb
- **Capture** : [`../screens/projets.png`](../screens/projets.png)
- **Stats spec** : 271 nœuds, 97 textes, 26 instances, 144 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-dashboard.svg`, `../assets/icons/icon-folder.svg`, `../assets/icons/icon-users.svg`, `../assets/icons/logo-black.svg`, `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Placement (mesuré) : Menu y=0 ; `Frame 41` (titre + bouton, 1166×69, align end) x=137 y=170 ; `Frame 40` (grille 3×3 de `Card projet` 380×351, gaps 16) x=137 (contrainte CENTER) y=303 ; Footer y=1470 (le footer déborde de 4 px sous le frame de 1534 px).
- Le bloc de contenu est large de 1166 px (x=137) alors que Dashboard/Mon compte utilisent 1215 px à x=100 : grilles de page incohérentes.
- Onglet actif du menu = `Projets hover` (fond #0f0f0f).
- Footer `Footer` (composant `2:4400`, positionnement libre, fond #ffffff, 1440×68) : logo noir 101×12.86 à x=30, centré verticalement (y≈27.6) ; texte « Abricot 2025 » aligné à droite, bord droit à x≈1385 (≈55 px du bord), y≈24.5 (mesuré).

## Arbre

- **Projets** FRAME `2:2266` — 1440×1534 · positionnement libre (pas d'auto-layout) · fill #f9fafb
  - **Menu** INSTANCE ⟨Menu⟩ `2:2267` — 1440×94 · (= composant) — cf. composants.md `2:295`
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `I2:2267;2:197` → `logo-orange.svg` 147×18.72
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Dashboard⟩ `I2:2267;2:272` — 248×78 (= composant)
      - texte « Tableau de bord »
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Projets hover⟩ `I2:2267;2:280` — 248×76.49 — diffs : fill #0f0f0f · Property 1=Projets hover
      - texte « Projets »
    - **User icon** INSTANCE ⟨User icon · Property 1=Default⟩ `I2:2267;2:291` — 65×65 (= composant)
      - texte « AD »
  - **Frame 41** FRAME `2:2661` — 1166×69 · flex-row gap auto · pad 0 · justify space-between · align end (itemSpacing Figma 455 ignoré)
    - **Frame 11** FRAME `2:2305` — 530×69 · flex-col gap 14 · pad 0 · justify start · align start
      - TEXT « Mes projets » `2:2306` — 530×33 · Manrope SemiBold 24px · #1f1f1f
      - TEXT « Gérez vos projets  » `2:2307` — 530×22 · Inter Regular 18px · #000000
    - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:2317` — 181×50 · (= composant) — cf. composants.md `2:100`
      - texte « + Créer un projet »
  - **Frame 40** FRAME `2:2660` — 1166×1091 · grid 3 lignes × 3 colonnes · gap 16/16 (lignes/colonnes) · contraintes H=CENTER V=MIN
    - **9 × Card projet** (structure identique ; ids `2:2380`, `2:2412`, `2:2443`, `2:2474`, `2:2475`, `2:2476`, `2:2567`, `2:2568`, `2:2569`) — détail du 1er ci-dessous — **toutes identiques**
      - **Card projet** INSTANCE ⟨Card projet⟩ `2:2380` — 380×351 · (= composant) — cf. composants.md `2:2379`
        - texte « Nom du projet »
        - texte « Développement de la nouvelle version de l'API REST avec authentification JWT »
        - texte « Progression »
        - texte « 0% »
        - texte « 0/2 tâches terminées »
        - texte « Équipe (3) »
        - texte « AD »
        - **Tag** INSTANCE ⟨Tag · Property 1=brand⟩ `I2:2380;2:2364` — 109×25 (= composant)
          - texte « Propriétaire »
        - texte « BD »
        - texte « CV »
  - **Footer** INSTANCE ⟨Footer⟩ `2:4415` — 1440×68 · (= composant) — cf. composants.md `2:4400`
    - **Logo** INSTANCE ⟨Logo · Color=black⟩ `I2:4415;2:4387` → `logo-black.svg` 101×12.86
    - texte « Abricot 2025 »
