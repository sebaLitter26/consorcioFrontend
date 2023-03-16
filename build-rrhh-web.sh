#!/bin/bash

appName="rrhh-psico-web"
appSourceDir="/docker_home/RRHH/WEB/rrhh-psico-web"
appDeployDir="/docker_home/deploy/RRHH/WEB"

startTime=`date +%s`

# Nos movemos al directorio donde se encuentra el repositorio
cd $appSourceDir

# Se setea el branch a subir y ambiente en el cual se quiere deployar(por default se deploya para producci�n, desde master)
branch=${1:-master}
environment=${2:-prod}
versioning=${3:-patch} # Ver comandos disponibles en package.json

tagenv=""

# Se pullean los cambios del repo para el branch indicado
echo "Updating local repository..."
git fetch --all
git checkout $branch
git merge $branch origin/$branch

# Se actualiza la versi�n de la aplicaci�n
if [ $versioning != "none" ]; then
  echo "Updating application version..."
  npm run $versioning
  git push origin $branch
fi

# Se setea la versi?n que se usar? para tagear la imagen
version=$(cat $appSourceDir/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Trimea espacios al inicio
version="${version## }"

image="$appName:$version$tagenv"

# Se crea la imagen para el ambiente indicado, y se la tagea con la versi�n
echo "Building image (v$version)..."
docker build --build-arg env=$environment -t $image .

# Limpio containers e im�genes hu�rfan@s
docker container prune -f
docker image prune -f

# Genero .tar
docker save -o $appDeployDir/$appName\_$version.tar $image
gzip $appDeployDir/$appName\_$version.tar
ls -la $appDeployDir

endTime=`date +%s`

echo "Total time: $((endTime-startTime))s"