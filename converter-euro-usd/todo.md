1. Afficher une valeur qui représentera le taux de change EUR / USD. Elle sera initialisée à 1.1. 
Toutes les 3 secondes, une valeur aléatoire entre -0.05 et +0.05 sera ajoutée ou soustraite à 
la valeur initiale. 
2. Réaliser un front permettant de saisir un montant en EUR et affichant sa valeur en USD sur la 
base du taux de change 
3. Mettre en place un polling régulier permettant la mise à jour de la partie USD en fonction de 
l’actualisation du taux de change 
4. Ajouter un switch permettant de saisir un montant en USD à la place du montant en EUR : 
a. Switch réglé sur "EUR": le montant saisi est en Euro, la valeur affichée est en USD 
b. Switch réglé sur "USD": le montant saisi est en Dollar, la valeur affichée est en EUR 
5. S'assurer de la continuité des valeurs: si le switch est activé, la nouvelle entrée devient 
l'ancienne sortie 
6. Ajouter un champ permettant de fixer (force) un taux de change