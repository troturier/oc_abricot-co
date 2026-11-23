# Spécifications d'intégration (maquette Figma « Abricot »)

Extraction du 2026-11-23 via le pont DesignAgent (`get_spec` sur chaque nœud, fichier Figma « Abricot (Copy) », Page 1).
Source de vérité : **valeurs brutes** de la spec. Il n'existe aucune variable Figma (`export_tokens` vide) ; les `styleRefs` signalés ne sont pas résolus par le pont.

## 1. Index des écrans

| Écran | Node id | Taille | Spec | Capture |
|---|---|---|---|---|
| Composants (bibliothèque) | `2:4717` | 3519×3168 | [composants.md](composants.md) | [composants.png](../screens/composants.png) |
| Log In | `1:2` | 1440×1024 | [log-in.md](log-in.md) | [log-in.png](../screens/log-in.png) |
| Sign In (inscription) | `2:161` | 1440×1024 | [sign-in.md](sign-in.md) | [sign-in.png](../screens/sign-in.png) |
| Dashboard (vue liste) | `2:195` | 1440×1744 | [dashboard.md](dashboard.md) | [dashboard.png](../screens/dashboard.png) |
| Dashboard vue Kanban | `24:1052` | 1440×1744 | [dashboard-vue-kanban.md](dashboard-vue-kanban.md) | [dashboard-vue-kanban.png](../screens/dashboard-vue-kanban.png) |
| Projets | `2:2266` | 1440×1534 | [projets.md](projets.md) | [projets.png](../screens/projets.png) |
| Single projet | `2:2662` | 1440×1852 | [single-projet.md](single-projet.md) | [single-projet.png](../screens/single-projet.png) |
| Modale création de tâche | `2:3852` | 598×799 | [modale-cr-ation-de-t-che.md](modale-cr-ation-de-t-che.md) | [png](../screens/modale-cr-ation-de-t-che.png) |
| Modale création de tâche IA | `2:4044` | 598×797 | [modale-cr-ation-de-t-che-ia.md](modale-cr-ation-de-t-che-ia.md) | [png](../screens/modale-cr-ation-de-t-che-ia.png) |
| Modale liste de tâche IA | `2:4121` | 598×859 | [modale-liste-de-t-che-ia.md](modale-liste-de-t-che-ia.md) | [png](../screens/modale-liste-de-t-che-ia.png) |
| Modale modifier une tâche | `2:4254` | 598×799 | [modale-modifier-une-t-che.md](modale-modifier-une-t-che.md) | [png](../screens/modale-modifier-une-t-che.png) |
| Modale création projet | `2:4294` | 598×616 | [modale-cr-ation-projet.md](modale-cr-ation-projet.md) | [png](../screens/modale-cr-ation-projet.png) |
| Modale modifier projet | `2:4334` | 598×616 | [modale-modifier-projet.md](modale-modifier-projet.md) | [png](../screens/modale-modifier-projet.png) |
| Mon compte | `2:4443` | 1440×1044 | [mon-compte.md](mon-compte.md) | [mon-compte.png](../screens/mon-compte.png) |

Tous les nœuds ont été extraits intégralement (nombre de nœuds de la spec = nombre de nœuds parcourus, aucune troncature).

### Ce que la spec ne fournit pas (et comment c'est comblé)

| Donnée manquante | Traitement |
|---|---|
| Positions x/y (frames racine en positionnement libre, footer, icônes « fermer » des modales) | **Mesurées sur les PNG** (échelle 1:1), indiquées « mesuré » dans chaque spec |
| Épaisseur des bordures | Mesurée : **1 px** partout |
| Paramètres d'ombre (seul « shadow » est indiqué, sur `Menu`) | Estimée sur PNG : ombre très légère ~10 px vers le bas, ≈ rgba(0,0,0,.03–.04) |
| Alignement de texte, soulignement, rotation, opacité, mode hug/fill | Non fourni → se référer aux PNG (titres Log In/Sign In centrés, liens soulignés, séparateurs « | » verticaux) |
| Line-height | `AUTO` partout → Inter ≈ 1.21 (boîtes 12/15/17/19/22 px pour 10/12/14/16/18 px), Manrope ≈ 1.37 (25/33/55 px pour 18/24/40 px) |

## 2. Tokens observés

### Palette

| Hex | Rôle / usages |
|---|---|
| `#d3590b` | **Primaire / marque** : logo, onglets de menu inactifs (texte + icône), liens, chips (texte + icône), texte Tag `brand`, fond avatar `focus`, bouton « IA » (FRAME), cercle `IA button`, bordure + texte `Button Outline orange`, bordure + icône `Icon button focus`, titre Log In/Sign In |
| `#ffe8d9` | Primaire clair : fond avatar par défaut (« AD »), fond chips sélectionnée, fond Tag `brand`, cercle `IA button focus` |
| `#ff8b42` | Étoile « IA » à côté des titres des modales IA |
| `#1f1f1f` | Fond bouton primaire `Button Default`, titres Manrope (h1/h2/h3), date « 9 mars » + icône calendrier dans les cartes `projet` |
| `#0f0f0f` | Fond onglet de menu actif (`… hover`), fond `Button focus`, initiales des avatars, chevrons, logo noir |
| `#000000` | Texte courant : labels de champs, noms de tâche, sous-titre du dashboard, texte footer, commentaires |
| `#6b7280` | Texte secondaire (descriptions, méta, placeholders, valeurs de champ), icônes (calendrier, recherche, commentaire, fermer, more, edit) |
| `#9ca3af` | Tertiaire : icônes dossier-sm / poubelle, séparateurs « | », texte des boutons `disabled` (+ Link disabled, mesuré) |
| `#e5e7eb` | Bordures (inputs, cartes, conteneurs, icon buttons, séparateurs horizontaux), fond `Button disabled`, fond Tag `grey`, fond avatars des autres membres, piste de progression |
| `#f3f4f6` | Fond bulle de commentaire, bandeau « Contributeurs » |
| `#f9fafb` | Fond de l'application, panneau formulaire Log In/Sign In, fond champ « Ajouter un commentaire », champ de prompt IA |
| `#ffffff` | Surfaces (cartes, menu, footer, modales, inputs), texte sur fonds sombres, bordure blanche des avatars superposés |
| `#ef4444` / `#ffe0e0` | Statut **À faire** (texte / fond Tag `red`) ; `#ffe0e0` aussi en bordure des 3 colonnes Kanban |
| `#e08d00` / `#fff0d7` | Statut **En cours** (Tag `orange`) |
| `#27ae60` / `#f1fff7` | Statut **Terminée** (Tag `green`) |
| `#3b82f6` / `#e0ecff` | Tag `blue` — **non utilisé** dans les écrans |
| `#9747ff`, `#c4c4c4` | Habillage Figma (bordures pointillées des COMPONENT_SET, fond de section) — **à ignorer** |

### Typographie

Polices : **Inter** (Regular 400 uniquement) et **Manrope** (SemiBold 600, Bold 700). Aucune autre graisse observée. Letter-spacing 0 sauf initiales d'avatar (2 %, capitales).

| Police | Taille | Usages |
|---|---|---|
| Manrope Bold | 40 | Titres d'auth « Connexion », « Inscription » (#d3590b) |
| Manrope SemiBold | 24 | Titres de page (« Tableau de bord », « Mes projets », « Nom du projet ») et de modale (#1f1f1f) |
| Manrope SemiBold | 18 | Titres de section/carte (« Mes tâches assignées », « Nom de la tâche », « Contributeurs », colonnes Kanban, « Mon compte ») |
| Inter Regular | 18 | Sous-titres de page (« Bonjour Alice Dupont… », description du projet) |
| Inter Regular | 16 | Boutons, onglets de menu, sous-titres de section (« Par ordre de priorité »), footer, nom d'utilisateur |
| Inter Regular | 14 | Texte courant : labels, descriptions, tags, liens, chips, recherche, « Commentaires (1) » ; initiales avatar 65 px (2 %, UPPER) |
| Inter Regular | 12 | Méta des cartes (projet, date, compteur), valeurs saisies dans les champs, « Supprimer / Modifier », progression |
| Inter Regular | 10 | Commentaires, horodatage, « Équipe (3) », « 0/2 tâches terminées », prompt IA ; initiales avatar 27 px (2 %, UPPER) |

### Rayons

| Valeur | Usage |
|---|---|
| 4 | Champs de saisie (`Input › Frame 2`) |
| 8 | Chips, champ de recherche, filtre « Statut » |
| 10 | Boutons, cartes (tâche, projet), conteneurs blancs, modales, onglets de menu, icon buttons, bandeau contributeurs, bulles de commentaire |
| 13.5 / 32.5 | Avatars ronds 27 px / 65 px |
| 40 | Piste de barre de progression |
| 50 | Tags (pilule) |
| 80 | Champ de prompt IA (pilule) |

### Espacements récurrents

- **Gaps** : 4, 7 (label → champ), 8, 10, 14, 15, 16, 17 (liste de tâches), 22 (colonnes Kanban), 24 (champs de formulaire), 32, 37, 40/41 (blocs de section), 56 (blocs de modale).
- **Paddings** : Tag 4/16 · Input 19/17 · Button 13/74 · Chips 14/16 · onglet de menu 27/62 · Menu 8/100 · carte tâche 25/40 · Card projet 30/34 · conteneur blanc de page 40/59 · colonne Kanban 40/24 · modale 79/73 · recherche / filtre 23/32 · bulle commentaire 18/14 · bandeau contributeurs 20/50 · panneau auth 55/140.
- **Grille de page** : contenu 1215 px à x=100 (Dashboard, Mon compte) — voir incohérences plus bas.

### Bordures et ombres

- Bordures : **1 px** `#e5e7eb` (inputs, cartes, conteneurs, recherche, icon buttons) ; `#d3590b` (états focus / outline) ; `#ffe0e0` (colonnes Kanban) ; `#ffffff` (avatars superposés).
- Séparateurs : traits `#e5e7eb` pleine largeur (cartes `projet`, modale IA) ; traits `#9ca3af` 11 px entre les méta des cartes (affichés verticaux sur les PNG).
- Ombre : uniquement sur `Menu` (paramètres non exportés, voir §1). Aucune autre élévation.

## 3. Inventaire des composants

| Composant | Id | Variantes | Écrans |
|---|---|---|---|
| Input | `2:3868` | Default · date picker (icône calendrier) · Combo box (chevron) ; booléen `Show Input` (valeur/placeholder visible) | Log In, Sign In, 6 modales, Mon compte |
| Logo | `2:59` | orange · white · black | Auth (orange 252×32), Menu (orange 147×18.7), Footer (noir 101×12.9) ; white inutilisé |
| Button | `2:102` | Default (#1f1f1f) · Outline orange · focus (#0f0f0f) · disabled | Partout ; Outline inutilisé |
| Link | `2:123` | Default · focus · disabled | Log In, Sign In, Single projet |
| Icon button | `2:2983` | Back · Back focus · See more · See more focus | Single projet |
| Menu | `2:295` | — | Dashboard, Kanban, Projets, Single projet, Mon compte |
| Menu items | `2:225` | Dashboard · Dashboard hover · Projets · Projets hover | Menu |
| User icon | `2:268` | Default · focus | Menu |
| Footer | `2:4400` | — | Dashboard, Kanban, Projets, Single projet, Mon compte |
| Chips | `2:369` | task hover · task focus · list · list focus · project · mes projets focus | Dashboard, Kanban, Single projet |
| Tag | `2:461` | green · red · orange · blue · brand · grey | Statuts, rôles, personnes, compteurs |
| Tâche liste | `2:3187` | thumbnail · Tâche Kanban · Tâche IA · projet · projet comment | Dashboard, Kanban, Modale liste IA, Single projet |
| Comment | `2:3281` | Default · add comment | Tâche liste › projet comment |
| Card projet | `2:2379` | — | Projets |
| IA button | `2:4107` | Default · focus | Modales IA |

Éléments **non composants** (FRAME détachés) à factoriser côté code : avatars 27 px (`User icon` FRAME), bouton « IA » orange de Single projet (`2:3486`), barre de recherche et filtre « Statut », champ de prompt IA (`Comment` FRAME dans les modales IA), icône « fermer » des modales.

## 4. Assets exportés

### Icônes et logos (SVG, `design/assets/icons/`)

Une seule exportation par forme ; les couleurs sont figées dans le SVG (`fill`/`stroke`) → à remplacer par `currentColor` si l'icône change de couleur selon l'état.

| Fichier | Node(s) source | Usage / couleurs observées |
|---|---|---|
| `logo-orange.svg` | `2:57` (Logo Color=orange) | Auth, Menu — #d3590b |
| `logo-white.svg` | `2:60` (Logo Color=white) | Non utilisé dans les écrans |
| `logo-black.svg` | `2:71` (Logo Color=black) | Footer — #0f0f0f |
| `ia-button.svg` | `2:4106` (IA button Default, 40×40) | Bouton d'envoi du prompt IA (24×24 dans les modales) |
| `ia-button-focus.svg` | `2:4108` (IA button focus) | État focus/hover du bouton IA |
| `icon-sparkle.svg` | `2:4084` (aussi `2:4124`, `2:3488`) | Étoile IA : titres modales IA (#ff8b42), bouton « IA » (#ffffff) |
| `icon-dashboard.svg` | `2:218` (aussi `2:227`) | Onglet « Tableau de bord » — #d3590b / #ffffff (actif) |
| `icon-folder.svg` | `2:254` (aussi `2:259`) | Onglet « Projets » 29×22.5 — #d3590b / #ffffff |
| `icon-folder-sm.svg` | `2:444` (aussi `2:450`, `2:520`, `24:1355`) | Chips « Mes projets » (#d3590b), méta « Nom du projet » des cartes (#9ca3af) |
| `icon-task-checkbox.svg` | `2:361` (aussi `2:372`) | Chips « Mes tâches / Liste » — #d3590b |
| `icon-calendar.svg` | `2:3873` (aussi `2:405`, `2:416`, `2:526`, `24:1361`, `2:3334`, `2:3227`) | Date picker, chips « Kanban / Calendrier », échéances — #6b7280 / #d3590b / #1f1f1f |
| `icon-comment.svg` | `2:1552` (aussi `24:1372`) | Compteur de commentaires — #6b7280 |
| `icon-search.svg` | `2:2314` (aussi `2:2998`) | Champ « Rechercher une tâche » — #6b7280 |
| `icon-users.svg` | `2:2350` | « Équipe (3) » sur Card projet — #6b7280 |
| `icon-arrow-left.svg` | `2:2980` (aussi `2:2985`) | Icon button Back — #000000 / #d3590b (focus) |
| `icon-more.svg` | `2:3388` (aussi `2:3393`) | Icon button See more — #6b7280 / #d3590b |
| `icon-chevron-down.svg` | `2:4013` (aussi `2:3850`, `2:3320`) | Combo box, filtre Statut, carte dépliée — #0f0f0f / #6b7280 (contour 1 px) |
| `icon-chevron-up.svg` | `2:3356` | Carte `projet` repliée — #0f0f0f |
| `icon-trash.svg` | `2:4176` | « Supprimer » (Tâche IA) — #9ca3af |
| `icon-edit.svg` | `2:4189` | « Modifier » (Tâche IA) — #6b7280 |
| `icon-close.svg` | `2:4358` (identique `2:4362`, `2:4370`, `2:4374`, `2:4378`, `2:4382`) | Fermer les modales — #6b7280, 14.33×14.33 |

46 nœuds exportés, dédoublonnés par contenu SVG (chemins identiques à la couleur près) → 21 fichiers conservés.

### Images (PNG, `design/assets/images/`)

| Fichier | Node | Usage |
|---|---|---|
| `login-background.png` (878×1024) | `1:2` (fill image du frame racine) | Visuel droit de Log In |
| `signup-background.png` (878×1024) | `2:161` (fill image du frame racine) | Visuel droit de Sign In (photo différente) |

⚠ L'image est le **fill du frame racine** (aucun nœud enfant ne la porte) : le frame entier a été exporté puis recadré sur la partie visible (x 562→1440). Conséquences : seule la portion visible est disponible, et l'export est sorti en **1x** alors que l'échelle 2 était demandée (le pont annonçait 2880×2048 mais a écrit 1440×1024). Pour un rendu Retina, récupérer l'image source dans Figma (fill du frame) manuellement. Aucun avatar image : les avatars sont des initiales.

## 5. Points d'attention

### Incohérences de maquette

1. **Grille de page non homogène** : contenu à x=100 / 1215 px (Dashboard, Kanban, Mon compte), x=137 / 1166 px (Projets), x=112 et bouton retour à x=44 (Single projet). Logo du footer à x=30 alors que celui du menu est à x=100. Chips du Dashboard à x=105 (5 px de décalage).
2. **Footer mal calé** : déborde de 4 px sous Projets (frame 1534, footer à y=1470), laisse 6 px de fond sous Single projet.
3. **Link** : le pont renvoie #d3590b pour les 3 variantes alors que le rendu montre focus ≈ #0f0f0f et disabled #9ca3af (mesuré sur le PNG).
4. **Nommage des états** : les variantes `Menu items … hover` servent d'état **actif** ; `Chips task hover` est l'état **non sélectionné**. Les états réellement « survol » ne sont pas dessinés.
5. **Chevrons inversés** : carte dépliée (`projet comment`) = chevron bas, carte repliée (`projet`) = chevron haut.
6. **Icône calendrier** utilisée pour « Kanban » et pour « Calendrier » ; la vue Calendrier n'est pas maquettée.
7. **Colonnes Kanban** toutes bordées `#ffe0e0` (rouge « À faire ») y compris « En cours » et « Terminées » ; titre de colonne « Terminées » vs tag « Terminée ».
8. **Débordements** : Single projet `Frame 42` 789 px dans `Frame 41` 761 px ; `Frame 45` « Assigné à » 145 px pour ~324 px de contenu ; Modale liste IA : trait et bloc bas de 600 px et cartes de 494 px dans une zone utile de 452 px.
9. **Largeurs de bouton** : padding horizontal 74 px mais largeurs fixées au cas par cas (121, 141, 181, 209, 217, 242, 244, 249 px) ; « Modifier les informations » (texte 187 px) dans 242 px → padding réel ≈ 27 px. Reprendre les largeurs de la spec ou définir une règle hug.
10. **Contenus factices incohérents** : « Bonjour Alice Dupont », avatar « AD », « Amélie Dupont » (Mon compte) ; champs « Input » non renseignés (Modale modifier projet) ; « Gérez vos projets » avec espaces finaux ; « Mot de passe oublié? » sans espace avant « ? » contrairement à « Pas encore de compte ? ».
11. **Sign In = inscription** (titre « Inscription ») avec seulement Email + Mot de passe : pas de nom/prénom alors que « Mon compte » en affiche.
12. **Astérisques** : champs obligatoires marqués « * » à la création (Titre, Description, Échéance) mais pas en modification ; « Assigné à » et « Statut » jamais marqués.
13. **Séparateurs** méta des cartes : spec = `LINE` 11×0 (horizontal), rendu PNG = trait vertical (rotation non exportée).
14. **Couleurs proches non fusionnées** : #000000 / #0f0f0f / #1f1f1f coexistent pour le texte « noir » ; à garder distinctes pour le pixel-perfect ou à unifier par décision.

### Éléments absents / comportements implicites

- **Aucun état** : focus/erreur/validation des inputs, hover des cartes, liens et onglets inactifs, chargement (génération IA, soumission), toasts de confirmation, erreur de connexion.
- **États vides** non maquettés : aucune tâche assignée, aucun projet, recherche sans résultat, aucun commentaire, réponse IA vide (la zone `Frame 63` de la modale IA est vide).
- **Composants ouverts** non maquettés : liste déroulante du Combo box (multi-sélection de collaborateurs), date picker ouvert, menu du bouton « … » (See more), filtre « Statut », menu de l'avatar.
- **Modales** : pas de fond assombri (overlay) dessiné, pas de comportement de défilement ; icône « fermer » en absolu (x≈545, y≈37). Boutons de validation en `disabled` → activation implicite quand le formulaire est valide/modifié.
- **Progression** de Card projet : seule la piste (#e5e7eb) est dessinée (0 %), couleur de remplissage non spécifiée.
- **Mot de passe** (Mon compte) affiché comme texte « ●●●… » → `type="password"`.
- **Responsive** : uniquement des maquettes desktop 1440 px (modales 598 px).
