const express = require("express");
const validator = require("validator");
const mailValidatorService = require("../services/mail-validator.service");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const getEmail = req.body.email
    const mail = mailValidatorService(getEmail)
    // 1. Verificar si existe el body y el email
    if (!req.body || !mail) {
      return res.status(400).json({ success: false, error: "REQUERE EMAIL" });
    }

    // 2. Validar el email correctamente
    const isValidEmail = validator.isEmail(mail);
    
    // 3. Usar código de estado HTTP apropiado
    if (!isValidEmail) {
      return res.status(400).json({ success: false, error: "INVALID EMAIL" });
    }

    // 4. Mejorar formato de respuesta
    return res.status(200).json({ success: true, message: "VALID EMAIL", email: mail });

  } catch (error) {
    // 5. Manejar errores correctamente
    console.error("Error en el servidor:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
});

module.exports = router;