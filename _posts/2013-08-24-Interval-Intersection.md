---
title: Question pour entretien
layout: post
tags: Algorithme Interview
---

Etant donné une liste d'intervalles fermés `[a1, b1]`, `[a2, b2]`, ..., `[an, bn]`. Trouver le plus grand nombre Q tel qu'il existe un nombre qui appartient à Q intervalles.


L'astuce pour résoudre ce problème est de considérer de façon indépendante la liste des débuts d'intervalle et
la liste des fins d'intervalle.

On trouve ensuite facilement Q en parcourant l'ensemble des points (de début et de fin). A chaque fois qu'on rencontre un début d'intervalle,
on incrémente Q. A chaque fois qu'on sort d'un intervalle, on décrémente Q.
La solution est la valeur maximale de Q.

Voici l'algorithme :

    fonction findMaxOverlapingInterval([a1, b1], [a2, b2], ... , [an, bn])

        A := tableau des a1 à an
        B := tableau des b1 à bn

        trier(A)
        trier(B)

        indexA := 1
        indexB := 1
        q := 0
        maxq := 0

        Tant que indexA <= n
            si A[indexA] < B[indexB] alors
                indexA := indexA + 1
                q := q + 1
                si q > maxq alors maxq = q
            finsi
            si A[indexA] > B[indexB] alors
                indexB := indexB + 1
                q := q - 1
            finsi
            si A[indexA] = B[indexB] alors
                // Pas de changement pour q
                indexA := indexA + 1
                indexB := indexB + 1

        retourne maxq


La compléxité de l'algorithme est O(n * logn), à cause de l'étape de tri initiale.

L'implementation en java est disponible sur [github](https://github.com/OlivierBourgain/AlgoInJava/tree/master/src/com/obourgain/algo/intervalintersect).
