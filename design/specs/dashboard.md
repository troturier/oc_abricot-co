# Dashboard

- **Node id** : `2:195` · **Type** : FRAME · **Taille** : 1440×1744 px
- **Fond** : #f9fafb
- **Capture** : [`../screens/dashboard.png`](../screens/dashboard.png)
- **Stats spec** : 180 nœuds, 54 textes, 28 instances, 77 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-calendar.svg`, `../assets/icons/icon-comment.svg`, `../assets/icons/icon-dashboard.svg`, `../assets/icons/icon-folder-sm.svg`, `../assets/icons/icon-folder.svg`, `../assets/icons/icon-search.svg`, `../assets/icons/icon-task-checkbox.svg`, `../assets/icons/logo-black.svg`, `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Placement des enfants du frame racine (positionnement libre, mesuré sur PNG) : Menu x=0 y=0 ; `Frame 11` (titre) x=100 y≈184 ; Button « + Créer un projet » x=1134 y=198 ; `Frame 14` (chips) x≈100–105 y=312 ; `Frame 15` (carte blanche) x=100 y=387 ; Footer x=0 y=1676 (= H−68).
- Menu : ombre portée (type `shadow`, paramètres non fournis ; mesuré : dégradé très léger sur ~10 px sous le menu, ~#000 à 3–4 %).
- Onglet actif du menu = variante `Dashboard hover` (fond #0f0f0f, texte/icône blancs).
- Footer `Footer` (composant `2:4400`, positionnement libre, fond #ffffff, 1440×68) : logo noir 101×12.86 à x=30, centré verticalement (y≈27.6) ; texte « Abricot 2025 » aligné à droite, bord droit à x≈1385 (≈55 px du bord), y≈24.5 (mesuré).

## Arbre

- **Dashboard** FRAME `2:195` — 1440×1744 · positionnement libre (pas d'auto-layout) · fill #f9fafb
  - **Menu** INSTANCE ⟨Menu⟩ `2:296` — 1440×94 · (= composant) — cf. composants.md `2:295`
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `I2:296;2:197` → `logo-orange.svg` 147×18.72
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Dashboard hover⟩ `I2:296;2:272` — 248×78 — diffs : fill #0f0f0f · Property 1=Dashboard hover
      - texte « Tableau de bord »
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Projets⟩ `I2:296;2:280` — 248×76.49 (= composant)
      - texte « Projets »
    - **User icon** INSTANCE ⟨User icon · Property 1=Default⟩ `I2:296;2:291` — 65×65 (= composant)
      - texte « AD »
  - **Frame 11** FRAME `2:327` — 530×69 · flex-col gap 14 · pad 0 · justify start · align start
    - TEXT « Tableau de bord » `2:325` — 530×33 · Manrope SemiBold 24px · #1f1f1f
    - TEXT « Bonjour Alice Dupont, voici un aperçu de vos projets et tâches » `2:326` — 530×22 · Inter Regular 18px · #000000
  - **Frame 14** FRAME `2:501` — 215×45 · flex-row gap 10 · pad 0 · justify start · align center
    - **Chips** INSTANCE ⟨Chips · Property 1=task focus⟩ `2:472` — 94×45 · (= composant) — cf. composants.md `2:370`
      - Frame 13 `I2:472;2:371` — diffs : 62×17
        - texte « Liste »
    - **Chips** INSTANCE ⟨Chips · Property 1=list⟩ `2:473` — 111×45 · (= composant) — cf. composants.md `2:378`
      - texte « Kanban »
  - **Frame 15** FRAME `2:509` — 1215×1241 · flex-col gap 41 · pad 40 59 40 59 · justify start · align start · fill #ffffff · stroke #e5e7eb · radius 10
    - **Frame 26** FRAME `2:2316` — 1097×63 · flex-row gap auto · pad 0 · justify space-between · align start (itemSpacing Figma 41 ignoré)
      - **Frame 16** FRAME `2:604` — 190×52 · flex-col gap 8 · pad 0 · justify start · align start
        - TEXT « Mes tâches assignées » `2:605` — 190×25 · Manrope SemiBold 18px · #1f1f1f
        - TEXT « Par ordre de priorité » `2:606` — 190×19 · Inter Regular 16px · #6b7280
      - **Frame 25** FRAME `2:2309` — 357×63 · flex-row gap auto · pad 23 32 23 32 · justify space-between · align center (itemSpacing Figma 177 ignoré) · fill #ffffff · stroke #e5e7eb · radius 8
        - TEXT « Rechercher une tâche » `2:2310` — 146×17 · Inter Regular 14px · #6b7280
        - **Vector** VECTOR `2:2314` — icône 13.9×13.9 · fill #6b7280 → `icon-search.svg`
    - **Frame 24** FRAME `2:663` — 1097×1057 · flex-col gap 17 · pad 0 · justify end · align center
      - **6 × Tâche liste** (structure identique ; ids `2:828`, `2:856`, `2:883`, `2:910`, `2:937`, `2:964`) — détail du 1er ci-dessous
        - Valeurs qui varient :
          1. `2:828` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
          2. `2:856` : Tag : 90×25, fill #fff0d7, Property 1=orange ; texte : 58×17, Inter Regular 14px · #e08d00, « En cours »
          3. `2:883` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
          4. `2:910` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
          5. `2:937` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
          6. `2:964` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
        - **Tâche liste** INSTANCE ⟨Tâche liste · Property 1=thumbnail⟩ `2:828` — 1097×162 · (= composant) — cf. composants.md `2:548`
          - texte « Nom de la tâche »
          - texte « Description de la tâche »
          - texte « Nom du projet »
          - texte « 9 mars »
          - texte « 2 »
          - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `I2:828;2:516` — 75×25 (= composant)
            - texte « À faire »
          - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `I2:828;2:544` — 121×50 (= composant)
            - texte « Voir »
  - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:2263` — 181×50 · (= composant) — cf. composants.md `2:100`
    - texte « + Créer un projet »
  - **Footer** INSTANCE ⟨Footer⟩ `2:4401` — 1440×68 · (= composant) — cf. composants.md `2:4400`
    - **Logo** INSTANCE ⟨Logo · Color=black⟩ `I2:4401;2:4387` → `logo-black.svg` 101×12.86
    - texte « Abricot 2025 »
