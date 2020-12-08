/* CREATE TABLE Patch1016 (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    composition VARCHAR(100),
    top1 INT DEFAULT 0,
    second INT DEFAULT 0,
    third INT NOT NULL,
    fourth INT NOT NULL,
    fifth INT DEFAULT 0,
    sixth INT DEFAULT 0,
    seventh INT DEFAULT 0,
    eighth INT DEFAULT 0);
*/

CREATE TABLE p1016 (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    composition VARCHAR(100),
    result INT
)