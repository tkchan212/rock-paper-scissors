CREATE TABLE `Match` (
  `id` int NOT NULL AUTO_INCREMENT,
  `end_at` bigint unsigned NOT NULL,
  `selector` varchar(50) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
);

CREATE TABLE `Move` (
  `id` int NOT NULL AUTO_INCREMENT,
  `matchID` int DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `action` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `match_fk` FOREIGN KEY (`matchID`) REFERENCES `Match` (`id`)
);
