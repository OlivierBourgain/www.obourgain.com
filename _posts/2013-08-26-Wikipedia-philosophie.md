---
title: Tous les articles de Wikipedia mènent à la page Philosophie
layout: post
tab: blog
tags: Wikipedia
---

Un article dans Wikipédia
explique qu'en cliquant sur le premier wikilien du résumé introductif d'un article,
et en répétant cette action sur chacun des articles visités ainsi, le parcours aboutit à l'article [philosophie](http://fr.wikipedia.org/wiki/Philosophie). J'ai testé cette affirmation.



####Tous les articles mènent à philosophie.

Le fait est documenté sur Wikipedia en anglais ([Getting to Philosphy](http://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy)) depuis mai 2008.
Cet article également sur Wikipedia France ([Se rendre à l'article philosophie](http://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Se_rendre_%C3%A0_l'article_philosophie)).

Les règles sont les suivantes :

1. Il faut cliquer sur le premier lien, sauf s'il est entre parenthèse ou en italique
2. Il faut ignorer les liens externes, les liens vers la page elle même et les liens rouges (liens vers une page qui n'existe pas)
3. On s'arrête dès qu'on atteint Philosophie ou si on tombe sur une boucle.

Au 26 mai 2011, 94,52% des articles de wikipedia anglais mènent à philosophie.


####Analyse de Wikipédia France

J'ai commencé par télécharger le contenu de Wikipédia France ([dump du 25/07/2013](http://dumps.wikimedia.org/frwiki/20130725/)).

Le dump contient deux fichiers :

- un index d'articles contenant 3 253 816 entrées.
- un fichier XML de 10 Go contenant la dernière version de ces articles au format [wikicode](http://fr.wikipedia.org/wiki/Wikitexte).

La première étape consiste à identifier le premier lien de chaque article. Les liens sont en général identifiés par des doubles crochets,
par exemple `[[Page 1]]`. Le traitement est assez compliqué, car il y a de nombreux cas particuliers à prendre en compte (modèles, liens rouges, liens vers des images fichiers, redirection, ...).

La seconde étape consiste à calculer le cycle correspondant à chaque article.
J'utilise pour cela l'[algorithme du lièvre et de la tortue](http://fr.wikipedia.org/wiki/Algorithme_du_li%C3%A8vre_et_de_la_tortue).

####Résultats

Le traitement prend environ 2h sur mon MacBook minutes, et calcule
qu'au 25 juillet 2013, **85,3% des pages de Wikipédia France mènent vers Philosophie**.


Voici les principaux cycles que j'ai identifié :

<table class="table table-bordered table-stripped">
<thead>
<tr>
<th>Nombre</th>
<th>%</th>
<th>Cycle final</th>
</tr>
</thead>
<tr>
<td>2&nbsp;040&nbsp;794</td>
<td>85,3%</td>
<td>Philosophie - Théorie de l'activité - Conscience - Philosophie</td>
</tr>
<tr>
</td>
<td>99&nbsp;658</td>
<td>4,2%</td>
<td>Bâtiment (construction) - Immeuble - Bâtiment (construction)</td>
</tr>
<tr>
<td>36&nbsp;530</td>
<td>1,5%</td>
<td>Besoin - Désir - Besoin</td>
</tr>
<tr>
<td>34&nbsp;887</td>
<td>1,5%</td>
<td>Entreprise - Client - Fournisseur - Entreprise</td>
</tr>
<tr>
<td>34 398</td>
<td>1,4%</td>
<td>Caractère (typographie) - Lettre (écriture) - Caractère (typographie)</td>
</tr>
<tr>
<td>17&nbsp;473</td>
<td>0,7%</td>
<td>Pas de cycle (on arrive à une page sans successeur)</td>
</tr>
<tr>
<td>10 236</td>
<td>0,4%</td>
<td>Atome - Corps simple - Élément chimique - Atome</td>
</tr>
<tr>
<td>9 027</td>
<td>0,4%</td>
<td>Renaissance - Renaissance italienne - Renaissance (période historique) - Renaissance</td>
</tr>
<tr>
<td>7 678</td>
<td>0,3%</td>
<td>Cyclisme -> Cyclisme urbain -> Cyclisme </td>
</tr>
</table>



Le code correspondant à cet article est disponible sur [Github](https://github.com/OlivierBourgain/WikipediaPhilosophie).
