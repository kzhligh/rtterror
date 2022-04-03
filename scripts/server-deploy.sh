#!/bin/sh
GCP_ARTIFACT_REGISTRY_REPOSITORY="us-central1-docker.pkg.dev/rtterror/api/server";
DEFAULT_TAG="latest";

while getopts ":t:" option; do
   case $option in
      t)
         TAG=$OPTARG;;
     \?)
         exit;;
   esac
done
clear;
if [ -z "$TAG" ]
then
  TAG=$DEFAULT_TAG;
fi

DOCKER_IMAGE_URI="$GCP_ARTIFACT_REGISTRY_REPOSITORY:$TAG";

docker build -t "$DOCKER_IMAGE_URI" ./backend
docker push "$DOCKER_IMAGE_URI"

gcloud run deploy server \
--image=$DOCKER_IMAGE_URI \
--concurrency=80 \
--cpu=1 \
--memory=1024Mi \
--min-instances=0 \
--timeout=120s

gcloud run services update-traffic server --to-latest
