USE company_db;

-- Insert All

INSERT INTO department (name) 
VALUES 
('Finance'),
('Operations'),
('Marketing'),
('Sales'),
('General Management');


INSERT INTO role (title, salary, department_id)
VALUES ('Chief Executive', 65000.00, 1),
('Advertising Director', 32000.00, 2),
('Marketing Assistant', 23000.00, 2),
('Senior Finance Analyst', 54700.00, 3),
('Finance Analyst', 38000.00, 3),
('Product Engineer', 43500.00, 4),
('Supply Chain Manager', 67650.00, 4),
('Sales Representative', 25000.00, 5),
('Sales Manager', 35000.00, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Smith', 1, 1),
('Jackson', 'Hill', 2, 2),
('Hetty', 'feather', 3, 2),
('Jack', 'Taylor', 4, null),
('Killua', 'Boxley', 5, 5),
('Alex', 'Marks', 6, 6),
('Terresa', 'Ferez', 7, 6),
('Rob', 'Travis', 8, 1),
('Valery', 'Scott', 9, 1);

