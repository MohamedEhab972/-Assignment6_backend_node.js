import connection from "../../database/connection.js";

export const createProductTable = (req, res) => {
  connection.query(
    "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price DECIMAL(10, 2), stokeQuantity INT, supplierID INT, FOREIGN KEY (supplierID) REFERENCES suppliers(id))",
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error creating product table" });
      } else {
        console.log(results);
        res.json({ message: "Product table created successfully" });
      }
    },
  );
};

export const createSupplierTable = (req, res) => {
  connection.query(
    "CREATE TABLE suppliers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), contactNumber VARCHAR(255))",
    (err, results) => {
      if (err) {
        res.json({ message: "Error creating supplier table" });
      } else {
        res.json({ message: "Supplier table created successfully" });
      }
    },
  );
};

export const createSalesTable = (req, res) => {
  connection.query(
    "CREATE TABLE sales (id INT AUTO_INCREMENT PRIMARY KEY, productID INT, quantity INT, saleDate DATE, FOREIGN KEY (productID) REFERENCES products(id))",
    (err, results) => {
      if (err) {
        res.json({ message: "Error creating sales table" });
      } else {
        res.json({ message: "Sales table created successfully" });
      }
    },
  );
};

export const addCategoryColumn = (req, res) => {
  connection.query(
    "ALTER TABLE products ADD COLUMN category VARCHAR(255)",
    (err, results) => {
      if (err) {
        res.json({ message: "Error adding category column" });
      } else {
        res.json({ message: "Category column added successfully" });
      }
    },
  );
};

export const deleteCategoryColumn = (req, res) => {
  connection.query(
    "ALTER TABLE products DROP COLUMN category",
    (err, results) => {
      if (err) {
        res.json({ message: "Error deleting category column" });
      } else {
        res.json({ message: "Category column deleted successfully" });
      }
    },
  );
};

export const changeContactNumber = (req, res) => {
  connection.query(
    "ALTER TABLE products MODIFY COLUMN contactNumber VARCHAR(15)",
    (err, results) => {
      if (err) {
        res.json({ message: "Error changing contact number" });
      } else {
        res.json({ message: "Contact number changed successfully" });
      }
    },
  );
};

export const notNullPName = (req, res) => {
  connection.query(
    "ALTER TABLE products MODIFY COLUMN name VARCHAR(255) NOT NULL",
    (err, results) => {
      if (err) {
        res.json({ message: "Error making product name not null" });
      } else {
        res.json({ message: "Product name made not null successfully" });
      }
    },
  );
};

export const addSupplier = (rep, res) => {
  connection.query(
    "INSERT INTO suppliers (name, contactNumber) VALUES ('FreshFoods', '01001234567')",
    (err, results) => {
      if (err) {
        res.json({ message: "Error adding supplier" });
      } else {
        res.json({ message: "Supplier added successfully" });
      }
    },
  );
};

export const insertProduct = (req, res) => {
  connection.query(
    "SELECT id FROM suppliers WHERE name = 'FreshFoods'",
    (err, results) => {
      if (err) {
        res.json({ message: "Error fetching supplier ID" });
      } else if (results.length === 0) {
        res.json({ message: "Supplier not found" });
      } else {
        const supplierID = results[0].id;
        connection.query(
          `INSERT INTO products (name, price, stokeQuantity, supplierID) VALUES ('Milk', 15.00, 50, ${supplierID}), ('Bread', 10.00, 30, ${supplierID}), ('Eggs', 20.00, 40, ${supplierID})`,
          (err, results) => {
            if (err) {
              res.json({ message: "Error inserting product" });
            } else {
              res.json({ message: "Product inserted successfully" });
            }
          },
        );
      }
    },
  );
};

export const saleProduct = (req, res) => {
  connection.query(
    "SELECT id FROM products WHERE name = 'Milk'",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error fetching product ID" });
      } else if (results.length === 0) {
        return res.json({ message: "product not found" });
      } else {
        const productID = results[0].id;
        connection.query(
          `INSERT INTO sales (productID, quantity, saleDate) VALUES (${productID}, 2, '2025-05-20')`,
          (err, results) => {
            if (err) {
              return res.json({ message: "Error inserting sale" });
            } else {
              return res.json({ message: "sale inserted successfully" });
            }
          },
        );
      }
    },
  );
};

export const updateBreadPrice = (req, res) => {
  connection.query(
    `UPDATE products SET price = 25 WHERE name = "Bread" `,
    (err, results) => {
      if (err) {
        return res.json({ message: "Error updating price" });
      }
      if (results.affectedRows === 0) {
        return res.json({ message: "Product not found" });
      }
      res.json({ message: "Price updated successfully" });
    },
  );
};

export const deletEggProduct = (req, res) => {
  connection.query(
    `DELETE FROM products WHERE name = "Eggs" `,
    (err, results) => {
      if (err) {
        return res.json({ message: "Error deleteing product" });
      }
      if (results.affectedRows === 0) {
        return res.json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    },
  );
};

export const getProductsTotalQuantity = (req, res) => {
  connection.query(
    "SELECT p.name, SUM(s.quantity) AS total_quantity FROM products p JOIN sales s ON p.id = s.productID GROUP BY p.name",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error fetching total quantity" });
      }
      res.json(results);
    },
  );
};

export const getMaxStockProduct = (req, res) => {
  connection.query(
    "SELECT name, stokeQuantity FROM products WHERE stokeQuantity = ( SELECT MAX(stokeQuantity) FROM products )",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error fetching max stock product" });
      }
      res.json(results);
    },
  );
};

export const getSuppliersByNameF = (req, res) => {
  connection.query(
    "SELECT * FROM suppliers s WHERE s.name LIKE 'F%'",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error fetching suppliers" });
      }
      res.json(results);
    },
  );
};

export const getProductsLeftJoinSales = (req, res) => {
  connection.query(
    "SELECT p.name FROM products p LEFT JOIN sales s ON p.id = s.productID",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error fetching products with sales" });
      }
      res.json(results);
    },
  );
};

export const getProductsWithNoSales = (req, res) => {
  connection.query(
    "SELECT * FROM products p LEFT JOIN sales s ON p.id = s.productID WHERE s.productID IS NULL",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error fetching products with no sales" });
      }
      res.json(results);
    },
  );
};

export const getProductsRightJoinSales = (req, res) => {
  connection.query(
    "SELECT p.name, s.* FROM products p RIGHT JOIN sales s ON p.id = s.productID",
    (err, results) => {
      if (err) {
        return res.json({
          message: "Error fetching products right join sales",
        });
      }
      res.json(results);
    },
  );
};

export const grantStoreManagerPrivileges = (req, res) => {
  connection.query(
    "GRANT SELECT, INSERT, UPDATE ON shop.* TO 'store_manager'@'localhost' IDENTIFIED BY ''",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error granting privileges" });
      }
      res.json({ message: "Privileges granted successfully" });
    },
  );
};

export const revokeStoreManagerUpdate = (req, res) => {
  connection.query(
    "REVOKE UPDATE ON shop.* FROM 'store_manager'@'localhost'",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error revoking privilege" });
      }
      res.json({ message: "UPDATE privilege revoked successfully" });
    },
  );
};

export const grantStoreManagerDelete = (req, res) => {
  connection.query(
    "GRANT DELETE ON shop.sales TO 'store_manager'@'localhost'",
    (err, results) => {
      if (err) {
        return res.json({ message: "Error granting DELETE privilege" });
      }
      res.json({ message: "DELETE privilege granted successfully" });
    },
  );
};
