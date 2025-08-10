# How to Start the Application

This guide will help you set up and run the application using **Docker Compose**.

## Prerequisites
Before you start, make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Step 1: Download the Project
You **do not** need to use `git clone`.  
Instead:
1. Go to the project's GitHub page.
2. Click the **Code** (green) button.
3. Select **Download ZIP**.
4. Extract the ZIP file to your preferred location.

---

## Step 2: Navigate to the Docker Compose Directory
Open a terminal and navigate to the folder containing the `docker-compose.yml` file:
```bash
cd path/to/docker-compose-directory
```

## Step 3: Start the Containers
```bash
docker-compose up -d
```

## Step 4: Access the Applications
```bash
Node.js App: http://localhost:8000
phpMyAdmin: http://localhost:9000
```


Here’s your **helpful Docker Compose commands guide** in a clean `.md` format with all commands intact and proper explanations.

---

# 📦 Helpful Docker Compose Commands

This guide lists **all essential Docker Compose commands** for managing multi-container applications.
Example below assumes two services from your `docker-compose.yml`:

* **mysql\_db** → MySQL database container
* **todo\_node\_app** → Node.js application container

---

## 🚀 Starting Containers

```bash
docker-compose up
```

Starts **mysql\_db** and **todo\_node\_app** containers with logs showing in the terminal.

```bash
docker-compose up -d
```

Starts containers **in the background** (detached mode).

---

## 🛠 Building Containers

```bash
docker-compose build
```

Builds the container images **only** without starting them.

```bash
docker-compose up --build
```

Builds the images **and** then starts the containers.

---

## ⏹ Stopping Containers

```bash
docker-compose stop
```

Stops **both containers**.

```bash
docker-compose stop todo_node_app
```

Stops **only** the Node.js app container.

---

## 🗑 Removing Containers & Volumes

```bash
docker-compose down
```

Stops and removes **containers** and the **network** created by Compose.

```bash
docker-compose down -v
```

Stops and removes containers, network, **and** the `mysql_data` volume.

---

## 📜 Viewing Logs

```bash
docker-compose logs
```

Shows logs for **both containers**.

```bash
docker-compose logs -f
```

Follows logs live (real-time).

```bash
docker-compose logs mysql_db
```

Shows **only MySQL container logs**.

```bash
docker-compose logs todo_node_app
```

Shows **only Node.js app logs**.

---

## 📋 Checking Status

```bash
docker-compose ps
```

Lists all running containers from the Compose project.

---

## 🔄 Restarting Containers

```bash
docker-compose restart
```

Restarts **both containers**.

```bash
docker-compose restart mysql_db
```

Restarts **MySQL only**.

```bash
docker-compose restart todo_node_app
```

Restarts **Node.js app only**.

---

## 💻 Accessing Container Shell

```bash
docker-compose exec mysql_db bash
```

Opens **bash shell** inside the MySQL container.

```bash
docker-compose exec todo_node_app sh
```

Opens **sh shell** inside the Node.js app container.

---

## 🗄 MySQL Database Access

```bash
docker-compose exec mysql_db mysql -uuser -puserpass tododb
```

Logs into **`tododb`** database using **application credentials**.

```bash
docker-compose exec mysql_db mysql -uroot -prootpass
```

Logs into MySQL as **root admin**.

---

## 📂 Copying Files Between Host & Containers

```bash
docker cp ./localfile.txt todo_node_app:/usr/src/app/
```

Copies a file **from host → Node.js app container**.

```bash
docker cp todo_node_app:/usr/src/app/server.js ./server_copy.js
```

Copies a file **from Node.js app container → host**.

---

✅ **Tip:** Always run these commands from the same directory where your `docker-compose.yml` is located.

---

Happy coding! 🚀
