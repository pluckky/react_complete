------------------------------------------------------------------------------+
| Table       | Create Table                                                                                                                                                                           |
+-------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| profile_pic | CREATE TABLE `profile_pic` (
  `email` varchar(255) NOT NULL,
  `prof_pic` longblob,
  UNIQUE KEY `email` (`email`)
) 

Create paswword_reset table for forget pass

CREATE TABLE password_reset(
    email VARCHAR(255) PRIMARY KEY,
    otp_code INT NOT NULL,
    expires_at DATETIME NOT NULL
    FOREIGN KEY (email) REFERENCES user_information(email)
);
