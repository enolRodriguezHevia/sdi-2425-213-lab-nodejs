const jwt = require("jsonwebtoken");
const express = require("express");
const userTokenRouter = express.Router();

userTokenRouter.use((req, res, next) => {
    console.log("userAuthorRouter");
    // Asegúrate de que req.headers, req.body y req.query estén definidos
    const token = req.headers?.["token"] || req.body?.token || req.query?.token;

    if (token != null) {
        // Verificar el token
        jwt.verify(token, "secreto", {}, (err, infoToken) => {
            if (err || (Date.now() / 1000 - infoToken.time) > 240) {
                res.status(403).json({
                    authorized: false,
                    error: "Token inválido o caducado",
                });
            } else {
                res.user = infoToken.user;
                next();
            }
        });
    } else {
        res.status(403).json({
            authorized: false,
            error: "No hay Token",
        });
    }
});

module.exports = userTokenRouter;