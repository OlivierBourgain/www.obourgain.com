---
title: L'algorithme du lièvre et de la tortue
layout: post
tags: Algorithme java
---

Comment déterminer si une liste chaînée contient un cycle ?

[Robert Floyd](http://fr.wikipedia.org/wiki/Robert_Floyd) a inventé un algorithme pour cela. Cette algorithme est appelé *Algorithme de détection de cycle* ou plus simplement *[Algorithme du lièvre et de la tortue](http://fr.wikipedia.org/wiki/Algorithme_du_li%C3%A8vre_et_de_la_tortue)* (*Tortoise and hare algorithm* pour les anglophones).

Le principe de cet algorithme est le suivant : deux pointeurs parcourent la liste à des vitesses différentes. Le premier (la tortue) avant d'un élément à la fois. Le second (le lièvre) avance de deux éléments à chaque étape. Si le lièvre rattrape la tortue, alors la liste contient un cycle.

    Fonction existeCycle
        tortue = root.next
        lievre =  root.next.next

        tant que tortue <> lievre
            si lievre.next = null ou lievre.next.next = null alors retourne FAUX
            tortue = tortue.next
            lievre = lievre.next.next

        Retourne VRAI

Si λ est le nombre d'éléments dans le cycle, et μ le nombre d'éléments à l'exérieur du cycle, alors la complexité de l'algorithme est O(λ + μ), puisque dans le pire des cas la tortue parcourera l'ensemble du cycle avant de se faire rattaper par le lièvre.

En complétant un peu l'algorithme, il est possible de déterminer les valeurs de λ et μ.

        Fonction calculeLambdaEtMu(root)
           tortue = root.next
           lievre =  root.next.next

           tant que tortue <> lievre
               si lievre.next = null ou lievre.next.next = null alors retourne "Pas de cycle"
               tortue = tortue.next
               lievre = lievre.next.next

           # A ce stade, on sait que x(i) = x(2 * i)
           # donc que i est un multiple de λ (mais on ne connait pas i).

           # On cherche la valeur de μ.

           # Pour cela, on part du constat suivant :
           # Si la tortue part du début de la liste et avance de μ étape, elle se retrouve en x(μ).
           # Si le lièvre avance de μ étapes à partir de sa position actuelle,
           # il se retrouve en x(2*i + μ) = x(2*kλ + μ) = x(μ). Donc au même endroit.

           # Pour calculer μ, la tortue repart du début. A chaque étape, la
           # tortue et le lièvre avancent d'un élément.
           # On a trouvé μ dès que la tortue et le lièvre sont sur le même noeud.
           μ = 0
           tortue = root
           tant que tortue <> lievre
               tortue = tortue.next
               lievre = lievre.next
               μ = μ + 1

           # Enfin, on cherche la valeur de λ.
           # Pour cela, on fait parcourir le cycle au lièvre, sans bouger la tortue.
           λ = 0
           tant que tortue <> lievre
               lievre = lievre.next
               λ = λ + 1

           retourne (μ, λ)


La complexité est toujours de O(λ + μ).

L'implementation en java est disponible sur github.