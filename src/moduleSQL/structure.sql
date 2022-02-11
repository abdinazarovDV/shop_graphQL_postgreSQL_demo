drop database if exists net_shop cascade;
create database net_shop;

create extension pgcrypt;

drop table if exists categories cascade;
create table categories (
    category_id serial primary key,
    category_name varchar(35) not null
);

drop table if exists products cascade;
create table products (
    category_id int references categories(category_id) on delete cascade,
    product_id serial primary key,
    product_name varchar(25) not null,
    price int not null,
    short_desc varchar(80) not null,
    long_desc varchar(255) not null,
    picture varchar(55) not null
);

drop table if exists users cascade;
create table users (
    user_id serial primary key,
    username varchar(25) not null,
    password text not null,
    contact varchar(20) not null check(contact ~* '^\+998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$'),
    email varchar(55) not null check(email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') ,
    role int default 2
);

drop table if exists orders cascade;
create table orders (
    order_id serial primary key,
    user_id int references users(user_id),
    product_id int references products(product_id) on delete cascade,
    is_paid boolean default false not null,
    time bigint not null
);





insert into categories(category_name) values ('elektronika'), ('sport'), ('parfumerira'), ('mebel');

insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (1, 'Iphone 13', 1300000, 'hozirgi kunda trendda bo''lgan mobayl telefon', 'Apple kompaniyasining eng oxirgi chiqgan qurilmasi bo''lib rekord 1TB xotirada namoish etildi', '/media/image/iphone13.jpeg');
insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (1, 'Samsung TV', 5300000, 'ultra displeyli ekran', 'Eni 120 sm qalinlik 7 sm adnroid tizimga ega Samsung televizori', '/media/image/tv.jpeg' );
insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (2, 'Velosiped', 2300000, 'Tog''li hududlar uchun velosiped', 'Tog''li hududlar uchun mo''ljallangan yumshoq balonli velosiped', '/media/image/bicycle.jpg' );
insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (2, 'Trenajor', 22000000, 'Yugurush uchun juda qulay', 'Endi siz uyingizdan chiqmagan holda yugurishingiz mumkin', '/media/image/running.jpeg' );
insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (3, 'Salina DolceGabbana', 547000, 'Light Blue Sunset in Salina DolceGabbana 50мл EDT (Original)', 'Light Blue Sunset in Salina DolceGabbana 50ml arzon narxlarda xarid qiling', '/media/image/doolce.jpeg' );
insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (3, 'Lacoste 100ml EDP', 870000, 'L.12.12 Blanc For Him Lacoste 100ml EDP (Original)', 'L.12.12 Blanc For Him Lacoste 100ml EDP (Original) muddatli to''lov', '/media/image/doolce.jpeg' );
insert into products(category_id, product_name, price, short_desc, long_desc, picture) values (4, 'Dafna London', 5100000 ,'boss chair', 'uzoq vaqt davomida ishlash uchun juda qulay', '/media/image/chair.jpeg' );

insert into users(username, password, contact, email, role) values ('mainAdmin', crypt('1234', gen_salt('bf')), '+998990026162', 'qwerty@gmail.com', 1 );
insert into users(username, password, contact, email) values ('rustam', crypt('1234', gen_salt('bf')), '+998336226162', 'qwertyu@gmail.com' );
insert into users(username, password, contact, email) values ('alisher', crypt('1234', gen_salt('bf')), '+998991234567', 'qwertyui@gmail.com' );
insert into users(username, password, contact, email) values ('nodir', crypt('1234', gen_salt('bf')), '+998997654321', 'qwertyuio@gmail.com' );

insert into orders(user_id, product_id, time) values (2, 1, 1644414957127);
insert into orders(user_id, product_id, time) values (2, 4, 1644413127127);
insert into orders(user_id, product_id, time) values (3, 2, 1644414957652);
insert into orders(user_id, product_id, time) values (3, 6, 1647814957127);
insert into orders(user_id, product_id, time) values (4, 2, 1644414957127);
insert into orders(user_id, product_id, time) values (4, 6, 1644638957127);
insert into orders(user_id, product_id, time) values (4, 5, 1644414959827);
insert into orders(user_id, product_id, time) values (2, 1, 1609545600000);