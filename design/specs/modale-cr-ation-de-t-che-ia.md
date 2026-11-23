# Modale création de tâche IA

- **Node id** : `2:4044` · **Type** : FRAME · **Taille** : 598×797 px
- **Fond** : #ffffff, radius 10
- **Capture** : [`../screens/modale-cr-ation-de-t-che-ia.png`](../screens/modale-cr-ation-de-t-che-ia.png)
- **Stats spec** : 15 nœuds, 2 textes, 1 instances, 8 frames auto-layout
- **Icônes utilisées** : `../assets/icons/ia-button.svg`, `../assets/icons/icon-close.svg`, `../assets/icons/icon-sparkle.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Icône fermer absolue x≈545 y≈37 (mesuré).
- `Frame 63` (494×460) est **vide** : zone de résultats réservée ; le champ de prompt (`Comment`, pilule radius 80, #f9fafb) est poussé en bas par la hauteur fixe. Racine : justify center.

## Arbre

- **Modale création de tâche IA** FRAME `2:4044` — 598×797 · flex-col gap 56 · pad 79 73 79 73 · justify center · align center · fill #ffffff · radius 10
  - **Frame 64** FRAME `2:4045` — 494×523 · flex-col gap 40 · pad 0 · justify start · align start
    - **Frame** FRAME `2:4087` — 494×33 · flex-row gap 8 · pad 0 · justify start · align center
      - **Star 1** STAR `2:4084` — icône 21×21 · fill #ff8b42 → `icon-sparkle.svg`
      - TEXT « Créer une tâche » `2:4046` — 185×33 · Manrope SemiBold 24px · #1f1f1f
    - **Frame 63** FRAME `2:4047` — 494×460 · flex-col gap 24 · pad 0 · justify start · align start
  - **Comment** FRAME `2:4095` — 494×60 · flex-row gap 14 · pad 0 · justify start · align center
    - **Frame 48** FRAME `2:4098` — 494×60 · flex-col gap 10 · pad 18 32 18 32 · justify start · align start · fill #f9fafb · radius 80
      - **Frame 65** FRAME `2:4120` — 430×24 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 10 ignoré)
        - **Frame 50** FRAME `2:4099` — 230×12 · flex-col gap 18 · pad 0 · justify start · align start
          - TEXT « Décrivez les tâches que vous souhaitez ajouter... » `2:4100` — 230×12 · Inter Regular 10px · #000000
        - **IA button** INSTANCE ⟨IA button · Property 1=Default⟩ `2:4116` — icône 24×24 → `ia-button.svg`
  - **Union** BOOLEAN_OPERATION `2:4362` — icône 14.33×14.33 · fill #6b7280 · position absolue → `icon-close.svg`
