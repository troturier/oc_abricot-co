# Modale modifier projet

- **Node id** : `2:4334` · **Type** : FRAME · **Taille** : 598×616 px
- **Fond** : #ffffff, radius 10
- **Capture** : [`../screens/modale-modifier-projet.png`](../screens/modale-modifier-projet.png)
- **Stats spec** : 20 nœuds, 8 textes, 4 instances, 10 frames auto-layout
- **Icônes utilisées** : `../assets/icons/icon-chevron-down.svg`, `../assets/icons/icon-close.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Icône fermer absolue x≈545 y≈37 (mesuré).
- Valeurs de champ laissées au texte générique « Input » (maquette non renseignée).

## Arbre

- **Modale modifier projet** FRAME `2:4334` — 598×616 · flex-col gap 56 · pad 79 73 79 73 · justify start · align start · fill #ffffff · radius 10
  - **Frame 64** FRAME `2:4335` — 452×352 · flex-col gap 40 · pad 0 · justify start · align start
    - TEXT « Modifier un projet » `2:4336` — 452×33 · Manrope SemiBold 24px · #1f1f1f
    - **Frame 63** FRAME `2:4337` — 452×279 · flex-col gap 24 · pad 0 · justify start · align start
      - **2 × Input** (structure identique ; ids `2:4338`, `2:4339`) — détail du 1er ci-dessous
        - Valeurs qui varient :
          1. `2:4338` : texte : « Titre* »
          2. `2:4339` : texte : « Description* »
        - **Input** INSTANCE ⟨Input · Show Input=True, Property 1=Default⟩ `2:4338` — 452×77 · (= composant) — cf. composants.md `2:86`
          - texte « Titre* »
          - Frame 2 `I2:4338;2:83` — diffs : 452×53
            - texte « Input » — diffs : 29×15 · Inter Regular 12px · #6b7280
      - **Input** INSTANCE ⟨Input · Show Input=True, Property 1=Combo box⟩ `2:4340` — 452×77 · (= composant) — cf. composants.md `2:4001`
        - texte « Contributeurs »
        - Frame 2 `I2:4340;2:4003` — diffs : 452×53
          - texte « 2 collaborateurs » — diffs : 221×15 · Inter Regular 12px · #6b7280
  - **Button** INSTANCE ⟨Button · Property 1=disabled⟩ `2:4341` — 181×50 · (= composant) — cf. composants.md `2:105`
    - texte « Enregistrer »
  - **Union** BOOLEAN_OPERATION `2:4382` — icône 14.33×14.33 · fill #6b7280 · position absolue → `icon-close.svg`
