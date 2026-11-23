# Mon compte

- **Node id** : `2:4443` · **Type** : FRAME · **Taille** : 1440×1044 px
- **Fond** : #f9fafb
- **Capture** : [`../screens/mon-compte.png`](../screens/mon-compte.png)
- **Stats spec** : 46 nœuds, 15 textes, 12 instances, 19 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-dashboard.svg`, `../assets/icons/icon-folder.svg`, `../assets/icons/logo-black.svg`, `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Placement (mesuré) : Menu y=0 ; `Frame 15` (carte blanche 1215×644) x=100 y=151 ; Footer y=976 (= H−68).
- Avatar du menu en variante `focus` (fond #d3590b, initiales blanches) = page compte active ; aucun onglet de navigation actif.
- Champ « Mot de passe » affiché en clair sous forme de puces « ●●●●●●●●●●● » (texte), à rendre en `type=password`.
- Footer `Footer` (composant `2:4400`, positionnement libre, fond #ffffff, 1440×68) : logo noir 101×12.86 à x=30, centré verticalement (y≈27.6) ; texte « Abricot 2025 » aligné à droite, bord droit à x≈1385 (≈55 px du bord), y≈24.5 (mesuré).

## Arbre

- **Mon compte** FRAME `2:4443` — 1440×1044 · positionnement libre (pas d'auto-layout) · fill #f9fafb
  - **Menu** INSTANCE ⟨Menu⟩ `2:4444` — 1440×94 · (= composant) — cf. composants.md `2:295`
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `I2:4444;2:197` → `logo-orange.svg` 147×18.72
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Dashboard⟩ `I2:4444;2:272` — 248×78 (= composant)
      - texte « Tableau de bord »
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Projets⟩ `I2:4444;2:280` — 248×76.49 (= composant)
      - texte « Projets »
    - **User icon** INSTANCE ⟨User icon · Property 1=focus⟩ `I2:4444;2:291` — 65×65 — diffs : fill #d3590b · Property 1=focus
      - texte « AD »
  - **Frame 15** FRAME `2:4479` — 1215×644 · flex-col gap 41 · pad 40 59 40 59 · justify start · align start · fill #ffffff · stroke #e5e7eb · radius 10
    - **Frame 26** FRAME `2:4480` — 1097×52 · flex-row gap 41 · pad 0 · justify start · align start
      - **Frame 16** FRAME `2:4481` — 190×52 · flex-col gap 8 · pad 0 · justify start · align start
        - TEXT « Mon compte » `2:4482` — 190×25 · Manrope SemiBold 18px · #1f1f1f
        - TEXT « Amélie Dupont » `2:4483` — 190×19 · Inter Regular 16px · #6b7280
    - **Frame 64** FRAME `2:4675` — 1097×380 · flex-col gap 40 · pad 0 · justify start · align start
      - **Frame 63** FRAME `2:4677` — 1097×380 · flex-col gap 24 · pad 0 · justify start · align start
        - **4 × Input** (structure identique ; ids `2:4678`, `24:1413`, `2:4692`, `2:4696`) — détail du 1er ci-dessous
          - Valeurs qui varient :
            1. `2:4678` : texte : « Nom » ; texte : 39×15, « Amélie »
            2. `24:1413` : texte : « Prénom » ; texte : 39×15, « Amélie »
            3. `2:4692` : texte : « Email » ; texte : 113×15, « a.dupont@mail.com »
            4. `2:4696` : texte : « Mot de passe » ; texte : 121×15, « ●●●●●●●●●●● »
          - **Input** INSTANCE ⟨Input · Show Input=True, Property 1=Default⟩ `2:4678` — 1097×77 · (= composant) — cf. composants.md `2:86`
            - texte « Nom »
            - Frame 2 `I2:4678;2:83` — diffs : 1097×53
              - texte « Amélie » — diffs : 39×15 · Inter Regular 12px · #6b7280
    - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:4700` — 242×50 · (= composant) — cf. composants.md `2:100`
      - texte « Modifier les informations »
  - **Footer** INSTANCE ⟨Footer⟩ `2:4703` — 1440×68 · (= composant) — cf. composants.md `2:4400`
    - **Logo** INSTANCE ⟨Logo · Color=black⟩ `I2:4703;2:4387` → `logo-black.svg` 101×12.86
    - texte « Abricot 2025 »
