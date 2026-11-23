# Single projet

- **Node id** : `2:2662` · **Type** : FRAME · **Taille** : 1440×1852 px
- **Fond** : #f9fafb
- **Capture** : [`../screens/single-projet.png`](../screens/single-projet.png)
- **Stats spec** : 221 nœuds, 67 textes, 35 instances, 116 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-arrow-left.svg`, `../assets/icons/icon-calendar.svg`, `../assets/icons/icon-chevron-down.svg`, `../assets/icons/icon-chevron-up.svg`, `../assets/icons/icon-dashboard.svg`, `../assets/icons/icon-folder.svg`, `../assets/icons/icon-more.svg`, `../assets/icons/icon-search.svg`, `../assets/icons/icon-sparkle.svg`, `../assets/icons/icon-task-checkbox.svg`, `../assets/icons/logo-black.svg`, `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Placement (mesuré) : Menu y=0 ; `Frame 41` (bouton retour + titre, 761×69 mais contenu `Frame 42` 789 px qui déborde) x=44 y=172 ; `Frame 55` (boutons « Créer une tâche » + « IA ») x=1080 y=189 ; `Frame 58` (bandeau contributeurs #f3f4f6) x=112 y=290 ; `Frame 15` (liste des tâches) x=112 y=391 ; Footer y=1778 (6 px de fond visibles en dessous : footer non collé au bas du frame 1852).
- Marges incohérentes : bouton retour à x=44, contenu à x=112 (autres écrans : x=100), bord droit à 1327.
- Footer `Footer` (composant `2:4400`, positionnement libre, fond #ffffff, 1440×68) : logo noir 101×12.86 à x=30, centré verticalement (y≈27.6) ; texte « Abricot 2025 » aligné à droite, bord droit à x≈1385 (≈55 px du bord), y≈24.5 (mesuré).

## Arbre

- **Single projet** FRAME `2:2662` — 1440×1852 · positionnement libre (pas d'auto-layout) · fill #f9fafb
  - **Menu** INSTANCE ⟨Menu⟩ `2:2663` — 1440×94 · (= composant) — cf. composants.md `2:295`
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `I2:2663;2:197` → `logo-orange.svg` 147×18.72
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Dashboard⟩ `I2:2663;2:272` — 248×78 (= composant)
      - texte « Tableau de bord »
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Projets hover⟩ `I2:2663;2:280` — 248×76.49 — diffs : fill #0f0f0f · Property 1=Projets hover
      - texte « Projets »
    - **User icon** INSTANCE ⟨User icon · Property 1=Default⟩ `I2:2663;2:291` — 65×65 (= composant)
      - texte « AD »
  - **Frame 41** FRAME `2:2664` — 761×69 · flex-row gap auto · pad 0 · justify space-between · align end (itemSpacing Figma 455 ignoré)
    - **Frame 42** FRAME `2:2990` — 789×69 · flex-row gap 16 · pad 0 · justify start · align start
      - **Icon button** INSTANCE ⟨Icon button · Property 1=Back⟩ `2:2987` — 57×57 · (= composant) — cf. composants.md `2:2982`
      - **Frame 11** FRAME `2:2665` — 716×69 · flex-col gap 14 · pad 0 · justify start · align start
        - **Frame 56** FRAME `2:3500` — 231×33 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 14 ignoré)
          - TEXT « Nom du projet » `2:2666` — 162×33 · Manrope SemiBold 24px · #1f1f1f
          - **Link** INSTANCE ⟨Link · Property 1=Default⟩ `2:3497` — 55×17 · (= composant) — cf. composants.md `2:122`
            - texte « Modifier »
        - TEXT « Développement de la nouvelle version de l'API REST avec authentification JWT » `2:2667` — 716×22 · Inter Regular 18px · #6b7280
  - **Frame 15** FRAME `2:2991` — 1215×1289.15 · flex-col gap 41 · pad 40 59 40 59 · justify start · align start · fill #ffffff · stroke #e5e7eb · radius 10
    - **Frame 57** FRAME `2:3501` — 1097×63 · flex-col gap 24 · pad 0 · justify start · align start
      - **Frame 26** FRAME `2:2992` — 1097×63 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 41 ignoré)
        - **Frame 16** FRAME `2:2993` — 190×52 · flex-col gap 8 · pad 0 · justify start · align start
          - TEXT « Tâches » `2:2994` — 190×25 · Manrope SemiBold 18px · #1f1f1f
          - TEXT « Par ordre de priorité » `2:2995` — 190×19 · Inter Regular 16px · #6b7280
        - **Frame 58** FRAME `2:3565` — 701×63 · flex-row gap 16 · pad 0 · justify start · align center
          - **Frame 14** FRAME `2:3544` — 234×45 · flex-row gap 10 · pad 0 · justify start · align center
            - **Chips** INSTANCE ⟨Chips · Property 1=task focus⟩ `2:3545` — 94×45 · (= composant) — cf. composants.md `2:370`
              - Frame 13 `I2:3545;2:371` — diffs : 62×17
                - texte « Liste »
            - **Chips** INSTANCE ⟨Chips · Property 1=list⟩ `2:3546` — 130×45 · (= composant) — cf. composants.md `2:378`
              - Frame 13 `I2:3546;2:379` — diffs : 98×17
                - texte « Calendrier »
          - **Frame 26** FRAME `2:3847` — 152×63 · flex-row gap auto · pad 23 32 23 32 · justify space-between · align center (itemSpacing Figma 177 ignoré) · fill #ffffff · stroke #e5e7eb · radius 8
            - TEXT « Statut » `2:3848` — 41×17 · Inter Regular 14px · #6b7280
            - **Vector 1** VECTOR `2:3850` — icône 16×8 · stroke #6b7280 → `icon-chevron-down.svg`
          - **Frame 25** FRAME `2:2996` — 283×63 · flex-row gap auto · pad 23 32 23 32 · justify space-between · align center (itemSpacing Figma 177 ignoré) · fill #ffffff · stroke #e5e7eb · radius 8
            - TEXT « Rechercher une tâche » `2:2997` — 146×17 · Inter Regular 14px · #6b7280
            - **Vector** VECTOR `2:2998` — icône 13.9×13.9 · fill #6b7280 → `icon-search.svg`
    - **Frame 24** FRAME `2:2999` — 1097×1105.15 · flex-col gap 17 · pad 0 · justify end · align center
      - **4 × Tâche liste** (structure identique ; ids `2:3000`, `2:3713`, `2:3757`, `2:3801`) — détail du 1er ci-dessous
        - Valeurs qui varient :
          1. `2:3000` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
          2. `2:3713` : Tag : 90×25, fill #fff0d7, Property 1=orange ; texte : 58×17, Inter Regular 14px · #e08d00, « En cours »
          3. `2:3757` : Tag : 94×25, fill #f1fff7, Property 1=green ; texte : 62×17, Inter Regular 14px · #27ae60, « Terminée »
          4. `2:3801` : Tag : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
        - **Tâche liste** INSTANCE ⟨Tâche liste · Property 1=projet⟩ `2:3000` — 1017×263.54 · (= composant) — cf. composants.md `2:3323`
          - texte « Authentification JWT »
          - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `I2:3000;2:3420` — 75×25 (= composant)
            - texte « À faire »
          - texte « Implémenter le système d'authentification avec tokens JWT »
          - **Icon button** INSTANCE ⟨Icon button · Property 1=See more⟩ `I2:3000;2:3424` — 57×57 (= composant)
          - texte « Échéance : »
          - texte « 9 mars »
          - texte « Assigné à : »
          - texte « BD »
          - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `I2:3000;2:3348` — 143×25 (= composant)
            - texte « Bertrand Dupont »
          - texte « AD »
          - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `I2:3000;2:3352` — 119×25 (= composant)
            - texte « Anne Dupont »
          - Frame 52 `I2:3000;2:3354` — diffs : 937×17
            - texte « Commentaires (1) »
  - **Frame 58** FRAME `2:3902` — 1215×67 · flex-col gap 24 · pad 20 50 20 50 · justify start · align start · fill #f3f4f6 · radius 10
    - **Frame 26** FRAME `2:3903` — 1115×27 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 41 ignoré)
      - **Frame 16** FRAME `2:3904` — 190×25 · flex-row gap 8 · pad 0 · justify start · align center
        - TEXT « Contributeurs » `2:3905` — 122×25 · Manrope SemiBold 18px · #1f1f1f
        - TEXT « 3 personnes » `2:3906` — 94×19 · Inter Regular 16px · #6b7280
      - **Frame 60** FRAME `2:3980` — 481×27 · flex-row gap 8 · pad 0 · justify start · align start
        - **Frame 34** FRAME `2:3981` — 141×27 · flex-row gap 5 · pad 0 · justify start · align center
          - **User icon** FRAME `2:3982` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #ffe8d9 · radius 13.5
            - TEXT « AD » `2:3983` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
          - **Tag** INSTANCE ⟨Tag · Property 1=brand⟩ `2:3984` — 109×25 · (= composant) — cf. composants.md `2:468`
            - texte « Propriétaire »
        - **Frame 46** FRAME `2:3985` — 174×27 · flex-row gap 4 · pad 0 · justify start · align center
          - **User icon** FRAME `2:3986` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
            - TEXT « BD » `2:3987` — 14×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
          - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `2:3988` — 143×25 · (= composant) — cf. composants.md `2:470`
            - texte « Bertrand Dupont »
        - **Frame 47** FRAME `2:3989` — 150×27 · flex-row gap 4 · pad 0 · justify start · align center
          - **User icon** FRAME `2:3990` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
            - TEXT « AD » `2:3991` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
          - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `2:3992` — 119×25 · (= composant) — cf. composants.md `2:470`
            - texte « Anne Dupont »
  - **Frame 55** FRAME `2:3490` — 247×50 · flex-row gap 12 · pad 0 · justify start · align center
    - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:3474` — 141×50 · (= composant) — cf. composants.md `2:100`
      - texte « Créer une tâche »
    - **Button** FRAME `2:3486` — 94×50 · flex-row gap 10 · pad 13 74 13 74 · justify center · align center · fill #d3590b · radius 10
      - **Star 1** STAR `2:3488` — icône 21×21 · fill #ffffff → `icon-sparkle.svg`
      - TEXT « IA » `2:3487` — 16×19 · Inter Regular 16px · #ffffff
  - **Footer** INSTANCE ⟨Footer⟩ `2:4429` — 1440×68 · (= composant) — cf. composants.md `2:4400`
    - **Logo** INSTANCE ⟨Logo · Color=black⟩ `I2:4429;2:4387` → `logo-black.svg` 101×12.86
    - texte « Abricot 2025 »
