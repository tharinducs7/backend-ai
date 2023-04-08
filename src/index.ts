import dotenv from 'dotenv';
dotenv.config();
import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  res.json("Hello World");
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

const server = app.listen(6000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
