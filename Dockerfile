FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
COPY AppApi/bin/Release/net5.0/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "AppApi.dll"]
