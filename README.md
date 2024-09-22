# DeliveryProject
Web приложение для приемки заказа на доставку. Стек: ASP .NET Core, MS SQL Server, EF Core, React.js
## Развертывание
Весь данный проект обернут в контейнеры Docker. Образы доступны на Docker Hub: https://hub.docker.com/r/collisiondotnet/deliveryprojectimages

Образы:
### :database 
База данных на MS SQL Server 2022. Поднималась на основе образа mcr.microsoft.com/mssql/server:2022-latest.

Команды для пула и запуска образа: 
```
docker pull collisiondotnet/deliveryprojectimages:database
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=StrongSqlServerPassword1!" -p 1433:1433 --name deliveryprojectdb -d collisiondotnet/deliveryprojectimages:database
```

База проектировалась отдельно от бека, миграции не применялись. SQL-скрипт, используемый для создания таблиц: [createdb.sql](sqlserver/createdb.sql). После поднятия контейнера базы необходимо подключиться к ней и выполнить скрипт.

Порты контейнеризации: 1433:1433

Рабочая директория: [/sqlserver](sqlserver). 

БД для работы с данными: deliverydb.

Credentials для работы с соединением:
* Пользователь: SA
* Пароль: StrongSqlServerPassword1!
### :server 
ASP .NET Core Web API приложение.

Команда для пула и запуска образа: 
```
docker pull collisiondotnet/deliveryprojectimages:server
docker run -p 8080:8080 --name deliveryprojectserver collisiondotnet/deliveryprojectimages:server
```

Порты контейнеризации: 8080:8080

Рабочая директория: [/DeliveryOrders](DeliveryOrders). 
### :client 
React.js приложение

Команда для пула и запуска образа: 
```
docker pull collisiondotnet/deliveryprojectimages:client
docker run -p 3000:3000 --name deliveryprojectclient collisiondotnet/deliveryprojectimages:client
```

Порты контейнеризации: 3000:3000

Рабочая директория: [/client/src](/client/src). 

Был использован TypeScript шаблон, дополнительные React-фреймворки мною использованы не были

Дополнительные библиотеки:

```npm install axios``` - для работы с запросами

```npm install react-router-dom``` - для рутинга между страницами (приложение спроектировано не как SPA)

## ВНИМАНИЕ

В изначальной версии Readme-файла забыл добавить команды для объединения контейнеров в сеть. После запуска всех контейнеров прокиньте, пожалуйста, команды для их объединения в сеть, иначе HTTP-запросы между контейнерами не будут работать:

```
docker network create deliverynetwork
docker network connect deliverynetwork deliveryprojectdb
docker network connect deliverynetwork deliveryprojectserver
docker network connect deliverynetwork deliveryprojectclient
```

## Некоторые моменты
Поздновато обнаружил ссылку на связь в случае возникших вопросов, поэтому ТЗ, возможно, были мною трактованы вольно, за что извиняюсь.

1. Город был выделен мною в отдельную сущность, а не оформлен в виде производной строки. Без этого база состояла бы всего из одной таблицы примитивов, скучно :). Так хоть FK накрутить получилось. В любом случае пользователь может добавить новый город, т.к. оставлять на откуп разработчика необходимость захардкодить в базу все возможные города не кажется мне хорошей идеей. Из-за этого функционал был немного расширен (добавлена форма добавления города)

2. Формат клиентского приложения - не SPA. В моем понимании форма - элемент, отвечающий исключительно за отправку на сервер данных, поэтому пункты "Форма просмотра созданного заказа" и "Форма отображения списка заказов" были трактованы мной как отдельные страницы.
