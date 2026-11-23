# Log In

- **Node id** : `1:2` · **Type** : FRAME · **Taille** : 1440×1024 px
- **Fond** : fill **IMAGE** (photo bureau : clavier, mètre ruban, stylo, carnet) sur tout le frame 1440×1024 ; panneau gauche `Frame 1` 562×1024 fond #f9fafb par-dessus. Partie visible de l'image : x 562→1440 → `../assets/images/login-background.png` (878×1024).
- **Capture** : [`../screens/log-in.png`](../screens/log-in.png)
- **Stats spec** : 23 nœuds, 7 textes, 6 instances, 14 frames auto-layout
- **Icônes utilisées** : `../assets/icons/logo-orange.svg`

> Légende : `flex-row|col gap G · pad T R B L · justify/align` = auto-layout Figma (gap/padding en px). `gap auto` = SPACE_BETWEEN.
> `fill`/`stroke` = couleurs brutes (aucune variable Figma). Bordures : **1 px** partout (épaisseur absente de la spec, mesurée sur les PNG).
> Pour les INSTANCE, seuls les textes et les écarts (« diffs ») par rapport au composant principal sont listés ; la structure complète est dans [composants.md](composants.md).
> Valeurs non fournies par le pont DesignAgent : alignement de texte, soulignement, épaisseur de bordure, paramètres d'ombre, opacité, mode hug/fill ; positions x/y uniquement mesurées sur les PNG (marquées « mesuré »).

## Notes d'intégration

- Mise en page : frame racine en auto-layout vertical (pad 0, gap 10) ; seul enfant `Frame 1` (panneau formulaire 562×1024, colonne centrée, pad 55/140, gap 202) → logo en haut, formulaire au centre, lien « Créer un compte » en bas.
- Titre « Connexion » centré horizontalement (visible sur le PNG ; textAlign non fourni). Liens soulignés (PNG).
- Champs Email / Mot de passe : placeholders masqués (`Show Input=false`) → champs vides.

## Arbre

- **Log In** FRAME `1:2` — 1440×1024 · flex-col gap 10 · pad 0 · justify start · align start · fill IMAGE
  - **Frame 1** FRAME `2:58` — 562×1024 · flex-col gap 202 · pad 55 140 55 140 · justify center · align center · fill #f9fafb
    - **Logo** INSTANCE ⟨Logo · Color=orange⟩ `2:147` — icône 252.57×32.17 → `logo-orange.svg`
    - **Frame 7** FRAME `2:159` — 282×385 · flex-col gap 30 · pad 0 · justify start · align center
      - TEXT « Connexion » `2:82` — 282×55 · Manrope Bold 40px · #d3590b
      - **Frame 6** FRAME `2:141` — 282×300 · flex-col gap 21 · pad 0 · justify start · align center
        - **Frame 5** FRAME `2:136` — 282×262 · flex-col gap 29 · pad 0 · justify start · align center
          - **Frame 4** FRAME `2:135` — 282×183 · flex-col gap 29 · pad 0 · justify start · align start
            - **2 × Input** (structure identique ; ids `2:89`, `2:94`) — détail du 1er ci-dessous
              - Valeurs qui varient :
                1. `2:89` : texte : « Email »
                2. `2:94` : texte : « Mot de passe »
              - **Input** INSTANCE ⟨Input · Show Input=False, Property 1=Default⟩ `2:89` — 282×77 · (= composant) — cf. composants.md `2:86`
                - texte « Email »
                - Frame 2 `I2:89;2:83` — diffs : 282×53
          - **Button** INSTANCE ⟨Button · Property 1=Default⟩ `2:109` — 249×50 · (= composant) — cf. composants.md `2:100`
            - texte « Se connecter »
        - **Link** INSTANCE ⟨Link · Property 1=Default⟩ `2:137` — 141×17 · (= composant) — cf. composants.md `2:122`
          - texte « Mot de passe oublié? »
    - **Frame 8** FRAME `2:160` — 282×17 · flex-row gap 10 · pad 0 · justify start · align center
      - TEXT « Pas encore de compte ? » `2:112` — 160×17 · Inter Regular 14px · #000000
      - **Link** INSTANCE ⟨Link · Property 1=Default⟩ `2:131` — 111×17 · (= composant) — cf. composants.md `2:122`
        - texte « Créer un compte »
