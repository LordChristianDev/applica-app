FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Copy and restore .NET dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy everything
COPY . .

# Accept build argument for Clerk key
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# Optionally extract other VITE_ vars into client/.env (safe)
RUN grep '^VITE_' .env > wwwroot/client/.env || true

# Build Vue with environment variable
WORKDIR /app/wwwroot/client
COPY wwwroot/client/package*.json ./
RUN npm ci --prefer-offline --no-audit

# Build Vue - the VITE_ env var will be baked into the JS
RUN npm run build

# Build .NET
WORKDIR /app
RUN dotnet publish -c Release -o out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

# Copy .env for DotNetEnv
COPY .env .env

EXPOSE 4000
ENV ASPNETCORE_URLS=http://+:4000
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "applica-app.dll"]