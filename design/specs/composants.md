# Composants (bibliothèque Figma)

- **Node id** : `2:4717` · **Type** : SECTION · **Taille** : 3519×3168 px · fond de section #c4c4c4 (fond de présentation Figma, pas un token)
- **Capture** : [`../screens/composants.png`](../screens/composants.png)
- Les bordures pointillées violettes #9747ff sur la capture sont l'habillage Figma des COMPONENT_SET (pas des styles à intégrer).
- Aucune variable Figma ; `styleRefs` présents mais non résolus par le pont : valeurs brutes ci-dessous = source de vérité.


> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma. `gap auto` = SPACE_BETWEEN. Bordures 1 px (mesuré sur PNG).
> Les INSTANCE imbriquées listent uniquement leurs textes et écarts par rapport à leur composant principal (défini plus bas/haut dans ce fichier).

## Sommaire

- [Input](#input) — COMPONENT_SET, 3 variante(s) — `2:3868`
- [Logo](#logo) — COMPONENT_SET, 3 variante(s) — `2:59`
- [Button](#button) — COMPONENT_SET, 4 variante(s) — `2:102`
- [Link](#link) — COMPONENT_SET, 3 variante(s) — `2:123`
- [Icon button](#icon-button) — COMPONENT_SET, 4 variante(s) — `2:2983`
- [Menu](#menu) — COMPONENT, 1 variante(s) — `2:295`
- [Footer](#footer) — COMPONENT, 1 variante(s) — `2:4400`
- [Comment](#comment) — COMPONENT_SET, 2 variante(s) — `2:3281`
- [Tâche liste](#tâche-liste) — COMPONENT_SET, 5 variante(s) — `2:3187`
- [Menu items](#menu-items) — COMPONENT_SET, 4 variante(s) — `2:225`
- [User icon](#user-icon) — COMPONENT_SET, 2 variante(s) — `2:268`
- [Chips](#chips) — COMPONENT_SET, 6 variante(s) — `2:369`
- [Tag](#tag) — COMPONENT_SET, 6 variante(s) — `2:461`
- [Card projet](#card-projet) — COMPONENT, 1 variante(s) — `2:2379`
- [IA button](#ia-button) — COMPONENT_SET, 2 variante(s) — `2:4107`

## Input

- `2:3868` · COMPONENT_SET · usage : Log In, Sign In, toutes les modales, Mon compte
- Variantes : `Property 1=Default` (`2:86`), `Property 1=date picker` (`2:3869`), `Property 1=Combo box` (`2:4001`)
- Structures différentes selon la variante : détail complet ci-dessous.

### Détail

- **Property 1=Default** COMPONENT `2:86` — 280×77 · flex-col gap 7 · pad 0 · justify start · align start
  - TEXT « Label » `2:84` — 280×17 · Inter Regular 14px · #000000
  - **Frame 2** FRAME `2:83` — 280×53 · flex-row gap 10 · pad 19 17 19 17 · justify start · align center · fill #ffffff · stroke #e5e7eb · radius 4
- **Property 1=date picker** COMPONENT `2:3869` — 280×77 · flex-col gap 7 · pad 0 · justify start · align start
  - TEXT « Label » `2:3870` — 280×17 · Inter Regular 14px · #000000
  - **Frame 2** FRAME `2:3871` — 280×53 · flex-row gap auto · pad 19 17 19 17 · justify space-between · align center (itemSpacing Figma 10 ignoré) · fill #ffffff · stroke #e5e7eb · radius 4
    - **Union** BOOLEAN_OPERATION `2:3873` — icône 15×16.54 · fill #6b7280 → `icon-calendar.svg`
- **Property 1=Combo box** COMPONENT `2:4001` — 280×77 · flex-col gap 7 · pad 0 · justify start · align start
  - TEXT « Label » `2:4002` — 280×17 · Inter Regular 14px · #000000
  - **Frame 2** FRAME `2:4003` — 280×53 · flex-row gap auto · pad 19 17 19 17 · justify space-between · align center (itemSpacing Figma 10 ignoré) · fill #ffffff · stroke #e5e7eb · radius 4
    - **Vector 1** VECTOR `2:4013` — icône 16×8 · stroke #0f0f0f → `icon-chevron-down.svg`

## Logo

- `2:59` · COMPONENT_SET · usage : Log In/Sign In (orange 252×32), Menu (orange 147×18.7), Footer (noir 101×12.9) ; variante white non utilisée dans les écrans
- Variantes : `Color=orange` (`2:57`), `Color=white` (`2:60`), `Color=black` (`2:71`)

### Comparatif des variantes (valeurs qui changent)

| Variante | Valeurs |
|---|---|
| `Color=orange` | **Union** : fill #d3590b |
| `Color=white` | **Union** : fill #ffffff |
| `Color=black` | **Union** : fill #0f0f0f |

### Détail

- **Color=orange** COMPONENT `2:57` — 252.57×32.17 · positionnement libre (pas d'auto-layout) → asset `logo-orange.svg`
  - **Union** BOOLEAN_OPERATION `2:56` — icône 252.57×32.17 · fill #d3590b → `logo-orange.svg`
- **Color=white** COMPONENT `2:60` — 252.57×32.17 · positionnement libre (pas d'auto-layout) → asset `logo-white.svg`
  - **Union** BOOLEAN_OPERATION `2:61` — icône 252.57×32.17 · fill #ffffff → `logo-white.svg`
- **Color=black** COMPONENT `2:71` — 252.57×32.17 · positionnement libre (pas d'auto-layout) → asset `logo-black.svg`
  - **Union** BOOLEAN_OPERATION `2:72` — icône 252.57×32.17 · fill #0f0f0f → `logo-black.svg`

## Button

- `2:102` · COMPONENT_SET · usage : partout (CTA). `Outline orange` non utilisé dans les écrans (le bouton « IA » de Single projet est un FRAME détaché orange plein)
- ⚠ `focus` ne diffère de `Default` que par le fond (#0f0f0f vs #1f1f1f) : à utiliser comme état :hover/:focus. Aucun anneau de focus dessiné. `disabled` = fond #e5e7eb, texte #9ca3af.
- Variantes : `Property 1=Default` (`2:100`), `Property 1=Outline orange` (`2:107`), `Property 1=focus` (`2:103`), `Property 1=disabled` (`2:105`)

### Comparatif des variantes (valeurs qui changent)

| Variante | Valeurs |
|---|---|
| `Property 1=Default` | **(racine)** : fill #1f1f1f, (aucun stroke) ; **texte** : Inter Regular 16px · #ffffff |
| `Property 1=Outline orange` | **(racine)** : fill #ffffff, stroke #d3590b ; **texte** : Inter Regular 16px · #d3590b |
| `Property 1=focus` | **(racine)** : fill #0f0f0f, (aucun stroke) ; **texte** : Inter Regular 16px · #ffffff |
| `Property 1=disabled` | **(racine)** : fill #e5e7eb, (aucun stroke) ; **texte** : Inter Regular 16px · #9ca3af |

### Détail

- **Property 1=Default** COMPONENT `2:100` — 190×50 · flex-row gap 10 · pad 13 74 13 74 · justify center · align center · fill #1f1f1f · radius 10
  - TEXT « Label » `2:99` — 42×19 · Inter Regular 16px · #ffffff
- **Property 1=Outline orange** COMPONENT `2:107` — 190×50 · flex-row gap 10 · pad 13 74 13 74 · justify center · align center · fill #ffffff · stroke #d3590b · radius 10
  - TEXT « Label » `2:108` — 42×19 · Inter Regular 16px · #d3590b
- **Property 1=focus** COMPONENT `2:103` — 190×50 · flex-row gap 10 · pad 13 74 13 74 · justify center · align center · fill #0f0f0f · radius 10
  - TEXT « Label » `2:104` — 42×19 · Inter Regular 16px · #ffffff
- **Property 1=disabled** COMPONENT `2:105` — 190×50 · flex-row gap 10 · pad 13 74 13 74 · justify center · align center · fill #e5e7eb · radius 10
  - TEXT « Label » `2:106` — 42×19 · Inter Regular 16px · #9ca3af

## Link

- `2:123` · COMPONENT_SET · usage : Log In, Sign In, Single projet (« Modifier »)
- ⚠ Le pont renvoie #d3590b pour les 3 variantes, mais le rendu (PNG) diffère : **Default** texte + soulignement #d3590b ; **focus** texte + soulignement ≈ #0f0f0f ; **disabled** texte + soulignement #9ca3af (couleurs mesurées sur `composants.png`). Soulignement présent sur les 3 (textDecoration non exporté par le pont). Probable remplissage par plage de caractères non lu par le pont : vérifier dans Figma si besoin.
- Variantes : `Property 1=Default` (`2:122`), `Property 1=focus` (`2:124`), `Property 1=disabled` (`2:126`)

### Comparatif des variantes (valeurs qui changent)

| Variante | Valeurs |
|---|---|
| `Property 1=Default` |  |
| `Property 1=focus` |  |
| `Property 1=disabled` |  |

### Détail

- **Property 1=Default** COMPONENT `2:122` — 28×17 · flex-row gap 10 · pad 0 · justify start · align center
  - TEXT « Link » `2:114` — 28×17 · Inter Regular 14px · #d3590b
- **Property 1=focus** COMPONENT `2:124` — 28×17 · flex-row gap 10 · pad 0 · justify start · align center
  - TEXT « Link » `2:125` — 28×17 · Inter Regular 14px · #d3590b
- **Property 1=disabled** COMPONENT `2:126` — 28×17 · flex-row gap 10 · pad 0 · justify start · align center
  - TEXT « Link » `2:127` — 28×17 · Inter Regular 14px · #d3590b

## Icon button

- `2:2983` · COMPONENT_SET · usage : Single projet (Back, See more)
- ⚠ 57×57, radius 10, bordure 1 px #e5e7eb ; `focus` = bordure + icône #d3590b.
- Variantes : `Property 1=Back` (`2:2982`), `Property 1=See more` (`2:3384`), `Property 1=See more focus` (`2:3386`), `Property 1=Back focus` (`2:2984`)
- Structures différentes selon la variante : détail complet ci-dessous.

### Détail

- **Property 1=Back** COMPONENT `2:2982` — 57×57 · flex-col gap 10 · pad 24 24 24 24 · justify center · align center · fill #ffffff · stroke #e5e7eb · radius 10
  - **Line 3** VECTOR `2:2980` — icône 15×0 · stroke #000000 → `icon-arrow-left.svg`
- **Property 1=See more** COMPONENT `2:3384` — 57×57 · flex-col gap 10 · pad 24 24 24 24 · justify center · align center · fill #ffffff · stroke #e5e7eb · radius 10
  - **Union** BOOLEAN_OPERATION `2:3388` — icône 15×3.57 · fill #6b7280 → `icon-more.svg`
- **Property 1=See more focus** COMPONENT `2:3386` — 57×57 · flex-col gap 10 · pad 24 24 24 24 · justify center · align center · fill #ffffff · stroke #d3590b · radius 10
  - **Union** BOOLEAN_OPERATION `2:3393` — icône 15×3.57 · fill #d3590b → `icon-more.svg`
- **Property 1=Back focus** COMPONENT `2:2984` — 57×57 · flex-col gap 10 · pad 24 24 24 24 · justify center · align center · fill #ffffff · stroke #d3590b · radius 10
  - **Line 3** VECTOR `2:2985` — icône 15×0 · stroke #d3590b → `icon-arrow-left.svg`

## Menu

- `2:295` · COMPONENT · usage : Dashboard, Kanban, Projets, Single projet, Mon compte
- ⚠ Ombre portée (type `shadow`) : paramètres non exportés ; rendu mesuré ≈ ombre très légère sur ~10 px vers le bas (≈ rgba(0,0,0,.03–.04)).

### Détail

- **Menu** COMPONENT `2:295` — 1440×94 · flex-row gap auto · pad 8 100 8 100 · justify space-between · align center (itemSpacing Figma 259 ignoré) · fill #ffffff · effet: shadow
  - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `2:197` — icône 147×18.72 → `logo-orange.svg`
  - **Frame 10** FRAME `2:294` — 512×78 · flex-row gap 16 · pad 0 · justify start · align start
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Dashboard⟩ `2:272` — 248×78 · (= composant) — cf. composants.md `2:224`
      - texte « Tableau de bord »
    - **Menu items** INSTANCE ⟨Menu items · Property 1=Projets⟩ `2:280` — 248×76.49 · (= composant) — cf. composants.md `2:234`
      - texte « Projets »
  - **User icon** INSTANCE ⟨User icon · Property 1=Default⟩ `2:291` — 65×65 · (= composant) — cf. composants.md `2:267`
    - texte « AD »

## Footer

- `2:4400` · COMPONENT · usage : idem Menu

### Détail

- **Footer** COMPONENT `2:4400` — 1440×68 · positionnement libre (pas d'auto-layout) · fill #ffffff
  - **Logo** INSTANCE ⟨Logo · Color=black⟩ `2:4387` — icône 101×12.86 → `logo-black.svg`
  - TEXT « Abricot 2025 » `2:4399` — 99×19 · Inter Regular 16px · #000000

## Comment

- `2:3281` · COMPONENT_SET · usage : Tâche liste › projet comment (non affiché dans les écrans sauf composant) ; structure reprise en FRAME dans les modales IA
- Variantes : `Property 1=Default` (`2:3280`), `Property 1=add comment` (`2:3282`)
- Structures différentes selon la variante : détail complet ci-dessous.

### Détail

- **Property 1=Default** COMPONENT `2:3280` — 760×83 · flex-row gap 14 · pad 0 · justify start · align start
  - **User icon** FRAME `2:3270` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
    - TEXT « BD » `2:3271` — 14×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
  - **Frame 48** FRAME `2:3273` — 719×83 · flex-col gap 10 · pad 18 14 18 14 · justify start · align start · fill #f3f4f6 · radius 10
    - **Frame 50** FRAME `2:3278` — 691×47 · flex-col gap 18 · pad 0 · justify start · align start
      - **Frame 49** FRAME `2:3277` — 691×17 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 239 ignoré)
        - TEXT « Bertrand Dupont » `2:3274` — 111×17 · Inter Regular 14px · #000000
        - TEXT « 23 mars, 11:20 » `2:3275` — 69×12 · Inter Regular 10px · #6b7280
      - TEXT « Attention à bien gérer l'expiration des tokens et le refresh automatique côté client. » `2:3276` — 691×12 · Inter Regular 10px · #000000
- **Property 1=add comment** COMPONENT `2:3282` — 760×83 · flex-row gap 14 · pad 0 · justify start · align start
  - **User icon** FRAME `2:3283` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #ffe8d9 · stroke #ffffff · radius 13.5
    - TEXT « AD » `2:3284` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
  - **Frame 48** FRAME `2:3285` — 719×83 · flex-col gap 10 · pad 18 14 18 14 · justify start · align start · fill #f9fafb · radius 10
    - **Frame 50** FRAME `2:3286` — 691×12 · flex-col gap 18 · pad 0 · justify start · align start
      - TEXT « Ajouter un commentaire... » `2:3290` — 691×12 · Inter Regular 10px · #000000

## Tâche liste

- `2:3187` · COMPONENT_SET · usage : thumbnail → Dashboard ; Tâche Kanban → Kanban ; Tâche IA → Modale liste IA ; projet → Single projet ; projet comment → aucun écran (état déplié)
- ⚠ Variante `projet comment` = carte de tâche dépliée avec fil de commentaires, champ d'ajout et bouton « Envoyer » (disabled) ; `projet` = repliée (chevron haut ↔ bas inversés par rapport à l'attendu : voir Points d'attention du README).
- Variantes : `Property 1=thumbnail` (`2:548`), `Property 1=Tâche Kanban` (`24:1348`), `Property 1=Tâche IA` (`2:4135`), `Property 1=projet comment` (`2:3188`), `Property 1=projet` (`2:3323`)
- Structures différentes selon la variante : détail complet ci-dessous.

### Détail

- **Property 1=thumbnail** COMPONENT `2:548` — 1022×162 · flex-row gap auto · pad 25 40 25 40 · justify space-between · align center (itemSpacing Figma 615 ignoré) · fill #ffffff · stroke #e5e7eb · radius 10
  - **Frame 22** FRAME `2:543` — 291×97.54 · flex-col gap 32 · pad 0 · justify start · align start
    - **Frame 21** FRAME `2:542` — 153×49 · flex-col gap 7 · pad 0 · justify start · align start
      - TEXT « Nom de la tâche » `2:514` — 153×25 · Manrope SemiBold 18px · #000000
      - TEXT « Description de la tâche » `2:515` — 153×17 · Inter Regular 14px · #6b7280
    - **Frame 20** FRAME `2:538` — 291×16.54 · flex-row gap 15 · pad 0 · justify start · align center
      - **Frame 18** FRAME `2:535` — 107×15 · flex-row gap 8 · pad 0 · justify start · align center
        - **Union** BOOLEAN_OPERATION `2:520` — icône 18×13.96 · fill #9ca3af → `icon-folder-sm.svg`
        - TEXT « Nom du projet » `2:524` — 81×15 · Inter Regular 12px · #6b7280
      - **Line 1** LINE `2:537` — 11×0 · stroke #9ca3af
      - **Frame 19** FRAME `2:536` — 62×16.54 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 8 ignoré)
        - **Union** BOOLEAN_OPERATION `2:526` — icône 15×16.54 · fill #6b7280 → `icon-calendar.svg`
        - TEXT « 9 mars » `2:525` — 39×15 · Inter Regular 12px · #6b7280
      - **Line 2** LINE `2:1721` — 11×0 · stroke #9ca3af
      - **Frame 20** FRAME `2:1542` — 62×15 · flex-row gap 8 · pad 0 · justify start · align center
        - **_109** VECTOR `2:1552` — icône 15×15 · fill #6b7280 → `icon-comment.svg`
        - TEXT « 2 » `2:1551` — 8×15 · Inter Regular 12px · #6b7280
  - **Frame 23** FRAME `2:547` — 121×112 · flex-col gap 37 · pad 0 · justify start · align end
    - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `2:516` — 75×25 · (= composant) — cf. composants.md `2:462`
      - texte « À faire »
    - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:544` — 121×50 · (= composant) — cf. composants.md `2:100`
      - texte « Voir »
- **Property 1=Tâche Kanban** COMPONENT `24:1348` — 371×229.54 · flex-col gap 32 · pad 25 40 25 40 · justify center · align start · fill #ffffff · stroke #e5e7eb · radius 10
  - **Frame 22** FRAME `24:1349` — 291×97.54 · flex-col gap 32 · pad 0 · justify start · align start
    - **Frame 68** FRAME `24:1379` — 291×49 · flex-row gap auto · pad 0 · justify space-between · align start (itemSpacing Figma 32 ignoré)
      - **Frame 21** FRAME `24:1350` — 153×49 · flex-col gap 7 · pad 0 · justify start · align start
        - TEXT « Nom de la tâche » `24:1351` — 153×25 · Manrope SemiBold 18px · #000000
        - TEXT « Description de la tâche » `24:1352` — 153×17 · Inter Regular 14px · #6b7280
      - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `24:1375` — 75×25 · (= composant) — cf. composants.md `2:462`
        - texte « À faire »
    - **Frame 20** FRAME `24:1353` — 291×16.54 · flex-row gap 15 · pad 0 · justify start · align center
      - **Frame 18** FRAME `24:1354` — 107×15 · flex-row gap 8 · pad 0 · justify start · align center
        - **Union** BOOLEAN_OPERATION `24:1355` — icône 18×13.96 · fill #9ca3af → `icon-folder-sm.svg`
        - TEXT « Nom du projet » `24:1358` — 81×15 · Inter Regular 12px · #6b7280
      - **Line 1** LINE `24:1359` — 11×0 · stroke #9ca3af
      - **Frame 19** FRAME `24:1360` — 62×16.54 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 8 ignoré)
        - **Union** BOOLEAN_OPERATION `24:1361` — icône 15×16.54 · fill #6b7280 → `icon-calendar.svg`
        - TEXT « 9 mars » `24:1369` — 39×15 · Inter Regular 12px · #6b7280
      - **Line 2** LINE `24:1370` — 11×0 · stroke #9ca3af
      - **Frame 20** FRAME `24:1371` — 62×15 · flex-row gap 8 · pad 0 · justify start · align center
        - **_109** VECTOR `24:1372` — icône 15×15 · fill #6b7280 → `icon-comment.svg`
        - TEXT « 2 » `24:1373` — 8×15 · Inter Regular 12px · #6b7280
  - **Frame 23** FRAME `24:1374` — 121×50 · flex-col gap 37 · pad 0 · justify start · align end
    - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `24:1376` — 121×50 · (= composant) — cf. composants.md `2:100`
      - texte « Voir »
- **Property 1=Tâche IA** COMPONENT `2:4135` — 494×146 · flex-row gap auto · pad 25 40 25 40 · justify space-between · align center (itemSpacing Figma 615 ignoré) · fill #ffffff · stroke #e5e7eb · radius 10
  - **Frame 22** FRAME `2:4136` — 170.7×96 · flex-col gap 32 · pad 0 · justify start · align start
    - **Frame 21** FRAME `2:4137` — 153×49 · flex-col gap 7 · pad 0 · justify start · align start
      - TEXT « Nom de la tâche » `2:4138` — 153×25 · Manrope SemiBold 18px · #000000
      - TEXT « Description de la tâche » `2:4139` — 153×17 · Inter Regular 14px · #6b7280
    - **Frame 20** FRAME `2:4140` — 170.7×15 · flex-row gap 15 · pad 0 · justify start · align center
      - **Frame 18** FRAME `2:4141` — 78.7×15 · flex-row gap 4 · pad 0 · justify start · align center
        - **Union** BOOLEAN_OPERATION `2:4176` — icône 15.7×13.91 · fill #9ca3af → `icon-trash.svg`
        - TEXT « Supprimer » `2:4145` — 59×15 · Inter Regular 12px · #6b7280
      - **Line 1** LINE `2:4146` — 11×0 · stroke #9ca3af
      - **Frame 19** FRAME `2:4147` — 62×15 · flex-row gap 4 · pad 0 · justify start · align center
        - **Layer 2** GROUP `2:4189` — icône 13.6×13.6 → `icon-edit.svg`
        - TEXT « Modifier » `2:4156` — 47×15 · Inter Regular 12px · #6b7280
- **Property 1=projet comment** COMPONENT `2:3188` — 1022×535.54 · flex-col gap 24 · pad 25 40 25 40 · justify start · align start · fill #ffffff · stroke #e5e7eb · radius 10
  - **Frame 43** FRAME `2:3222` — 942×57 · flex-row gap auto · pad 0 · justify space-between · align start (itemSpacing Figma 668 ignoré)
    - **Frame 22** FRAME `2:3189` — 395×49 · flex-col gap 32 · pad 0 · justify start · align start
      - **Frame 21** FRAME `2:3190` — 395×49 · flex-col gap 7 · pad 0 · justify start · align start
        - **Frame 54** FRAME `2:3414` — 395×25 · flex-row gap 8 · pad 0 · justify start · align start
          - TEXT « Authentification JWT » `2:3191` — 183×25 · Manrope SemiBold 18px · #000000
          - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `2:3411` — 75×25 · (= composant) — cf. composants.md `2:462`
            - texte « À faire »
        - TEXT « Implémenter le système d'authentification avec tokens JWT » `2:3192` — 395×17 · Inter Regular 14px · #6b7280
    - **Frame 53** FRAME `2:3410` — 362.5×57 · flex-row gap 25 · pad 0 · justify end · align start
      - **Frame 23** FRAME `2:3214` — 69×23 · flex-col gap 37 · pad 0 · justify start · align end
      - **Icon button** INSTANCE ⟨Icon button · Property 1=See more⟩ `2:3404` — 57×57 · (= composant) — cf. composants.md `2:3384`
  - **Frame 44** FRAME `2:3238` — 145×16.54 · flex-row gap 4 · pad 0 · justify start · align center
    - TEXT « Échéance : » `2:3237` — 63×15 · Inter Regular 12px · #6b7280
    - **Frame 19** FRAME `2:3226` — 62×16.54 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 8 ignoré)
      - **Union** BOOLEAN_OPERATION `2:3227` — icône 15×16.54 · fill #1f1f1f → `icon-calendar.svg`
      - TEXT « 9 mars » `2:3235` — 39×15 · Inter Regular 12px · #1f1f1f
  - **Frame 45** FRAME `2:3239` — 145×27 · flex-row gap 8 · pad 0 · justify start · align center
    - TEXT « Assigné à : » `2:3240` — 62×15 · Inter Regular 12px · #6b7280
    - **Frame 46** FRAME `2:3263` — 174×27 · flex-row gap 4 · pad 0 · justify start · align center
      - **User icon** FRAME `2:3251` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
        - TEXT « BD » `2:3252` — 14×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
      - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `2:3259` — 143×25 · (= composant) — cf. composants.md `2:470`
        - texte « Bertrand Dupont »
    - **Frame 47** FRAME `2:3264` — 150×27 · flex-row gap 4 · pad 0 · justify start · align center
      - **User icon** FRAME `2:3265` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
        - TEXT « AD » `2:3266` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
      - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `2:3267` — 119×25 · (= composant) — cf. composants.md `2:470`
        - texte « Anne Dupont »
  - **Line 4** LINE `2:3224` — 942×0 · stroke #e5e7eb
  - **Frame 52** FRAME `2:3322` — 942×17 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 24 ignoré)
    - TEXT « Commentaires (1) » `2:3269` — 117×17 · Inter Regular 14px · #1f1f1f
    - **Vector 1** VECTOR `2:3320` — icône 16×8 · stroke #0f0f0f → `icon-chevron-down.svg`
  - **Frame 51** FRAME `2:3318` — 942×248 · flex-col gap 16 · pad 0 · justify center · align end
    - **Comment** INSTANCE ⟨Comment · Property 1=Default⟩ `2:3291` — 942×83 · (= composant) — cf. composants.md `2:3280`
      - texte « BD »
      - Frame 48 `I2:3291;2:3273` — diffs : 901×83
        - Frame 50 `I2:3291;2:3278` — diffs : 873×47
          - Frame 49 `I2:3291;2:3277` — diffs : 873×17
            - texte « Bertrand Dupont »
            - texte « 23 mars, 11:20 »
          - texte « Attention à bien gérer l'expiration des tokens et le refresh automatique côté client. »
    - **Comment** INSTANCE ⟨Comment · Property 1=add comment⟩ `2:3301` — 942×83 · (= composant) — cf. composants.md `2:3282`
      - texte « AD »
      - Frame 48 `I2:3301;2:3285` — diffs : 901×83
        - Frame 50 `I2:3301;2:3286` — diffs : 873×12
          - texte « Ajouter un commentaire... »
    - **Button** INSTANCE ⟨Button · Property 1=disabled⟩ `2:3315` — 209×50 · (= composant) — cf. composants.md `2:105`
      - texte « Envoyer »
- **Property 1=projet** COMPONENT `2:3323` — 1022×263.54 · flex-col gap 24 · pad 25 40 25 40 · justify start · align start · fill #ffffff · stroke #e5e7eb · radius 10
  - **Frame 53** FRAME `2:3415` — 942×57 · flex-row gap auto · pad 0 · justify space-between · align start (itemSpacing Figma 668 ignoré)
    - **Frame 22** FRAME `2:3416` — 395×49 · flex-col gap 32 · pad 0 · justify start · align start
      - **Frame 21** FRAME `2:3417` — 395×49 · flex-col gap 7 · pad 0 · justify start · align start
        - **Frame 54** FRAME `2:3418` — 395×25 · flex-row gap 8 · pad 0 · justify start · align start
          - TEXT « Authentification JWT » `2:3419` — 183×25 · Manrope SemiBold 18px · #000000
          - **Tag** INSTANCE ⟨Tag · Property 1=red⟩ `2:3420` — 75×25 · (= composant) — cf. composants.md `2:462`
            - texte « À faire »
        - TEXT « Implémenter le système d'authentification avec tokens JWT » `2:3421` — 395×17 · Inter Regular 14px · #6b7280
    - **Frame 53** FRAME `2:3422` — 362.5×57 · flex-row gap 25 · pad 0 · justify end · align start
      - **Frame 23** FRAME `2:3423` — 69×23 · flex-col gap 37 · pad 0 · justify start · align end
      - **Icon button** INSTANCE ⟨Icon button · Property 1=See more⟩ `2:3424` — 57×57 · (= composant) — cf. composants.md `2:3384`
  - **Frame 44** FRAME `2:3331` — 145×16.54 · flex-row gap 4 · pad 0 · justify start · align center
    - TEXT « Échéance : » `2:3332` — 63×15 · Inter Regular 12px · #6b7280
    - **Frame 19** FRAME `2:3333` — 62×16.54 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 8 ignoré)
      - **Union** BOOLEAN_OPERATION `2:3334` — icône 15×16.54 · fill #1f1f1f → `icon-calendar.svg`
      - TEXT « 9 mars » `2:3342` — 39×15 · Inter Regular 12px · #1f1f1f
  - **Frame 45** FRAME `2:3343` — 145×27 · flex-row gap 8 · pad 0 · justify start · align center
    - TEXT « Assigné à : » `2:3344` — 62×15 · Inter Regular 12px · #6b7280
    - **Frame 46** FRAME `2:3345` — 174×27 · flex-row gap 4 · pad 0 · justify start · align center
      - **User icon** FRAME `2:3346` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
        - TEXT « BD » `2:3347` — 14×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
      - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `2:3348` — 143×25 · (= composant) — cf. composants.md `2:470`
        - texte « Bertrand Dupont »
    - **Frame 47** FRAME `2:3349` — 150×27 · flex-row gap 4 · pad 0 · justify start · align center
      - **User icon** FRAME `2:3350` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
        - TEXT « AD » `2:3351` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
      - **Tag** INSTANCE ⟨Tag · Property 1=grey⟩ `2:3352` — 119×25 · (= composant) — cf. composants.md `2:470`
        - texte « Anne Dupont »
  - **Line 4** LINE `2:3353` — 942×0 · stroke #e5e7eb
  - **Frame 52** FRAME `2:3354` — 942×17 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 24 ignoré)
    - TEXT « Commentaires (1) » `2:3355` — 117×17 · Inter Regular 14px · #1f1f1f
    - **Vector 1** VECTOR `2:3356` — icône 16×8 · stroke #0f0f0f → `icon-chevron-up.svg`

## Menu items

- `2:225` · COMPONENT_SET · usage : Menu (Dashboard / Projets ; variantes `hover` utilisées comme état ACTIF)
- ⚠ Les variantes `… hover` (fond #0f0f0f, contenu blanc) sont utilisées dans les écrans comme **état actif** (page courante). Aucun état hover distinct n'est dessiné pour un onglet inactif.
- Variantes : `Property 1=Dashboard` (`2:224`), `Property 1=Projets` (`2:234`), `Property 1=Projets hover` (`2:258`), `Property 1=Dashboard hover` (`2:226`)
- Structures différentes selon la variante : détail complet ci-dessous.

### Détail

- **Property 1=Dashboard** COMPONENT `2:224` — 248×78 · flex-row gap 16 · pad 27 62 27 62 · justify center · align center · fill #ffffff · radius 10
  - **Group** GROUP `2:218` — icône 24×24 → `icon-dashboard.svg`
  - TEXT « Tableau de bord » `2:210` — 123×19 · Inter Regular 16px · #d3590b
- **Property 1=Projets** COMPONENT `2:234` — 248×76.49 · flex-row gap 16 · pad 27 62 27 62 · justify center · align center · fill #ffffff · radius 10
  - **Union** BOOLEAN_OPERATION `2:254` — icône 29×22.49 · fill #d3590b → `icon-folder.svg`
  - TEXT « Projets » `2:240` — 53×19 · Inter Regular 16px · #d3590b
- **Property 1=Projets hover** COMPONENT `2:258` — 248×76.49 · flex-row gap 16 · pad 27 62 27 62 · justify center · align center · fill #0f0f0f · radius 10
  - **Union** BOOLEAN_OPERATION `2:259` — icône 29×22.49 · fill #ffffff → `icon-folder.svg`
  - TEXT « Projets » `2:262` — 53×19 · Inter Regular 16px · #ffffff
- **Property 1=Dashboard hover** COMPONENT `2:226` — 248×78 · flex-row gap 16 · pad 27 62 27 62 · justify center · align center · fill #0f0f0f · radius 10
  - **Group** GROUP `2:227` — icône 24×24 → `icon-dashboard.svg`
  - TEXT « Tableau de bord » `2:232` — 123×19 · Inter Regular 16px · #ffffff

## User icon

- `2:268` · COMPONENT_SET · usage : Menu (Default ; focus sur Mon compte)
- ⚠ Avatar 65×65 rond (radius 32.5), initiales en capitales. Dans les cartes/listes, des avatars 27×27 sont des FRAME détachés (non-instances) : fond #ffe8d9 (utilisateur courant) ou #e5e7eb + bordure blanche 1 px (autres), initiales Inter 10 px #0f0f0f.
- Variantes : `Property 1=Default` (`2:267`), `Property 1=focus` (`2:269`)

### Comparatif des variantes (valeurs qui changent)

| Variante | Valeurs |
|---|---|
| `Property 1=Default` | **(racine)** : fill #ffe8d9 ; **texte** : Inter Regular 14px · #0f0f0f · ls 2% · case UPPER |
| `Property 1=focus` | **(racine)** : fill #d3590b ; **texte** : Inter Regular 14px · #ffffff · ls 2% · case UPPER |

### Détail

- **Property 1=Default** COMPONENT `2:267` — 65×65 · flex-col gap 10 · pad 21 12 21 12 · justify center · align center · fill #ffe8d9 · radius 32.5
  - TEXT « AD » `2:264` — 20×10 · Inter Regular 14px · #0f0f0f · ls 2% · case UPPER
- **Property 1=focus** COMPONENT `2:269` — 65×65 · flex-col gap 10 · pad 21 12 21 12 · justify center · align center · fill #d3590b · radius 32.5
  - TEXT « AD » `2:270` — 20×10 · Inter Regular 14px · #ffffff · ls 2% · case UPPER

## Chips

- `2:369` · COMPONENT_SET · usage : Dashboard, Kanban, Single projet (sélecteur de vue)
- ⚠ Nommage incohérent : `task hover` = état NON sélectionné (fond blanc) de « Mes tâches » ; `… focus` = état sélectionné (fond #ffe8d9). Dans les écrans les libellés sont surchargés (« Liste », « Kanban », « Calendrier »). « Kanban » et « Calendrier » utilisent la même icône calendrier.
- Variantes : `Property 1=task hover` (`2:368`), `Property 1=list` (`2:378`), `Property 1=project` (`2:425`), `Property 1=mes projets focus` (`2:448`), `Property 1=list focus` (`2:414`), `Property 1=task focus` (`2:370`)
- Structures différentes selon la variante : détail complet ci-dessous.

### Détail

- **Property 1=task hover** COMPONENT `2:368` — 139×45 · flex-col gap 10 · pad 14 16 14 16 · justify center · align center · fill #ffffff · radius 8
  - **Frame 13** FRAME `2:367` — 107×17 · flex-row gap 14 · pad 0 · justify start · align end
    - **Group** GROUP `2:361` — icône 16×16 → `icon-task-checkbox.svg`
    - TEXT « Mes tâches » `2:329` — 77×17 · Inter Regular 14px · #d3590b
- **Property 1=list** COMPONENT `2:378` — 111×45 · flex-col gap 10 · pad 14 16 14 16 · justify center · align center · fill #ffffff · radius 8
  - **Frame 13** FRAME `2:379` — 79×17 · flex-row gap 14 · pad 0 · justify start · align end
    - **Union** BOOLEAN_OPERATION `2:405` — icône 15×16.54 · fill #d3590b → `icon-calendar.svg`
    - TEXT « Kanban » `2:385` — 50×17 · Inter Regular 14px · #d3590b
- **Property 1=project** COMPONENT `2:425` — 142×45 · flex-col gap 10 · pad 14 16 14 16 · justify center · align center · fill #ffffff · radius 8
  - **Frame 13** FRAME `2:426` — 110×17 · flex-row gap 14 · pad 0 · justify start · align end
    - **Union** BOOLEAN_OPERATION `2:444` — icône 18×13.96 · fill #d3590b → `icon-folder-sm.svg`
    - TEXT « Mes projets » `2:435` — 78×17 · Inter Regular 14px · #d3590b
- **Property 1=mes projets focus** COMPONENT `2:448` — 142×45 · flex-col gap 10 · pad 14 16 14 16 · justify center · align center · fill #ffe8d9 · radius 8
  - **Frame 13** FRAME `2:449` — 110×17 · flex-row gap 14 · pad 0 · justify start · align end
    - **Union** BOOLEAN_OPERATION `2:450` — icône 18×13.96 · fill #d3590b → `icon-folder-sm.svg`
    - TEXT « Mes projets » `2:453` — 78×17 · Inter Regular 14px · #d3590b
- **Property 1=list focus** COMPONENT `2:414` — 111×45 · flex-col gap 10 · pad 14 16 14 16 · justify center · align center · fill #ffe8d9 · radius 8
  - **Frame 13** FRAME `2:415` — 79×17 · flex-row gap 14 · pad 0 · justify start · align end
    - **Union** BOOLEAN_OPERATION `2:416` — icône 15×16.54 · fill #d3590b → `icon-calendar.svg`
    - TEXT « Kanban » `2:424` — 50×17 · Inter Regular 14px · #d3590b
- **Property 1=task focus** COMPONENT `2:370` — 139×45 · flex-col gap 10 · pad 14 16 14 16 · justify center · align center · fill #ffe8d9 · radius 8
  - **Frame 13** FRAME `2:371` — 107×17 · flex-row gap 14 · pad 0 · justify start · align end
    - **Group** GROUP `2:372` — icône 16×16 → `icon-task-checkbox.svg`
    - TEXT « Mes tâches » `2:377` — 77×17 · Inter Regular 14px · #d3590b

## Tag

- `2:461` · COMPONENT_SET · usage : statuts de tâche (red/orange/green), Propriétaire (brand), personnes & compteurs (grey) ; blue non utilisé
- ⚠ Radius 50 (pilule), padding 4/16, hauteur 25 ; largeur = contenu (hug). `blue` n'est utilisé dans aucun écran.
- Variantes : `Property 1=green` (`2:460`), `Property 1=red` (`2:462`), `Property 1=orange` (`2:464`), `Property 1=blue` (`2:466`), `Property 1=brand` (`2:468`), `Property 1=grey` (`2:470`)

### Comparatif des variantes (valeurs qui changent)

| Variante | Valeurs |
|---|---|
| `Property 1=green` | **(racine)** : fill #f1fff7 ; **texte** : Inter Regular 14px · #27ae60 |
| `Property 1=red` | **(racine)** : fill #ffe0e0 ; **texte** : Inter Regular 14px · #ef4444 |
| `Property 1=orange` | **(racine)** : fill #fff0d7 ; **texte** : Inter Regular 14px · #e08d00 |
| `Property 1=blue` | **(racine)** : fill #e0ecff ; **texte** : Inter Regular 14px · #3b82f6 |
| `Property 1=brand` | **(racine)** : fill #ffe8d9 ; **texte** : Inter Regular 14px · #d3590b |
| `Property 1=grey` | **(racine)** : fill #e5e7eb ; **texte** : Inter Regular 14px · #6b7280 |

### Détail

- **Property 1=green** COMPONENT `2:460` — 64×25 · flex-row gap 10 · pad 4 16 4 16 · justify center · align center · fill #f1fff7 · radius 50
  - TEXT « label » `2:455` — 32×17 · Inter Regular 14px · #27ae60
- **Property 1=red** COMPONENT `2:462` — 64×25 · flex-row gap 10 · pad 4 16 4 16 · justify center · align center · fill #ffe0e0 · radius 50
  - TEXT « label » `2:463` — 32×17 · Inter Regular 14px · #ef4444
- **Property 1=orange** COMPONENT `2:464` — 64×25 · flex-row gap 10 · pad 4 16 4 16 · justify center · align center · fill #fff0d7 · radius 50
  - TEXT « label » `2:465` — 32×17 · Inter Regular 14px · #e08d00
- **Property 1=blue** COMPONENT `2:466` — 64×25 · flex-row gap 10 · pad 4 16 4 16 · justify center · align center · fill #e0ecff · radius 50
  - TEXT « label » `2:467` — 32×17 · Inter Regular 14px · #3b82f6
- **Property 1=brand** COMPONENT `2:468` — 64×25 · flex-row gap 10 · pad 4 16 4 16 · justify center · align center · fill #ffe8d9 · radius 50
  - TEXT « label » `2:469` — 32×17 · Inter Regular 14px · #d3590b
- **Property 1=grey** COMPONENT `2:470` — 64×25 · flex-row gap 10 · pad 4 16 4 16 · justify center · align center · fill #e5e7eb · radius 50
  - TEXT « label » `2:471` — 32×17 · Inter Regular 14px · #6b7280

## Card projet

- `2:2379` · COMPONENT · usage : Projets (grille 3×3)
- ⚠ Barre de progression : piste 312×7 #e5e7eb radius 40, aucune portion remplie dessinée (0 %) → couleur de remplissage non spécifiée (hypothèse : #d3590b).

### Détail

- **Card projet** COMPONENT `2:2379` — 380×351 · flex-col gap 56 · pad 30 34 30 34 · justify start · align start · fill #ffffff · stroke #e5e7eb · radius 10
  - **Frame 38** FRAME `2:2377` — 312×67 · flex-col gap 8 · pad 0 · justify start · align start
    - TEXT « Nom du projet » `2:2323` — 312×25 · Manrope SemiBold 18px · #1f1f1f
    - TEXT « Développement de la nouvelle version de l'API REST avec authentification JWT » `2:2324` — 312×34 · Inter Regular 14px · #6b7280
  - **Frame 32** FRAME `2:2329` — 312×58 · flex-col gap 16 · pad 0 · justify start · align end
    - **Frame 31** FRAME `2:2328` — 312×15 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 224 ignoré)
      - TEXT « Progression » `2:2326` — 68×15 · Inter Regular 12px · #6b7280
      - TEXT « 0% » `2:2327` — 18×15 · Inter Regular 12px · #1f1f1f
    - **Frame 33** FRAME `2:2334` — 312×27 · flex-col gap 8 · pad 0 · justify start · align start
      - **Frame 30** FRAME `2:2325` — 312×7 · fill #e5e7eb · radius 40
      - **Frame 32** FRAME `2:2331` — 312×12 · flex-row gap auto · pad 0 · justify space-between · align center (itemSpacing Figma 224 ignoré)
        - TEXT « 0/2 tâches terminées » `2:2332` — 101×12 · Inter Regular 10px · #6b7280
  - **Frame 39** FRAME `2:2378` — 180×54 · flex-col gap 15 · pad 0 · justify start · align start
    - **Frame 37** FRAME `2:2376` — 68.58×12 · flex-row gap 8 · pad 0 · justify start · align start
      - **Union** BOOLEAN_OPERATION `2:2350` — icône 11.58×11 · fill #6b7280 → `icon-users.svg`
      - TEXT « Équipe (3) » `2:2356` — 49×12 · Inter Regular 10px · #6b7280
    - **Frame 36** FRAME `2:2375` — 180×27 · flex-row gap 4 · pad 0 · justify start · align center
      - **Frame 34** FRAME `2:2367` — 141×27 · flex-row gap 5 · pad 0 · justify start · align center
        - **User icon** FRAME `2:2360` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #ffe8d9 · radius 13.5
          - TEXT « AD » `2:2361` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
        - **Tag** INSTANCE ⟨Tag · Property 1=brand⟩ `2:2364` — 109×25 · (= composant) — cf. composants.md `2:468`
          - texte « Propriétaire »
      - **Frame 35** FRAME `2:2374` — 46×27 · flex-row gap -8 · pad 0 · justify start · align center
        - **User icon** FRAME `2:2369` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
          - TEXT « BD » `2:2370` — 14×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER
        - **User icon** FRAME `2:2372` — 27×27 · flex-col gap 4.15 · pad 8.72 4.98 8.72 4.98 · justify center · align center · fill #e5e7eb · stroke #ffffff · radius 13.5
          - TEXT « CV » `2:2373` — 15×7 · Inter Regular 10px · #0f0f0f · ls 2% · case UPPER

## IA button

- `2:4107` · COMPONENT_SET · usage : Modales IA (24×24, Default)
- Variantes : `Property 1=Default` (`2:4106`), `Property 1=focus` (`2:4108`)

### Comparatif des variantes (valeurs qui changent)

| Variante | Valeurs |
|---|---|
| `Property 1=Default` | **Ellipse 4** : fill #d3590b ; **Star 1** : fill #ffffff |
| `Property 1=focus` | **Ellipse 4** : fill #ffe8d9 ; **Star 1** : fill #d3590b |

### Détail

- **Property 1=Default** COMPONENT `2:4106` — 40×40 · positionnement libre (pas d'auto-layout) → asset `ia-button.svg`
  - **Ellipse 4** ELLIPSE `2:4101` — vecteur 40×40 · contraintes H=SCALE V=SCALE · fill #d3590b
  - **Star 1** STAR `2:4104` — vecteur 14×14 · contraintes H=SCALE V=MIN · fill #ffffff · radius 0.67
- **Property 1=focus** COMPONENT `2:4108` — 40×40 · positionnement libre (pas d'auto-layout) → asset `ia-button-focus.svg`
  - **Ellipse 4** ELLIPSE `2:4109` — vecteur 40×40 · contraintes H=SCALE V=SCALE · fill #ffe8d9
  - **Star 1** STAR `2:4110` — vecteur 14×14 · contraintes H=SCALE V=MIN · fill #d3590b · radius 0.67

