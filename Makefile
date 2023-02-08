zipit:
	zip -r archive.zip .
db:
	docker run --name quantic_staking -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d docker.io/library/mariadb:10.3