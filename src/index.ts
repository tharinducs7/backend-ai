import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.put('/post/:id/views', async (req, res) => {
//   const { id } = req.params

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     })

//     res.json(post)
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` })
//   }
// })

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     })

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData?.published },
//     })
//     res.json(updatedPost)
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` })
//   }
// })

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })


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
