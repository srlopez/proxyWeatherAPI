FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source
COPY AppApi/. .
RUN dotnet restore
RUN dotnet publish -c Release -o /App --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /App
COPY --from=build /App ./
ENTRYPOINT ["dotnet", "AppApi.dll"]

# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
# # en AppApi
# # dotnet publish -c Release
# COPY AppApi/bin/Release/net5.0/publish/ App/
# WORKDIR /App
# ENTRYPOINT ["dotnet", "AppApi.dll"]

