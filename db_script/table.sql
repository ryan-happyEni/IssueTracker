
CREATE TABLE `user` (
	`user_seq` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(255) NULL DEFAULT NULL,
	`user_name` VARCHAR(255) NULL DEFAULT NULL,
	`user_pass` VARCHAR(255) NULL DEFAULT NULL,
	`salt_key` VARCHAR(255) NULL DEFAULT NULL,
	`write_date` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`user_seq`)
)
ENGINE=InnoDB 
;

CREATE TABLE `message` (
	`msg_seq` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`msg` VARCHAR(255) NULL DEFAULT NULL,
	`send_date` DATETIME NULL DEFAULT NULL,
	`user_id` VARCHAR(255) NULL DEFAULT NULL,
	`topic` VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY (`msg_seq`)
)
ENGINE=InnoDB
;


CREATE TABLE `project` (
	`project_seq` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`project_name` VARCHAR(100) NOT NULL,
	`write_user` BIGINT(20) NOT NULL,
	`write_date` DATETIME NOT NULL,
	PRIMARY KEY (`project_seq`)
)
ENGINE=InnoDB 
;

CREATE TABLE `component` (
	`component_seq` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`project_seq` BIGINT(20) NOT NULL,
	`component_name` VARCHAR(300) NOT NULL,
	`component_charge` VARCHAR(300) NOT NULL,
	`component_desc` TEXT NOT NULL,
	`write_user` BIGINT(20) NOT NULL,
	`write_date` DATETIME NOT NULL,
	PRIMARY KEY (`component_seq`)
)
ENGINE=InnoDB 
;
