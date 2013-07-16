---
title: Codingame de janvier 2013
layout: post
tags: Codingame
---        




J'ai participé au [Codingame](http://www.codingame.com/cg/) du 29 janvier, et voici mon compte rendu.

Codingame est un concours de développement ouvert à tous. Il y a trois problèmes à résoudre dans un temps limité. Les participants peuvent rentrer en contact avec des entreprises qui proposent des jobs ou des stages, et il y a des goodies à gagner (10 Rapsberry Pi pour la dernière édition).

Mardi soir, après une bonne journée de boulot, il est 20h, j'ai installé une petite structure de test sur mon mac, et je suis prêt pour le challenge.

Le [premier exercice](http://www.codingame.com/challenge_janvier_2013_question1) a pour but de coder une chaine de caractères en unaire (un codage composé uniquement de "0"). Pas de grosse difficulté, il faut bien lire l'énoncé, et appliquer la règle à la lettre.

Le [deuxième exercice](http://www.codingame.com/challenge_janvier_2013_question2) a pour but de calculer le nombre maximum de traitements qu'on peut exécuter sur un ordinateur. Chaque traitement a une date de début et une durée, et on ne peut exécuter qu'un traitement à la fois. 
Quelques dessins sur une feuille de papier montrent qu'il faut exécuter d'abord le traitement qui se termine le premier. Puis ensuite prendre celui que se termine en premier parmi ceux qui restent. Une fois cette astuce trouvée, le développement devient très simple : il suffit de trier les traitements par date de fin croissante, puis de les parcourir dans l'ordre en retenant tous ceux qu'on peut exécuter. La complexité de l'algorithme est celle du tri, donc O(n log n).

Le [dernier exercice](http://www.codingame.com/challenge_janvier_2013_question2) est bien plus corsé. L'objectif est décoder une séquence de morse dans laquele les espaces ont disparus. Plus précisément, le problème demande de trouver le nombre de phrases qui peuventouvaient se cacher derrière la séquence morse, pour un dictionnaire de mots donné.

Pour résoudre le problème, j'ai utilisé le principe suivant : 
Soit `S(n)` le nombre de phrases qui correspondent aux n premiers caractères de la séquence.

- `S(0) = 1`. Il n'y a qu'une phrase qui correspond à une séquence vide.

- `S(n) = Somme des S(n - k)`, pour chaque cas où la chaine entre les positions `s-k` et `n` correspond à un mot du dictionnaire.

La complexité de l'algorithme est O(n * k) avec n la longueur de la chaine en morse, et k la taille maximum d'un mot (en morse). Si on considère que k est une constante, la complexité est O(n).

Une fois la théorie trouvée et codée, il reste à faire passer les exemples, ce qui n'est pas une mince affaire. Le quatrième exemple proposé ne donne pas le bon résultat. La taille du jeu d'essai (une séquence de 10k caractères et 10k mots dans le dictionnaire) rend le débugage impossible, il faut constituer de nouveaux jeux d'essais. Je trouve la solution en reprenant l'exemple mentionné dans l'énoncé de l'exercice, où plusieurs mots ont la même représentation en morse. Après 2h15 d'effort, je soumets enfin mon code.


Quelques minutes passent en attendant les résultats : 100% de réussite, je suis deuxième en 3h, derrière Blabla04 qui a terminé en 1h40 (chapeau !). Un petit tour sur le chat pour clamer ma fierté, et je peux terminer ma soirée tranquillement.

Le bilan pour moi est vraiment positif. L'organisation est vraiment très bonne (bravo à toute l'équipe), j'ai retrouvé le petit côté stress de l'examen en temps limité, et je suis content d'avoir trouver la solution de chaque problème. 


