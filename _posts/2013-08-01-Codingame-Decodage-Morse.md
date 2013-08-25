---
title: Coding game janvier 2013 - Problème 3
layout: post
tab: blog
tags: Algorithme Codingame Programmation-dynamique
---
Voici ma solution au problème *[La résistance](http://www.codingame.com/challenge_janvier_2013_question3)* qui était au programme du codingame de janvier.
Cette question correspond au problème [1113](http://uva.onlinejudge.org/external/11/1113.html) sur [UVa online Judge](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3554).

En entrée du problème, nous avons une chaine en morse et un dictionnaire.
La chaine en morse ne contient pas de séparation entre les mots. L'objectif
est de déterminer combien de messages différents peuvent correspondre à cette chaine morse.

Exemple :

    Chaine morse    .---.--.-.-.-.---...-.---.

    Dictionnaire
    AT
    TACK
    TICK
    ATTACK
    DAWN
    DUSK

    Première solution
     .-  -     -   .-  -.-. -.-   .-  -     -..  .-  .-- -.
    (A   T)   (T   A   C    K)   (A   T)   (D    A   W   N)

    Seconde solution
     .-  -   -   .-  -.-. -.-   .-  -     -..  .-  .-- -.
    (A   T   T   A   C    K)   (A   T)   (D    A   W   N)


Pour résoudre le problème, j'ai utilisé le principe suivant :
Soit `S(n)` le nombre de phrases qui correspondent aux n premiers caractères de la séquence.

- `S(0) = 1`. Il n'y a qu'une phrase qui correspond à une séquence vide.

- `S(n) = Somme des S(n - k)`, pour chaque cas où la chaine entre les positions `s - k` et `n` correspond à un mot du dictionnaire.


L'algorithme est alors :

    resultat(0) := 0
    n := longueur de la chaine morse
    m := longueur maximum d'un mot du dictionnaire (en morse)

    Pour i de 1 à n faire
        Pour j de (i - m) à i faire
            k := le nombre de mots du dictionnaire dont le code morse correspond entre j et i
            resultat(i) := resultat(k) + k * resultat(i)

    retourne resultat(n)

L'implementation en java est disponible sur [github](https://github.com/OlivierBourgain/AlgoInJava/tree/master/src/com/obourgain/algo/morse).

La complexité de l'algorithme est O(n * m) avec n la longueur de la chaine en morse, et m la taille maximum d'un mot (en morse). Si on considère que m est une constante, la complexité est O(n).

