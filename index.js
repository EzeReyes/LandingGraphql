const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const nodemailer = require('nodemailer')

conectarDB();

const app = express();

// Opcional: aplicar CORS global si tenés otras rutas además de /graphql
app.use(cors({
  origin: [
    "https://ezequiel-reyes.vercel.app"
    // "http://localhost:5173"
  ],
  credentials: true,
}));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // ✅ Esto simplifica el uso de Gmail
  auth: {
    user: process.env.GMAIL_USER, // tu dirección Gmail
    pass: process.env.GMAIL_PASS  // tu contraseña o App Password
  }
});


app.post('/api/contact', async (req, res) => {
  const { nombre, apellido, email, telefono, consulta } = req.body;

  const mailOptions = {
    from: `"Formulario de portafolio Ezequiel Reyes" <${email}>`,
    to: process.env.GMAIL_USER,
    subject: `Nuevo mensaje de contacto del usuario ${email}`,
    html: `
      <div style="font- family: 'Segoe UI', sans-serif;
        background-color: #fdf6ec;
        color: #333;
        padding: 2rem;
        max-width: 600px; 
        margin: auto;
        border-radius: 12px;
        box-shadow: 0 0 20 rgba(0, 0, 0, 0.1);">
      <h1 style="color: #dfd6;
        font-size: 2rem;
        margin-bottom: 1rem;"
      >Nuevo Mensaje de contacto</h1>
      <p style="font-size: 1.1rem; 
        line-height: 1.6;"><strong>Nombre del usuario: </strong> ${nombre} ${apellido}</p>
      <p style="font-size: 1.1rem; 
        line-height: 1.6;"><strong>Email: </strong> ${email}</p>
      <p style="font-size: 1.1rem; 
        line-height: 1.6;"><strong>Telefono: </strong> ${telefono}</p>
      <p style="font-size: 1.1rem; 
        line-height: 1.6;"><strong>Mensaje: </strong> ${consulta}</p>
      `
  };

  const autoReplyOptions = {
    from: `"Ezequiel Reyes" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '¡Gracias por tu mensaje!',
    html: `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #fdf6ec; color: #333; padding: 2rem; max-width: 600px; margin: auto; border-radius: 12px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #b48b5f; font-size: 2rem; margin-bottom: 1rem;">Bienvenido a Ezequiel Reyes dev</h1>
      <p style="font-size: 1.1rem; line-height: 1.6;">
        Recibí tu mensaje correctamente. A la brevedad responderé tu consulta.
      </p>

      <div style="text-align: center;">
        <span style="font-style: italic; text-align: center; font-size: 1.8rem; color: #000; text-shadow: 1px 1px 2px #d4af37;">EZEQUIEL REYES</span>
      </div>

      <div style="font-size: 0.9rem; color: #555; text-align: center;">
        <p>Contacto: +54 9 223 6689525</p>
        <p>7600, Mar del Plata, Buenos Aires, Argentina</p>
      </div>

      <div style="text-align: center; margin-top: 1rem;">
        <p style="text-decoration: underline; text-shadow: 1px 1px 2px white, 0 0 1em blue, 0 0 0.2em blue;">Seguinos en redes</p>
      </div>

      <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin: auto;">
        <tr>
          <td align="center" style="padding: 0 15px;">
            <a href="https://wa.me/2236689525" title="WhatsApp" target="_blank" rel="noopener noreferrer">
              <img src="https://res.cloudinary.com/dbctwitmb/image/upload/c_thumb,w_200,g_face/v1757003529/mdQNdcFMi0p_eqlwnk.png" alt="WhatsApp" width="auto" height="50" style="display: block;" />
            </a>
          </td>
        </tr>
      </table>

      <div style="margin-top: 2rem; font-size: 0.9rem; color: #777; text-align: center;">
        © Ezequiel Reyes dev.
      </div>
    </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);
    return res.status(200).json({ success: true, message: 'Mensaje y auto respuesta enviados con éxito' });
  } catch (error) {
    console.error('Error al enviar el mensaje o la auto respuesta:', error);
    return res.status(500).json({ success: false, message: 'Error al enviar el mensaje o la auto respuesta' });
  }
});


async function startServer() {
  try {
    await server.start();

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    origin: [
      "https://ezequiel-reyes.vercel.app"
      // "http://localhost:5173"
    ],
    credentials: true,
  },
});

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
}

startServer();