Create database iiot;

USE iiot;

CREATE TABLE students
(
    studentid INT PRIMARY KEY,
    name VARCHAR(100),
    course VARCHAR(20)
);

CREATE TABLE Faculty
(
    facultyid VARCHAR(20),
    name VARCHAR(100),
    subjectassigned VARCHAR(50),
    dateofjoining DATE
);

CREATE TABLE Library
(
    noofbooks INT PRIMARY KEY,
    author VARCHAR(100),
    dateofissue DATE,
    dateofreturn DATE,
    book_name VARCHAR(150)
);

CREATE TABLE Fee
(
    fee_id INT,
    studentid INT,
    Annualfee INT,
    paidamount INT,
    remainingfee INT
);

INSERT INTO students(studentid, name, course)
VALUES
(1, 'Alok', 'MCA'),
(2, 'Aman', 'BordersCA'),
(3, 'Ram', 'MBA'),
(4,'Shyam','MCA');

INSERT INTO Faculty(facultyid, name, subjectassigned, dateofjoining)
VALUES
('F101', 'Aarav', 'DSA', '2025-04-19'),
('F102', 'Ishaan', 'Computer Network', '2026-03-15'),
('F103', 'Raman', 'Data Science', '2021-11-22'),
('F104', 'Shyam', 'C Fundamentals', '2023-09-27'),
('F105', 'Shivam', 'Operating System', '2024-07-12');

INSERT INTO Library
(noofbooks, author, dateofissue, dateofreturn, book_name)
VALUES
(25, 'R.K. Sharma', '2026-08-13', '2026-08-22', 'Database Management System'),
(50, 'A.P. Verma', '2025-11-20', '2026-12-02', 'Computer Networks'),
(100, 'S.K. Singh', '2026-05-18', '2026-06-09', 'Python Programming');

INSERT INTO Fee
(fee_id, studentid, Annualfee, paidamount, remainingfee)
VALUES
(1001, 1, 65000, 20000, 45000),
(1002, 2, 50000, 30000, 20000),
(1003, 3, 120000, 75000, 45000),
(1004, 4, 35000, 17500, 17500),
(1005, 5, 45000, 35000, 10000);

SELECT * FROM students;
SELECT * FROM Faculty;
SELECT * FROM Library;
SELECT * FROM Fee;


SELECT 
    students.studentid,
    students.name,
    students.course,
    Fee.Annualfee,
    Fee.paidamount,
    Fee.remainingfee
FROM students
INNER JOIN Fee
ON students.studentid = Fee.studentid
where course = 'MCA';
	