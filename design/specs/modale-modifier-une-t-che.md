# Modale modifier une tâche

- **Node id** : `2:4254` · **Type** : FRAME · **Taille** : 598×799 px
- **Fond** : #ffffff, radius 10
- **Capture** : [`../screens/modale-modifier-une-t-che.png`](../screens/modale-modifier-une-t-che.png)
- **Stats spec** : 34 nœuds, 14 textes, 8 instances, 17 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-calendar.svg`, `../assets/icons/icon-chevron-down.svg`, `../assets/icons/icon-close.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Icône fermer absolue x≈545 y≈37 (mesuré).
- Champs pré-remplis (`Show Input=true`), libellés sans astérisque (contrairement à la création). Bouton « Enregistrer » en état `disabled` (à activer quand le formulaire est modifié — comportement implicite).

## Arbre

- **Modale modifier une tâche** FRAME `2:4254` — 598×799 · flex-col gap 56 · pad 79 73 79 73 · justify start · align start · fill #ffffff · radius 10
  - **Frame 64** FRAME `2:4255` — 452×535 · flex-col gap 40 · pad 0 · justify start · align start
    - TEXT « Modifier » `2:4256` — 452×33 · Manrope SemiBold 24px · #1f1f1f
    - **Frame 63** FRAME `2:4257` — 452×462 · flex-col gap 24 · pad 0 · justify start · align start
      - **2 × Input** (structure identique ; ids `2:4258`, `2:4259`) — détail du 1er ci-dessous
        - Valeurs qui varient :
          1. `2:4258` : texte : « Titre » ; texte : 119×15, « Authentification JWT »
          2. `2:4259` : texte : « Description » ; texte : 338×15, « Implémenter le système d'authentification avec tokens JWT »
        - **Input** INSTANCE ⟨Input · Show Input=True, Property 1=Default⟩ `2:4258` — 452×77 · (= composant) — cf. composants.md `2:86`
          - texte « Titre »
          - Frame 2 `I2:4258;2:83` — diffs : 452×53
            - texte « Authentification JWT » — diffs : 119×15 · Inter Regular 12px · #6b7280
      - **Input** INSTANCE ⟨Input · Show Input=True, Property 1=date picker⟩ `2:4260` — 452×77 · (= composant) — cf. composants.md `2:3869`
        - texte « Échéance »
        - Frame 2 `I2:4260;2:3871` — diffs : 452×53
          - texte « 9 mars » — diffs : 221×15 · Inter Regular 12px · #6b7280
      - **Input** INSTANCE ⟨Input · Show Input=True, Property 1=Combo box⟩ `2:4261` — 452×77 · (= composant) — cf. composants.md `2:4001`
        - texte « Assigné à : »
        - Frame 2 `I2:4261;2:4003` — diffs : 452×53
          - texte « 2 collaborateurs » — diffs : 221×15 · Inter Regular 12px · #6b7280
      - **Frame 62** FRAME `2:4262` — 452×58 · flex-col gap 16 · pad 0 · justify start · align start
        - TEXT « Statut : » `2:4263` — 452×17 · Inter Regular 14px · #000000
        - **Frame 61** FRAME `2:4264` — 275×25 · flex-row gap 8 · pad 0 · justify start · align center
          - **3 × Tag** (structure identique ; ids `2:4265`, `2:4266`, `2:4267`) — détail du 1er ci-dessous
            - Valeurs qui varient :
              1. `2:4265` : (racine) : 75×25, fill #ffe0e0, Property 1=red ; texte : 43×17, Inter Regular 14px · #ef4444, « À faire »
              2. `2:4266` : (racine) : 90×25, fill #fff0d7, Property 1=orange ; texte : 58×17, Inter Regular 14px · #e08d00, « En cours »
              3. `2:4267` : (racine) : 94×25, fill #f1fff7, Property 1=green ; texte : 62×17, Inter Regular 14px · #27ae60, « Terminée »
            - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `2:4265` — 75×25 · (= composant) — cf. composants.md `2:462`
              - texte « À faire »
  - **Button** INSTANCE ⟨Button · Property 1=disabled⟩ `2:4268` — 244×50 · (= composant) — cf. composants.md `2:105`
    - texte « Enregistrer »
  - **Union** BOOLEAN_OPERATION `2:4374` — icône 14.33×14.33 · fill #6b7280 · position absolue → `icon-close.svg`
