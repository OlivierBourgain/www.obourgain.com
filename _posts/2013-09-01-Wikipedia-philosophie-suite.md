---
title: Tous les articles de Wikipedia mènent à la page Philosophie (la suite)
layout: post
tab: blog
tags: Wikipedia  Application
---

Nous avons vu [précédemment](/blog/2013/08/26/Wikipedia-philosophie.html) que 85% des articles de
Wikipédia France menaient à la page Philosophie.

Pour visualiser cela, j'ai développé une petite application, qui va lister toutes les pages rencontrées sur le chemin :
[www.obourgain.com/wikiloop](http://www.obourgain.com/wikiloop).




####Comment ça marche ?

L'application est juste composée d'un serveur REST déployé sur une instance Amazon EC2, et d'une page HTML qui utilise
AngularJs et JQuery. Pour la recherche, j'utilise directement  le [service de suggestion de Wikipédia](http://www.mediawiki.org/wiki/API:Opensearch).

Le code source est sur [Github](https://github.com/OlivierBourgain/Wikiloop).






