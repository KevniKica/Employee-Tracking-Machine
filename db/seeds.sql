INSERT INTO department (name)
VALUES
    ('Sales'),
    ('IT'),
    ('Networking');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Rep', 75000, 1),
    ('Sales Manager', 100000, 1),
    ('Data Analyst', 105000, 1),
    ('Engineer', 92000, 2),
    ('IT Manager', 115000, 2),
    ('Junior Developer', 63000, 2),
    ('Senior Developer', 107000, 2),
    ('Networking Assistant', 61000, 3),
    ('Networking Manager', 101000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dash', 'Murtishi', 2, NULL),
    ('Ajten', 'Murtishi', 3, 1),
    ('Dylber', 'Murtishi', 1, 1),
    ('Gazmend', 'Murtishi', 1, 1),
    ('Baki', 'Belica', 5, NULL),   
    ('Derim', 'Belica', 6, 5),
    ('Nesim', 'Belica', 6, 5),
    ('Kevni', 'Kica', 6, 5),
    ('Oliver', 'Queen', 7, 5),
    ('Slade', 'Wilson', 7, 5),
    ('Arben', 'Kica', 4, 5),
    ('Lois', 'Griffin', 4, 5),
    ('Lebron', 'James', 9, NULL),
    ('Peter', 'Griffin', 8, 13),
    ('Kyrie', 'Irving', 8, 13),
    ('Michael', 'Jordan', 8, 13);
