# 🚀 Starter LRTS Project

A starter project built with Laravel + React + Tailwind + Shadcn (LRTS) to help you accelerate modern web application development.

---

## 📋 Requirements

- PHP v8.4.18
- Node.js v24.11.1
- Database: MySQL v8.0.45 (preferred)
- Composer v2.9.1

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/bondanjs09/starter-lrts.git
```

2. Navigate into the project directory:

```bash
cd starter-lrts
```

3. Install PHP dependencies:

```bash
composer install
```

4. Install Node.js dependencies:

```bash
npm install
```

5. Configure the database in the `.env` file (see Additional section)

6. Set up Super Admin credentials in the `.env` file:

```env
SUPERADMIN_USERNAME=your_username
SUPERADMIN_PASSWORD=your_password
```

7. Generate application key:

```bash
php artisan key:generate
```

8. Run database migrations:

```bash
php artisan migrate
```

9. Run database seeder (RoleSeeder & SuperAdminSeeder):

```bash
php artisan db:seed
```

10. Start frontend service:

```bash
npm run dev
```

11. Start Laravel server:

```bash
php artisan serve
```

---

## 🧩 Additional

### Setup Database & User

1. Login to MySQL as root:

```bash
sudo mysql -u root -p
```

2. Create a database:

```sql
CREATE DATABASE <database_name>;
```

3. Create a new user:

```sql
CREATE USER '<username>'@'localhost' IDENTIFIED BY '<password>';
```

4. Grant privileges to the database:

```sql
GRANT ALL PRIVILEGES ON <database_name>.* TO '<username>'@'localhost';
```

5. Apply changes:

```sql
FLUSH PRIVILEGES;
```

6. Update `.env` file in your project:

```env
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

---

## 💡 Notes

- Make sure MySQL service is running before running migrations
- Use the required versions to avoid dependency issues
- Run `npm run dev` if the frontend is not loading properly

---

## 🌐 Default URL

The application will run at:

```
http://127.0.0.1:8000
```
