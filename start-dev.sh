#!/bin/bash

echo "Starting Vue dev server..."
(cd wwwroot/client && npm run dev) &

echo "Starting ASP.NET API..."
dotnet watch run