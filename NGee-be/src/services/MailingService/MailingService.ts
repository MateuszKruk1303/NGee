import nodemailer from 'nodemailer'

export default async (clientEmail: string, link: string, linkText: string) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env['EMAIL'],
      pass: process.env['EMAIL_PASS'],
    },
  })
  let info = await transporter.sendMail({
    from: process.env['EMAIL'],
    to: `${clientEmail}`,
    subject: 'Nie odpowiadaj na tego e-maila',
    html: `<a href="${link}">${linkText}</link>`,
  })
}
