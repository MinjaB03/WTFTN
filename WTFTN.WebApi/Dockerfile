FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app
EXPOSE 8080


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["WTFTN.WebApi/WTFTN.WebApi.csproj", "WTFTN.WebApi/"]
COPY ["WTFTN.Application/WTFTN.Application.csproj", "WTFTN.Application/"]
COPY ["WTFTN.Domain/WTFTN.Domain.csproj", "WTFTN.Domain/"]
COPY ["WTFTN.Infrastructure/WTFTN.Infrastructure.csproj", "WTFTN.Infrastructure/"]

RUN dotnet restore "WTFTN.WebApi/WTFTN.WebApi.csproj"

COPY . .

WORKDIR "/src/WTFTN.WebApi"

RUN dotnet publish "WTFTN.WebApi.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


FROM base AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "WTFTN.WebApi.dll"]