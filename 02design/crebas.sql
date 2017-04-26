/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/4/26 15:12:31                           */
/*==============================================================*/


drop table if exists summon_info;

/*==============================================================*/
/* Table: summon_info                                           */
/*==============================================================*/
create table summon_info
(
   id                   int not null auto_increment comment '��ƱID',
   case_date            datetime not null comment '��������',
   excute_company       varchar(128) not null comment 'ִ�е�λ',
   case_number          varchar(64) not null comment '������',
   case_reason          varchar(200) comment '����',
   name                 varchar(64) not null comment '��������',
   address              varchar(200) comment '������λ���ַ',
   discuss_reason       varchar(200) comment '��������',
   set_time             datetime not null comment 'Ӧ��ʱ��',
   set_place            varchar(200) not null comment 'Ӧ��ס��',
   judge                varchar(64) not null comment '����Ա',
   clerk                varchar(64) not null comment '���Ա',
   create_time          datetime comment '����ʱ��',
   primary key (id)
);

alter table summon_info comment '��Ʊ��Ϣ��';

