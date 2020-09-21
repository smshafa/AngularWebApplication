# FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app


# RUN apt-get update && apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
# RUN apt-get update && apt-get install -y nodejs

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out


#Angular build
# FROM node as nodebuilder

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH


# # install and cache app dependencies
# COPY ClientApp/package.json /usr/src/app/package.json
# RUN npm install
# RUN npm install -g @angular/cli@1.7.0 --unsafe

# # add app

# COPY ClientApp/. /usr/src/app

# RUN npm run build

#End Angular build



# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
#COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AngularWebApplication.dll"]










#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

# FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
# WORKDIR /src
#Visual Studio can detect the below comnand but in the cmd mode it should be changed.
#https://github.com/dotnet/core/issues/3877
#COPY ["AngularWebApplication/AngularWebApplication.csproj", "AngularWebApplication/"]
# COPY ["AngularWebApplication.csproj", "AngularWebApplication/"]
# RUN dotnet restore "AngularWebApplication/AngularWebApplication.csproj"
# WORKDIR "/src/AngularWebApplication"
# COPY . .
# WORKDIR "/src/AngularWebApplication"
# RUN dotnet build "AngularWebApplication.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "AngularWebApplication.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "AngularWebApplication.dll"]