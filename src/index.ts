import dotenv from 'dotenv';
dotenv.config();
import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
const PORT = 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /leads
    GET, PUT, DELETE /leads/:id
  </pre>
  `.trim(),
  );
});


// endpoint to retrieve leads
app.get('/api/leads', async (req, res) => {
  const leads = await prisma.leads.findMany();
  res.json(leads);
});

// endpoint to validate email addresses
app.post('/api/validate-email', async (req, res) => {
  const { email } = req.body;

  // call the validation service and store the result in the database
  const isValidEmail = true; // replace with actual validation code
  const lead = await prisma.leads.update({
    where: { email },
    data: { isValidEmail },
  });

  res.json(lead);
});

// endpoint to update lead status
app.put('/api/leads/:id', async (req, res) => {
  const { id } = req.params;
  const { isApproved, comment, personalizationLine } = req.body;

  // update the lead in the database
  const lead = await prisma.leads.update({
    where: { id: Number(id) },
    data: { isApproved, comment, personalizationLine },
  });

  res.json(lead);
});


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
