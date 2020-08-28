CREATE DATABASE IF NOT EXISTS `test`;
GRANT ALL ON `test`.* TO 'user'@'%';

CREATE DATABASE IF NOT EXISTS `development`;
GRANT ALL ON `development`.* TO 'user'@'%';

CREATE DATABASE IF NOT EXISTS `logs`;
GRANT ALL ON `logs`.* TO 'user'@'%';