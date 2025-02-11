import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TodoRoutes from "./routes/TodoRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

//chargement des variables d'environnement
dotenv.config()

//Création serveur express
const app = express()

app.use(cors());

//Définition du port du serveur
const PORT = process.env.PORT || 3001;

//COnfig du serveur par défaut
app.use(express.json());

//connecter MongoDB
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Erreur: MONGO_URI non défini dans .env");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connecté avec succès");
    } catch (err) {
        console.error("❌ Erreur lors de la connexion à MongoDB:", err);
    }
};

connectDB();

//TODO ajouter routes ici
app.use('/todos', TodoRoutes)
app.use('/auth', AuthRoutes)


//app.listen indique au serveur d'écouter les requêtes HTTP arrivant sur le
//port indiqué
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Todo API",
        version: "1.0.0",
        description: "API de gestion des tâches avec authentification",
      },
      servers: [{ url: `http://localhost:${PORT}` }],
      components: {
        securitySchemes: {
          BearerAuth: {  // <-- Uniquement Bearer token
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ BearerAuth: [] }], // <-- Autorisation globale pour toutes les routes
    },
    apis: ["./src/routes/*.ts"],
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  console.log(`Swagger est disponible à l'adresse : http://localhost:${PORT}/api-docs`);
  
