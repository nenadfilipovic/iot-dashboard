CREATE DATABASE IF NOT EXISTS `user`;
GRANT ALL ON `user`.* TO 'user'@'%';

CREATE DATABASE IF NOT EXISTS `device`;
GRANT ALL ON `device`.* TO 'user'@'%';