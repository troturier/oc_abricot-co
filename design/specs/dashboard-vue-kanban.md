# Dashboard vue Kanban

- **Node id** : `24:1052` · **Type** : FRAME · **Taille** : 1440×1744 px
- **Fond** : #f9fafb
- **Capture** : [`../screens/dashboard-vue-kanban.png`](../screens/dashboard-vue-kanban.png)
- **Stats spec** : 334 nœuds, 99 textes, 49 instances, 157 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-calendar.svg`, `../assets/icons/icon-comment.svg`, `../assets/icons/icon-dashboard.svg`, `../assets/icons/icon-folder-sm.svg`, `../assets/icons/icon-folder.svg`, `../assets/icons/icon-task-checkbox.svg`, `../assets/icons/logo-black.svg`, `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Placement (mesuré) : Menu x=0 y=0 ; `Frame 11` x=100 y≈184 ; Button x=1134 y=198 ; `Frame 14` (chips) x=105 y=312 ; `Frame 70` (3 colonnes) x≈69.5 (contrainte CENTER) y=408 ; Footer y=1676.
- Colonnes Kanban : 3 × 419×1112, gap 22, centrées. Titres « À faire / En cours / Terminées » + compteur.
- Footer `Footer` (composant `2:4400`, positionnement libre, fond #ffffff, 1440×68) : logo noir 101×12.86 à x=30, centré verticalement (y≈27.6) ; texte « Abricot 2025 » aligné à droite, bord droit à x≈1385 (≈55 px du bord), y≈24.5 (mesuré).

## Arbre

- **Dashboard vue Kanban** FRAME `24:1052` — 1440×1744 · positionnement libre (pas d'auto-layout) · fill #f9fafb
  - **Menu** INSTANCE ⟨Menu⟩ `24:1053` — 1440×94 · (= composant) — cf. composants.md `2:295`
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `I24:1053;2:197` → `logo-orange.svg` 147×18.72
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Dashboard hover⟩ `I24:1053;2:272` — 248×78 — diffs : fill #0f0f0f · Property 1=Dashboard hover
      - texte « Tableau de bord »
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Projets⟩ `I24:1053;2:280` — 248×76.49 (= composant)
      - texte « Projets »
    - **User icon** INSTANCE ⟨User icon · Property 1=Default⟩ `I24:1053;2:291` — 65×65 (= composant)
      - texte « AD »
  - **Frame 11** FRAME `24:1054` — 530×69 · flex-col gap 14 · pad 0 · justify start · align start
    - TEXT « Tableau de bord » `24:1055` — 530×33 · Manrope SemiBold 24px · #1f1f1f
    - TEXT « Bonjour Alice Dupont, voici un aperçu de vos projets et tâches » `24:1056` — 530×22 · Inter Regular 18px · #000000
  - **Frame 14** FRAME `24:1057` — 215×45 · flex-row gap 10 · pad 0 · justify start · align center
    - **Chips** INSTANCE ⟨Chips · Property 1=task hover⟩ `24:1058` — 94×45 · (= composant) — cf. composants.md `2:368`
      - Frame 13 `I24:1058;2:367` — diffs : 62×17
        - texte « Liste »
    - **Chips** INSTANCE ⟨Chips · Property 1=list focus⟩ `24:1059` — 111×45 · (= composant) — cf. composants.md `2:414`
      - texte « Kanban »
  - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `24:1075` — 181×50 · (= composant) — cf. composants.md `2:100`
    - texte « + Créer un projet »
  - **Footer** INSTANCE ⟨Footer⟩ `24:1076` — 1440×68 · (= composant) — cf. composants.md `2:4400`
    - **Logo** INSTANCE ⟨Logo · Color=black⟩ `I24:1076;2:4387` → `logo-black.svg` 101×12.86
    - texte « Abricot 2025 »
  - **Frame 70** FRAME `24:1789` — 1301×1112.15 · flex-row gap 22 · pad 0 · justify center · align center · contraintes H=CENTER V=MIN
    - **Frame 15** FRAME `24:1060` — 419×1112.15 · flex-col gap 41 · pad 40 24 40 24 · justify start · align start · fill #ffffff · stroke #ffe0e0 · radius 10
      - **Frame 16** FRAME `24:1062` — 104×25 · flex-row gap 8 · pad 0 · justify start · align start
        - TEXT « À faire » `24:1063` — 55×25 · Manrope SemiBold 18px · #1f1f1f
        - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `24:1518` — 41×25 · (= composant) — cf. composants.md `2:470`
          - texte « 4 »
      - **Frame 69** FRAME `24:1513` — 371×966.15 · flex-col gap 16 · pad 0 · justify start · align start
        - **4 × Tâche liste** (structure identique ; ids `24:1380`, `24:1417`, `24:1449`, `24:1481`) — détail du 1er ci-dessous — **toutes identiques**
          - **Tâche liste** INSTANCE ⟨Tâche liste · Property 1=Tâche Kanban⟩ `24:1380` — 371×229.54 · (= composant) — cf. composants.md `24:1348`
            - texte « Nom de la tâche »
            - texte « Description de la tâche »
            - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `I24:1380;24:1375` — 75×25 (= composant)
              - texte « À faire »
            - texte « Nom du projet »
            - texte « 9 mars »
            - texte « 2 »
            - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `I24:1380;24:1376` — 121×50 (= composant)
              - texte « Voir »
    - **Frame 16** FRAME `24:1521` — 419×1112.15 · flex-col gap 41 · pad 40 24 40 24 · justify start · align start · fill #ffffff · stroke #ffe0e0 · radius 10
      - **Frame 16** FRAME `24:1522` — 123×25 · flex-row gap 8 · pad 0 · justify start · align start
        - TEXT « En cours » `24:1523` — 74×25 · Manrope SemiBold 18px · #1f1f1f
        - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `24:1524` — 41×25 · (= composant) — cf. composants.md `2:470`
          - texte « 4 »
      - **Frame 69** FRAME `24:1525` — 371×966.15 · flex-col gap 16 · pad 0 · justify start · align start
        - **4 × Tâche liste** (structure identique ; ids `24:1526`, `24:1527`, `24:1528`, `24:1529`) — détail du 1er ci-dessous — **toutes identiques**
          - **Tâche liste** INSTANCE ⟨Tâche liste · Property 1=Tâche Kanban⟩ `24:1526` — 371×229.54 · (= composant) — cf. composants.md `24:1348`
            - texte « Nom de la tâche »
            - texte « Description de la tâche »
            - **Tag** INSTANCE ⟨Tag · Property 1=orange⟩ `I24:1526;24:1375` — 90×25 — diffs : 90×25 · fill #fff0d7 · Property 1=orange
              - texte « En cours »
            - texte « Nom du projet »
            - texte « 9 mars »
            - texte « 2 »
            - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `I24:1526;24:1376` — 121×50 (= composant)
              - texte « Voir »
    - **Frame 17** FRAME `24:1655` — 419×1112.15 · flex-col gap 41 · pad 40 24 40 24 · justify start · align start · fill #ffffff · stroke #ffe0e0 · radius 10
      - **Frame 16** FRAME `24:1656` — 139×25 · flex-row gap 8 · pad 0 · justify start · align start
        - TEXT « Terminées » `24:1657` — 90×25 · Manrope SemiBold 18px · #1f1f1f
        - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `24:1658` — 41×25 · (= composant) — cf. composants.md `2:470`
          - texte « 4 »
      - **Frame 69** FRAME `24:1659` — 371×966.15 · flex-col gap 16 · pad 0 · justify start · align start
        - **4 × Tâche liste** (structure identique ; ids `24:1660`, `24:1661`, `24:1662`, `24:1663`) — détail du 1er ci-dessous — **toutes identiques**
          - **Tâche liste** INSTANCE ⟨Tâche liste · Property 1=Tâche Kanban⟩ `24:1660` — 371×229.54 · (= composant) — cf. composants.md `24:1348`
            - texte « Nom de la tâche »
            - texte « Description de la tâche »
            - **Tag** INSTANCE ⟨Tag · Property 1=green⟩ `I24:1660;24:1375` — 94×25 — diffs : 94×25 · fill #f1fff7 · Property 1=green
              - texte « Terminée »
            - texte « Nom du projet »
            - texte « 9 mars »
            - texte « 2 »
            - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `I24:1660;24:1376` — 121×50 (= composant)
              - texte « Voir »
