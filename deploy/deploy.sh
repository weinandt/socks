REGION="us-east-2"
ACCOUNT_ID=""

cd ../server

docker build -t socks .

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

docker tag socks $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/socks

docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/socks
