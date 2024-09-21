# DeliveryProject
Web приложение для приемки заказа на доставку. Стек: ASP .NET Core, MS SQL Server, EF Core, React.js
## Развертывание
Весь данный проект обернут в контейнеры Docker. Образы доступны на Docker Hub: https://hub.docker.com/r/collisiondotnet/deliveryprojectimages

Образы:
### :database 
База данных на MS SQL Server 2022. Поднималась на основе образа mcr.microsoft.com/mssql/server:2022-latest.

База проектировалась отдельно от бека, миграции не применялись. SQL-скрипт, используемый для создания таблиц: [a relative link](other_file.md)

Команда для пула образа: ```docker pull collisiondotnet/deliveryprojectimages:database```

Порты контейнеризации: 1433:1433

Credentials для работы с соединением:
* Пользователь: SA
* Пароль: StrongSqlServerPassword1!
### :server 
ASP .NET Core Web API приложение.

Команда для пула образа: ```docker pull collisiondotnet/deliveryprojectimages:server```

Порты контейнеризации: 8080:8080
### :client 
React.js приложение

Команда для пула образа: ```docker pull collisiondotnet/deliveryprojectimages:server```

Порты контейнеризации: 3000:3000

Был использован TypeScript шаблон, дополнительные React-фреймворки мною использованы не были

Дополнительные библиотеки:

```npm install axios``` - для работы с запросами

```npm install react-router-dom``` - для рутинга между страницами (приложение спроектировано не как SPA)

## Некоторые моменты
Поздновато обнаружил ссылку на связь в случае возникших вопросов, поэтому ТЗ, возможно, были мною трактованы вольно, за что извиняюсь.

1. Город был выделен мною в отдельную сущность, а не оформлен в виде производной строки. Без этого база состояла бы всего из одной таблицы примитивов, скучно :). Так хоть FK накрутить получилось. В любом случае пользователь может добавить новый город, т.к. оставлять на откуп разработчика необходимость захардкодить в базу все возможные города не кажется мне хорошей идеей. Из-за этого функционал был немного расширен (добавлена форма добавления города)

2. Формат клиентского приложения - не SPA. В моем понимании форма - элемент, отвечающий исключительно за отправку на сервер данных, поэтому пункты "Форма просмотра созданного заказа" и "Форма отображения списка заказов" были трактованы мной как отдельные страницы.
