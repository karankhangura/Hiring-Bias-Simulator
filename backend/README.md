# Installing Node.js (Ubuntu)

1. sudo apt update  
2. sudo apt install -y nodejs  

# MySQL Credentials

Username: root  
Password: Yp64@9T7  
Database: Wallflower  

# Initial Setup

Create directory called "wallflower" and "cd" into it  

# MySQL Script to Generate Database Tables:

1. Navigate to "wallflower" directory  
2. Copy "wallflower.sql" into "wallflower"  
3. Run "mysql -u root -p"  
4. Type "Yp64@9T7" and press "ENTER"  
5. Run "source wallflower.sql"  

# Running Node.js Backend

2. Copy "app.js", "package-lock.json", and "package.json" into "wallflower"  
3. Run "npm install"  
4. Run "nohup node app.js &"  
5. Press "ENTER"
