#!/bin/bash

appName="rrhh-psico-web"
appSourceDir="/docker_home/RRHH/WEB/rrhh-psico-web"
startTime=`date +%s`

# Nos movemos al directorio donde se encuentra el repositorio
cd $appSourceDir

# Se setea el branch a subir y ambiente en el cual se quiere deployar(por default se deploya para producci�n, desde master)
branch=${1:-master}
environment=${2:-dev}
versioning=${3:-release} # Ver comandos disponibles en package.json

tagenv=""

if [ $environment != "prod" ] && [ $environment != "pre-prod" ]; then
	tagenv="-$environment"
fi

# Se pullean los cambios del repo para el branch indicado
echo "Updating local repository..."
git fetch --all
git checkout $branch
git merge $branch origin/$branch

# Se actualiza la versión de la aplicación
if [ $versioning != "none" ]; then
  echo "Updating application version..."

  npm run $versioning

  newversion=$(cat $appSourceDir/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

  git add -A
  git commit -m "$newversion"
  git push origin $branch
fi

# Se setea la versi�n que se usar� para tagear la imagen
version=$(cat $appSourceDir/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Trimea espacios al inicio
version="${version## }"

# Si ya hay un container corriendo para esta aplicaci�n, se lo elimina
if [ "$(docker ps -a | grep $appName)" ]; then
	echo "Removing container..."
	docker stop $appName
	docker rm $appName
fi

image="$appName:$version$tagenv"

# Se crea la imagen para el ambiente indicado, y se la tagea con la versi�n
echo "Building image (v$version)..."
docker build --build-arg env=$environment -t $image .

# Se levanta el container de la aplicaci�n
echo "Running container..."
docker run --name $appName -d -p 82:80 $image

# Limpio containers e im�genes hu�rfan@s
docker container prune -f
docker image prune -f

endTime=`date +%s`

echo "Total time: $((endTime-startTime))s"