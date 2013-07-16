---
title: 23 = (1+3)*5+3
layout: post
tags: Algorithme interview
---

Un algorithme qui permet de calculer N en partant de 1, et en ne faisant que des multiplication par 5 et ajouter 3.
Si c'est impossible, retourner "impossible".

Cette [question](http://stackoverflow.com/questions/17652190/how-to-get-the-target-number-with-3-or-5-operations-without-recursion) est apparue récemment sur [StackOverflow](http://stackoverflow.com/).


> This is an interview problem I came across yesterday, I can think of a recursive solution but I wanna know if there's a non-recursive solution.
> Given a number N, starting with number 1, you can only multiply the result by 5 or add 3 to the result. If there's no way to get N through this method, return "Can't generate it".


Dans un premier temps, j'ai cherché la solution la plus simple (même si elle n'est pas optimale).

 1. Si `n = 1 mod 3`, il y a une solution évidente :  `n = 1 + 3 + 3 + ... + 3`.
 2. Si `n = 2 mod 3`, encore une fois, il y a une solution évidente : `n = 1 * 5 + 3 + 3 + ... + 3`.
 3. Si `n = 0 mod 3`, il n'y a pas de solution.

Le dernier point s'explique facilement par le fait qu'à partir de 1, on ne peut générer que des nombres égaux à 1 ou 2 mod 3 :

  - ajouter 3 ne change pas la valeur de n modulo 3
  - un nombre égal à 1 mod 3 multiplié par 5 donne un nombre égal à 2 mod 3
  - un nombre égal à 2 mod 3 multiplié par 5 donne un nombre égal à 1 mod 3


Cette astuce ne génère pas la solution optimale. Par exemple pour n=50, on obtient `n = 1 * 5 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3` au lieu de `(1 + 3 + 3 + 3) * 5`.

###Comment trouver la solution optimale, la solution récursive.

L'algorithme qui semble le plus évident est récursif, et ne pose pas de difficulté particulière.

C'est un algorithme glouton. A chaque étape, il fait un choix optimal localement (il préfère diviser par 5 que de soustraire 3), en espérant que le résultat soit un optimum global.
Je n'ai pas de preuve que cet algorithme donne le résultat optimal, mais je n'ai pas trouvé de contre exemple.

     Fonction DecomposeRecursif(n)
        # Cas particuliers
        si n = 2 ou n mod 3 = 0 alors retourne "Pas de décomposition"

        # Conditions d'arrêt de la récursion
        si n = 1 alors retourne "1"
        si n = 5 alors retourne "1*5"    # Pour éviter de générer (1)*5

        si n mod 5 = 0 et n <> 10
            retourne "(" + DecomposeRecursif(n / 5) + ") * 5"
        sinon
            retourne DecomposeRecursif(n - 3) + " + 3"


###Comment trouver la solution optimale, la solution itérative ?

Transformer l'algorithme précédent en algorithme itératif n'est pas évident au premier abord.
Il faut utiliser une pile pour stocker la liste des opérations nécessaire, puis utiliser cette pile pour reconstituer la chaine de caractères en sortie.

     Fonction DecomposeIteratif(n)
        # Cas particuliers
        si n = 2 ou n mod 3 = 0 alors retourne "Pas de décomposition"

        # Calcule la suite d'opération pour arriver à 1
        p := nouvelle pile
        tant que n > 1 faire

            si n = 10 || n mod 5 <> 0
               empile(p , "+3")
               n := n - 3
            si   # si k mod 5 = 0
               empile(p, "*5")
               n := n / 5

        fin tant que

        # Génère la chaine de caractère du résultat
        resultat = "1"
        tant que pile p non vide faire

            operation = depile(p)

            si operation = "+3"
               resultat := resultat + " + 3"
            sinon
               resultat := "(" + resultat + ") * 5"

        fin tant que

        retourne resultat

