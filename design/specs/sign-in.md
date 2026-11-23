# Sign In

- **Node id** : `2:161` · **Type** : FRAME · **Taille** : 1440×1024 px
- **Fond** : fill **IMAGE** (photo différente de Log In) sur tout le frame ; panneau gauche `Frame 1` 562×1024 #f9fafb. Partie visible : `../assets/images/signup-background.png` (878×1024).
- **Capture** : [`../screens/sign-in.png`](../screens/sign-in.png)
- **Stats spec** : 21 nœuds, 6 textes, 5 instances, 13 frames auto-layout
- **Icônes utilisées** : `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Écran d'**inscription** (titre « Inscription ») malgré le nom de frame « Sign In ». Mêmes champs que Log In (Email, Mot de passe) : pas de champ nom/prénom ni confirmation de mot de passe.
- Pas de lien « Mot de passe oublié » ; bloc bas « Déjà inscrit ? Se connecter » centré (justify center) alors qu'il est aligné à gauche sur Log In.

## Arbre

- **Sign In** FRAME `2:161` — 1440×1024 · flex-col gap 10 · pad 0 · justify start · align start · fill IMAGE
  - **Frame 1** FRAME `2:162` — 562×1024 · flex-col gap 202 · pad 55 140 55 140 · justify center · align center · fill #f9fafb
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `2:163` — icône 252.57×32.17 → `logo-orange.svg`
    - **Frame 7** FRAME `2:164` — 282×347 · flex-col gap 30 · pad 0 · justify start · align center
      - TEXT « Inscription » `2:165` — 282×55 · Manrope Bold 40px · #d3590b
      - **Frame 6** FRAME `2:166` — 282×262 · flex-col gap 21 · pad 0 · justify start · align center
        - **Frame 5** FRAME `2:167` — 282×262 · flex-col gap 29 · pad 0 · justify start · align center
          - **Frame 4** FRAME `2:168` — 282×183 · flex-col gap 29 · pad 0 · justify start · align start
            - **2 × Input** (structure identique ; ids `2:169`, `2:170`) — détail du 1er ci-dessous
              - Valeurs qui varient :
                1. `2:169` : texte : « Email »
                2. `2:170` : texte : « Mot de passe »
              - **Input** INSTANCE ⟨Input · Show Input=False, Property 1=Default⟩ `2:169` — 282×77 · (= composant) — cf. composants.md `2:86`
                - texte « Email »
                - Frame 2 `I2:169;2:83` — diffs : 282×53
          - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:171` — 217×50 · (= composant) — cf. composants.md `2:100`
            - texte « S’inscrire »
    - **Frame 8** FRAME `2:173` — 282×17 · flex-row gap 10 · pad 0 · justify center · align center
      - TEXT « Déjà inscrit ? » `2:174` — 85×17 · Inter Regular 14px · #000000
      - **Link** INSTANCE ⟨Link · Property 1=Default⟩ `2:175` — 88×17 · (= composant) — cf. composants.md `2:122`
        - texte « Se connecter »
