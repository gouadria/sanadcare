# Étape 1 : Image de base .NET pour exécuter l'application
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

# Étape 2 : Copier les fichiers du projet dans le conteneur
COPY . .

# Étape 3 : Restaurer les dépendances
RUN dotnet restore

# Étape 4 : Compiler et publier l'application
RUN dotnet publish -c Release -o out

# Étape 5 : Exécuter l'application
CMD ["dotnet", "out/SanadCare.API.dll"]
