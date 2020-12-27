create database todolist;

create table todos (
    todo_id     text primary key,
    todo_name   text not null,
    todo_status boolean not null
)