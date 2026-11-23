# Modale liste de tâche IA

- **Node id** : `2:4121` · **Type** : FRAME · **Taille** : 598×859 px
- **Fond** : #ffffff, radius 10
- **Capture** : [`../screens/modale-liste-de-t-che-ia.png`](../screens/modale-liste-de-t-che-ia.png)
- **Stats spec** : 65 nœuds, 15 textes, 5 instances, 29 frames auto-layout
- **Icônes utilisées** : `../assets/icons/ia-button.svg`, `../assets/icons/icon-close.svg`, `../assets/icons/icon-edit.svg`, `../assets/icons/icon-sparkle.svg`, `../assets/icons/icon-trash.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Icône fermer absolue x≈545 y≈37 (mesuré).
- `Frame 67` et `Line 5` font 600 px de large dans une modale de 598 px dont la zone utile fait 452 px (pad 73) : débordement dans la maquette (le trait sort de la zone de contenu).
- Les cartes `Tâche IA` sont dans une zone de 494 px (> 452 px utiles) : débordement de 42 px.

## Arbre

- **Modale liste de tâche IA** FRAME `2:4121` — 598×859 · flex-col gap 60 · pad 79 73 39 73 · justify center · align center · fill #ffffff · radius 10
  - **Frame 64** FRAME `2:4122` — 494×523 · flex-col gap 40 · pad 0 · justify start · align start
    - **Frame** FRAME `2:4123` — 494×33 · flex-row gap 8 · pad 0 · justify start · align center
      - **Star 1** STAR `2:4124` — icône 21×21 · fill #ff8b42 → `icon-sparkle.svg`
      - TEXT « Vos tâches... » `2:4125` — 146×33 · Manrope SemiBold 24px · #1f1f1f
    - **Frame 63** FRAME `2:4126` — 494×486 · flex-col gap 24 · pad 0 · justify start · align start
      - **3 × Tâche liste** (structure identique ; ids `2:4193`, `2:4211`, `2:4228`) — détail du 1er ci-dessous — **toutes identiques**
        - **Tâche liste** INSTANCE ⟨Tâche liste · Property 1=Tâche IA⟩ `2:4193` — 494×146 · (= composant) — cf. composants.md `2:4135`
          - texte « Nom de la tâche »
          - texte « Description de la tâche »
          - texte « Supprimer »
          - texte « Modifier »
  - **Frame 67** FRAME `2:4252` — 600×158 · flex-col gap 24 · pad 0 · justify start · align center
    - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:4249` — 181×50 · (= composant) — cf. composants.md `2:100`
      - texte « + Ajouter les tâches »
    - **Frame 66** FRAME `2:4248` — 600×84 · flex-col gap 24 · pad 0 · justify start · align center
      - **Line 5** LINE `2:4246` — 600×0 · stroke #e5e7eb
      - **Comment** FRAME `2:4127` — 494×60 · flex-row gap 14 · pad 0 · justify start · align center
        - **Frame 48** FRAME `2:4128` — 494×60 · flex-col gap 10 · pad 18 32 18 32 · justify start · align start · fill #f9fafb · radius 80
          - **Frame 65** FRAME `2:4129` — 430×24 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 10 ignoré)
            - **Frame 50** FRAME `2:4130` — 230×12 · flex-col gap 18 · pad 0 · justify start · align start
              - TEXT « Décrivez les tâches que vous souhaitez ajouter... » `2:4131` — 230×12 · Inter Regular 10px · #000000
            - **IA button** INSTANCE ⟨IA button · Property 1=Default⟩ `2:4132` — icône 24×24 → `ia-button.svg`
  - **Union** BOOLEAN_OPERATION `2:4370` — icône 14.33×14.33 · fill #6b7280 · position absolue → `icon-close.svg`
