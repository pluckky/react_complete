import connection from "../config/connectDB.js";
import bcrypt from "bcryptjs";

export const checkUserExists = async (email) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        user_id AS id,
        email,
        account_password,
        CONCAT(first_name, ' ', last_name) AS name,
        account_type AS accountType
      FROM user_information
      WHERE email = ?
      UNION
      SELECT 
        admin_id AS id,
        admin_code AS email,
        account_password,
        CONCAT(first_name, ' ', last_name) AS name,
        'admin' AS accountType
      FROM admin_information
      WHERE admin_code = ?
    `;

    connection.query(sql, [email, email], (error, results) => {
      if (error) return reject({ error: "Database error", details: error });
      if (results.length === 0)
        return resolve({ exists: false, message: "Email not found." });
      return resolve({ exists: true, user: results[0] });
    });
  });
};

export const validatePassword = async (enteredPassword, storedHashedPassword) => {
  try {
    const match = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return match
      ? { exists: true }
      : { exists: false, message: "Incorrect password." };
  } catch (err) {
    return { exists: false, message: "Password validation error." };
  }
};
