#!/bin/bash

DB=byggstyrning

cd `dirname $0`;

mysql -uroot < mysql/database/database.sql
#cat mysql/create/*.sql | mysql -uroot --default-character-set=utf8 ${DB}

FILES=`find mysql/create/ -name '*.sql' | sort`;
for f in $FILES; do
	mysql -uroot --default-character-set=utf8 ${DB} < $f || {
		echo $f;
		exit 1;
	}
done;

